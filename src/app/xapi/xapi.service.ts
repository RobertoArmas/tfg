import { Injectable } from '@angular/core';
import { XapiCourse } from '../../assets/types/xapiCourse.js';
import { Statement } from '../../assets/types/statement.js';
import { Verbs } from './verbs.js';

import '../../assets/types/adl.js';
import { ObjectTypes } from './object-types.js';
import { AtnovaConfig, AtnovaBaseURI, AtnovaAgent } from './at-config.js';
import { XapiAgent } from '../../assets/types/xapiAgent.js';

@Injectable({
  providedIn: 'root'
})
export class XapiService {
  course: XapiCourse;
  actor: XapiAgent;

  constructor() {
    this.course = new XapiCourse();
    this.launchLrsConnection();
  }

  launchLrsConnection() {
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
    this.course.statement = {
      actor: actor,
      object: {
        id: this.course.baseuri,
        definition: {
          name: { 'es-ES': 'Curso e-learning' },
          description: { 'es-ES': 'Primera versión del curso e-learning utilizando xAPI' },
          type: 'http://adlnet.gov/expapi/activities/course'
        }
      },
      context: {
        contextActivities: {
          'grouping': [
            { 'id': this.course.baseuri + '/dev/course' },
            { 'id': this.course.baseuri }
          ]
        }
      }
    };
  }

  getBase(): Statement {
    return JSON.parse(JSON.stringify(this.course.statement));
  }

  started(startTime: Date) {
    this.course.attemptGUID = ADL.ruuid();
    const statement: Statement = this.getBase();

    statement.verb = {
      id: Verbs.started,
      display: { 'es-ES': 'ha empezado' }
    };

    statement.timestamp = startTime.toISOString();
    statement.context.registration = this.course.attemptGUID;

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  progressed(lessonInfo: string) {
    const statement: Statement = this.getBase();

    statement.verb = {
      id: Verbs.progressed,
      display: { 'es-Es': 'ha avanzado a' }
    };

    statement.object = {
      id: this.course.baseuri + '/lesson',
      definition: {
        name: { 'es-ES': lessonInfo },
        description: { 'es-ES': 'Representa una lección en el curso' },
        type: ObjectTypes.slide
      }
    };

    statement.timestamp = (new Date()).toISOString();
    statement.context.registration = this.course.attemptGUID;

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  navigatedBack(lessonInfo: string) {
    const statement: Statement = this.getBase();

    statement.verb = {
      id: this.course.baseuri + Verbs.navigatedBack,
      display: { 'es-ES': 'ha vuelto a' }
    };

    statement.object = {
      id: this.course.baseuri + '/lesson',
      definition: {
        name: { 'es-ES': lessonInfo },
        description: { 'es-ES': 'Representa una lección en el curso' },
        type: ObjectTypes.slide
      }
    };

    statement.timestamp = (new Date()).toISOString();
    statement.context.registration = this.course.attemptGUID;

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  navigatedTo(lessonInfo: string) {
    const statement: Statement = this.getBase();

    statement.verb = {
      id: this.course.baseuri + Verbs.navigatedTo,
      display: { 'es-ES': 'ha navegado a' }
    };

    statement.object = {
      id: this.course.baseuri + '/lesson',
      definition: {
        name: { 'es-ES': lessonInfo },
        description: { 'es-ES': 'Representa una lección en el curso' },
        type: ObjectTypes.slide
      }
    };

    statement.timestamp = (new Date()).toISOString();
    statement.context.registration = this.course.attemptGUID;
    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  acknowledged(chunkInfo) {
    const statement: Statement = this.getBase();

    statement.verb = {
      id: this.course.baseuri + Verbs.acknowledged,
      display: { 'es-Es': 'ha observado' }
    };

    statement.object = {
      id: this.course.baseuri + '/chunk',
      definition: {
        name: { 'es-Es': chunkInfo },
        description: { 'es-Es': 'Representa un chunk dentro de una lección' },
        type: ObjectTypes.chunk
      }
    };

    statement.context.registration = this.course.attemptGUID;
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

    statement.object = {
      id: this.course.baseuri + '/chunk',
      definition: {
        name: { 'es-Es': chunkInfo },
        description: { 'es-Es': 'Representa un chunk dentro de una lección' },
        type: ObjectTypes.chunk
      }
    };

    statement.context.registration = this.course.attemptGUID;
    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }
}
