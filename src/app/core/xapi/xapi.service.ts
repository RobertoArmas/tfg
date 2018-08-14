import { Injectable } from '@angular/core';

import { ActivityTypes } from './activity-types.js';
import { UaConfig, UaBaseURI, UaAgent } from './config.js';
import { verbs } from './statement-verbs.js';
import { Statement, StatementAgent } from './statement.model.js';
import { Course, CourseData } from '../../course-viewer/course.model.js';
import { LessonData } from '../../course-viewer/lesson.model.js';
import { ChunkData } from '../../chunks/chunk.model.js';
import { ChunkMultipleChoice } from '../../chunks/activity/chunk-multiple-choice/chunk-multiple-choice.js';


@Injectable()
export class XapiService {
  course: Course;
  actor: StatementAgent;

  constructor() {
    this.course = new Course();
    this.launchLrsConnection();
  }

  launchLrsConnection() {

    // Activa/desactiva el logging de xAPI
    ADL.XAPIWrapper.log.debug = true;

    ADL.XAPIWrapper.changeConfig(UaConfig);
    this.actor = UaAgent;

    ADL.XAPIWrapper.log('--- configuración de LRS realizada con éxito --- \n');
    ADL.XAPIWrapper.log(ADL.XAPIWrapper.lrs);

    this.buildCourseBaseStatement(this.actor);
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

  started(courseData: CourseData) {
    this.course.setData(courseData);
    this.course.URI = UaBaseURI + this.course.URI;
    this.course.attemptGUID = ADL.ruuid();
    const statement: Statement = this.getBase();

    statement.verb = verbs.started;

    statement.object = {
      id: this.course.URI,
      definition: {
        name: { 'es-Es': this.course.title },
        description: { 'es-Es': this.course.description },
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

  progressed(lesson: LessonData) {
    const statement: Statement = this.getBase();

    statement.verb = verbs.progressed;

    statement.object = {
      id: this.course.URI + '/lesson' + lesson.URI,
      definition: {
        name: { 'es-ES': lesson.id + ' - ' + lesson.title },
        description: { 'es-ES': lesson.description },
        type: ActivityTypes.slide
      },
      objectType: 'Activity'
    };

    statement.context.contextActivities = {
      grouping: {
        id: this.course.URI,
        objectType: 'Activity',
        definition: {
          type: ActivityTypes.course,
          name: { 'es-Es': this.course.title },
          description: { 'es-Es': this.course.description }
        }
      }
    };

    statement.context.registration = this.course.attemptGUID;
    statement.timestamp = new Date();

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  navigatedBack(lesson: LessonData) {
    const statement: Statement = this.getBase();

    statement.verb = verbs.navigatedBack;

    statement.object = {
      id: this.course.URI + '/lesson' + lesson.URI,
      definition: {
        name: { 'es-ES': lesson.id + ' - ' + lesson.title },
        description: { 'es-ES': lesson.description },
        type: ActivityTypes.slide
      },
      objectType: 'Activity'
    };

    statement.context.contextActivities = {
      grouping: {
        id: this.course.URI,
        objectType: 'Activity',
        definition: {
          type: ActivityTypes.course,
          name: { 'es-Es': this.course.title },
          description: { 'es-Es': this.course.description }
        }
      }
    };

    statement.context.registration = this.course.attemptGUID;

    statement.timestamp = new Date();

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  navigatedTo(lesson: LessonData) {
    const statement: Statement = this.getBase();

    statement.verb = verbs.navigatedTo;

    statement.object = {
      id: this.course.URI + '/lesson' + lesson.URI,
      definition: {
        name: { 'es-ES': lesson.id + ' - ' + lesson.title },
        description: { 'es-ES': lesson.description },
        type: ActivityTypes.slide
      },
      objectType: 'Activity'
    };

    statement.context.contextActivities = {
      grouping: {
        id: this.course.URI,
        objectType: 'Activity',
        definition: {
          type: ActivityTypes.course,
          name: { 'es-Es': this.course.title },
          description: { 'es-Es': this.course.description }
        }
      }
    };

    statement.context.registration = this.course.attemptGUID;

    statement.timestamp = new Date();

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  trimData(attributes: ChunkData): string {
    let trimmedData: string = attributes.statementData;
    const charLimit = 60;

    if (attributes.statementData.length > charLimit) {
      trimmedData = attributes.statementData.slice(0, charLimit).split(' ').slice(0, -1).join(' ').concat('…');
    }
    return trimmedData;
  }

  acknowledged(chunkId: string, attributes: ChunkData, lesson: LessonData) {
    const statement: Statement = this.getBase();

    statement.verb = verbs.acknowledged;

    statement.object = {
      id: this.course.URI + '/chunk',
      definition: {
        name: { 'es-Es': chunkId + ' - ' + this.trimData(attributes) },
        description: { 'es-Es': attributes.statementData },
        type: ActivityTypes.chunk
      },
      objectType: 'Activity'
    };

    statement.context.contextActivities = {
      parent: {
        id: this.course.URI + '/lesson' + lesson.URI,
        definition: {
          name: { 'es-ES': lesson.id + ' - ' + lesson.title },
          description: { 'es-ES': lesson.description },
          type: ActivityTypes.slide
        },
        objectType: 'Activity'
      },
      grouping: {
        id: this.course.URI,
        objectType: 'Activity',
        definition: {
          type: ActivityTypes.course,
          name: { 'es-Es': this.course.title },
          description: { 'es-Es': this.course.description }
        }
      }
    };

    statement.context.registration = this.course.attemptGUID;
    statement.timestamp = new Date();

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  reviewed(chunkId: string, attributes: ChunkData, lesson: LessonData) {
    const statement: Statement = this.getBase();

    statement.verb = verbs.reviewed;

    statement.object = {
      id: this.course.URI + '/chunk',
      definition: {
        name: { 'es-Es': chunkId + ' - ' + this.trimData(attributes) },
        description: { 'es-Es': attributes.statementData },
        type: ActivityTypes.chunk
      },
      objectType: 'Activity'
    };

    statement.context.contextActivities = {
      parent: {
        id: this.course.URI + '/lesson' + lesson.URI,
        definition: {
          name: { 'es-ES': lesson.id + ' - ' + lesson.title },
          description: { 'es-ES': lesson.description },
          type: ActivityTypes.slide
        },
        objectType: 'Activity'
      },
      grouping: {
        id: this.course.URI,
        objectType: 'Activity',
        definition: {
          type: ActivityTypes.course,
          name: { 'es-Es': this.course.title },
          description: { 'es-Es': this.course.description }
        }
      }
    };

    statement.context.registration = this.course.attemptGUID;
    statement.timestamp = new Date();

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  answered(chunkId: string, attributes: ChunkMultipleChoice, lesson: LessonData) {
    const statement: Statement = this.getBase();

    statement.verb = verbs.answered;

    statement.object = {
      id: this.course.URI + '/chunk',
      definition: {
        name: { 'es-Es': chunkId + ' - ' + this.trimData(attributes) },
        description: { 'es-Es': attributes.statementData },
        type: ActivityTypes.interaction,
        interactionType: attributes.interactionType,
        correctResponsesPattern: attributes.correctResponsePattern,
        choices: attributes.statementChoices
      },
      objectType: 'Activity'
    };

    statement.context.contextActivities = {
      parent: {
        id: this.course.URI + '/lesson' + lesson.URI,
        definition: {
          name: { 'es-ES': lesson.id + ' - ' + lesson.title },
          description: { 'es-ES': lesson.description },
          type: ActivityTypes.slide
        },
        objectType: 'Activity'
      },
      grouping: {
        id: this.course.URI,
        objectType: 'Activity',
        definition: {
          type: ActivityTypes.course,
          name: { 'es-Es': this.course.title },
          description: { 'es-Es': this.course.description }
        }
      }
    };

    statement.result = {
      success: attributes.statementSuccess,
      response: attributes.statementResponse,
      extensions: {
        'https://www.ua.es/tfgJorgeEspinosa/extensions/previousAttempts':  attributes.previousAttempts
      }
    };

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      ADL.XAPIWrapper.log(resp.status + ' - statement id: ' + resp.response);
    });
  }
}
