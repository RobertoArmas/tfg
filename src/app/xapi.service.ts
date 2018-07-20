import { Injectable } from '@angular/core';
import { XapiCourse } from '../assets/types/xapiCourse.js';
import { Statement } from '../assets/types/statement.js';
import { Verbs } from '../assets/types/verbs.js';

import '../assets/types/adl';
import { ObjectTypes } from '../assets/types/object-types.js';

@Injectable({
  providedIn: 'root'
})
export class XapiService {
  course: XapiCourse;

  constructor() {
    this.course = new XapiCourse();
    this.launchLrsConnection();
  }

  launchLrsConnection() {
    ADL.XAPIWrapper.log.debug = true;

    ADL.launch((error, launchdata, wrapper) => {

      // Cuando consigue conectar con el xAPI Launch Server
      if (!error) {
        ADL.XAPIWrapper = wrapper;
        this.course.baseuri = launchdata.customData.content;

        ADL.XAPIWrapper.log('--- contenido lanzado mediante xAPI Launch --\n');
        ADL.XAPIWrapper.log(ADL.XAPIWrapper.lrs);
        ADL.XAPIWrapper.log(launchdata);
      } else { // <-- Valores por defecto para conectar la aplicación al LRS
        ADL.XAPIWrapper.changeConfig({
          'endpoint': 'https://cloud.scorm.com/tc/USCLE7C6OK/sandbox/',
          'user': 'jespinosa@atnova.com',
          'password': 'pedag0g1c0'
        });

        this.course.baseuri = 'http://e-learning.course/event/course';

        launchdata = {
          actor: {
            account: {
              homePage: 'http://e-learning.course/server',
              name: 'Jorge'
            },
            name: 'Jorge'
          }
        };

        ADL.XAPIWrapper.log('--- contenido no lanzado --- \n');
        ADL.XAPIWrapper.log(ADL.XAPIWrapper.lrs);
      }

      this.buildCourseBaseStatement(launchdata.actor);

    }, true);
  }

  buildCourseBaseStatement(actor) {
    this.course.statement = {
      actor: actor,
      object: {
        id: this.course.baseuri + '/no-accesible',
        definition: {
          name: { 'es-ES': 'Curso e-learning no accesible' },
          description: { 'es-ES': 'Primera versión del curso e-learning no accesible utilizando xAPI' },
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

  getBase() {
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
}
