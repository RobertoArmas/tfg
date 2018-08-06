import { Injectable } from '@angular/core';
import { XapiCourse } from '../../assets/types/xapiCourse.js';
import { Statement } from '../../assets/types/statement.js';
import { Verbs } from './verbs.js';

import '../../assets/types/adl.js';
import { ActivityTypes } from './activity-types.js';
import { AtnovaConfig, AtnovaBaseURI, AtnovaAgent } from './at-config.js';
import { XapiAgent } from '../../assets/types/xapiAgent.js';
import { Course } from '../course-viewer/Course.js';
import { Lesson } from '../course-viewer/lesson-detail/Lesson.js';
import { UaConfig, UaBaseURI, UaAgent } from './config.js';

@Injectable({
  providedIn: 'root'
})
export class XapiService {
  course: XapiCourse;
  actor: XapiAgent;
  courseData: Course;

  constructor() {
    this.course = new XapiCourse();
    this.launchLrsConnection();
  }

  launchLrsConnection() {

    // Activa/desactiva el logging de xAPI
    ADL.XAPIWrapper.log.debug = true;

    ADL.launch((error, launchdata, wrapper) => {
      ADL.XAPIWrapper.changeConfig(AtnovaConfig);
      this.course.baseuri = AtnovaBaseURI;
      this.actor = AtnovaAgent;

      ADL.XAPIWrapper.log('--- configuración de LRS realizada con éxito --- \n');
      ADL.XAPIWrapper.log(ADL.XAPIWrapper.lrs);

      this.buildCourseBaseStatement(this.actor);

    }, true);
  }

  buildCourseBaseStatement(actor) {
    this.course.baseStatement = {
      actor: actor,
      context: {}
    };
  }

  getBase(): Statement {
    return JSON.parse(JSON.stringify(this.course.baseStatement));
  }

  started(courseData: Course) {
    this.courseData = courseData;
    this.course.attemptGUID = ADL.ruuid();
    this.course.baseuri = this.course.baseuri + this.courseData.URI;
    const statement: Statement = this.getBase();

    statement.verb = {
      id: Verbs.started,
      display: { 'es-ES': 'ha empezado' }
    };

    statement.object = {
      id: this.course.baseuri,
      definition: {
        name: { 'es-Es': this.courseData.title },
        description: { 'es-Es': this.courseData.description },
        type: ActivityTypes.course
      },
      objectType: 'Activity'
    };

    statement.context.registration = this.course.attemptGUID;
    statement.timestamp = new Date();

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  progressed(lesson: Lesson) {
    const statement: Statement = this.getBase();

    statement.verb = {
      id: Verbs.progressed,
      display: { 'es-ES': 'ha avanzado a' }
    };

    statement.object = {
      id: this.course.baseuri + '/lesson' + lesson.URI,
      definition: {
        name: { 'es-ES': lesson.id + ' - ' + lesson.title },
        description: { 'es-ES': lesson.description },
        type: ActivityTypes.slide
      },
      objectType: 'Activity'
    };

    statement.context.contextActivities = {
      grouping: {
        id: this.course.baseuri,
        objectType: 'Activity',
        definition: {
          type: ActivityTypes.course,
          name: { 'es-Es': this.courseData.title },
          description: { 'es-Es': this.courseData.description }
        }
      }
    };

    statement.context.registration = this.course.attemptGUID;
    statement.timestamp = new Date();

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  navigatedBack(lesson: Lesson) {
    const statement: Statement = this.getBase();

    statement.verb = {
      id: this.course.baseuri + Verbs.navigatedBack,
      display: { 'es-ES': 'ha vuelto a' }
    };

    statement.object = {
      id: this.course.baseuri + '/lesson' + lesson.URI,
      definition: {
        name: { 'es-ES': lesson.id + ' - ' + lesson.title },
        description: { 'es-ES': lesson.description },
        type: ActivityTypes.slide
      },
      objectType: 'Activity'
    };

    statement.context.contextActivities = {
      grouping: {
        id: this.course.baseuri,
        objectType: 'Activity',
        definition: {
          type: ActivityTypes.course,
          name: { 'es-Es': this.courseData.title },
          description: { 'es-Es': this.courseData.description }
        }
      }
    };

    statement.context.registration = this.course.attemptGUID;

    statement.timestamp = new Date();

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  navigatedTo(lesson: Lesson) {
    const statement: Statement = this.getBase();

    statement.verb = {
      id: this.course.baseuri + Verbs.navigatedTo,
      display: { 'es-ES': 'ha navegado a' }
    };

    statement.object = {
      id: this.course.baseuri + '/lesson' + lesson.URI,
      definition: {
        name: { 'es-ES': lesson.id + ' - ' + lesson.title },
        description: { 'es-ES': lesson.description },
        type: ActivityTypes.slide
      },
      objectType: 'Activity'
    };

    statement.context.contextActivities = {
      grouping: {
        id: this.course.baseuri,
        objectType: 'Activity',
        definition: {
          type: ActivityTypes.course,
          name: { 'es-Es': this.courseData.title },
          description: { 'es-Es': this.courseData.description }
        }
      }
    };

    statement.context.registration = this.course.attemptGUID;

    statement.timestamp = new Date();

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  trimData(attributes: Chunk): string {
    let trimmedData: string = attributes.statementData;
    const charLimit = 60;

    if (attributes.statementData.length > charLimit) {
      trimmedData = attributes.statementData.slice(0, charLimit).split(' ').slice(0, -1).join(' ').concat('…');
    }
    return trimmedData;
  }

  acknowledged(chunkId: string, attributes: Chunk, lesson: Lesson) {
    const statement: Statement = this.getBase();

    statement.verb = {
      id: Verbs.acknowledged,
      display: { 'es-Es': 'ha observado' }
    };

    statement.object = {
      id: this.course.baseuri + '/chunk',
      definition: {
        name: { 'es-Es': chunkId + ' - ' + this.trimData(attributes) },
        description: { 'es-Es': attributes.statementData },
        type: ActivityTypes.chunk
      },
      objectType: 'Activity'
    };

    statement.context.contextActivities = {
      parent: {
        id: this.course.baseuri + '/lesson' + lesson.URI,
        definition: {
          name: { 'es-ES': lesson.id + ' - ' + lesson.title },
          description: { 'es-ES': lesson.description },
          type: ActivityTypes.slide
        },
        objectType: 'Activity'
      },
      grouping: {
        id: this.course.baseuri,
        objectType: 'Activity',
        definition: {
          type: ActivityTypes.course,
          name: { 'es-Es': this.courseData.title },
          description: { 'es-Es': this.courseData.description }
        }
      }
    };

    statement.context.registration = this.course.attemptGUID;
    statement.timestamp = new Date();

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  reviewed(chunkInfo) {
    const statement: Statement = this.getBase();

    statement.verb = {
      id: this.course.baseuri + Verbs.reviewed,
      display: { 'es-Es': 'ha revisado' }
    };

    // statement.object = {
    //   id: this.course.baseuri + '/chunk',
    //   definition: {
    //     name: { 'es-Es': chunkInfo },
    //     description: { 'es-Es': 'Representa un chunk dentro de una lección' },
    //     type: ObjectTypes.chunk
    //   }
    // };

    statement.context.registration = this.course.attemptGUID;
    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }
}
