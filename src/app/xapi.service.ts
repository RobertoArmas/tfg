import { Injectable } from '@angular/core';
import { XapiCourse } from '../assets/types/xapiCourse.js';
import { Statement } from '../assets/types/statement.js';
import { Verbs } from '../assets/types/verbs.js';

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
    ADL.launch((error, launchdata, wrapper) => {

      // Conexión con xAPI Launch Server
      if (!error) {
        ADL.XAPIWrapper = wrapper;
        this.course.baseuri = launchdata.customData.content;

        console.log('--- contenido lanzado mediante xAPI Launch --\n', ADL.XAPIWrapper.lrs, '\n', launchdata);
      } else {

        // Valores por defecto para conectar la aplicación al LRS
        ADL.XAPIWrapper.changeConfig({
          'endpoint': 'https://cloud.scorm.com/tc/USCLE7C6OK/sandbox/',
          'user': 'jespinosa@atnova.com',
          'password': 'pedag0g1c0'
        });

        this.course.baseuri = 'http://e-learning.course/event/course/non-launch';

        launchdata = {
          actor: {
            account: {
              homePage: 'http://e-learning.course/server',
              name: 'Jorge E.'
            },
            name: 'Jorge E.'
          }
        };
        console.log('--- contenido no lanzado --- \n', ADL.XAPIWrapper.lrs);
      }

      this.buildCourse(launchdata.actor);
      // Aquí debe empezar la aplicación
    }, true);
  }

  buildCourse(actor) {
    this.course.statement = {
      actor: actor,
      object: {
        id: this.course.baseuri + '/curso-Elearning',
        definition: {
          name: { 'es-ES': 'Curso e-learning' },
          description: { 'es-ES': 'Primera versión de un curso e-learning utilizando xAPI' },
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
      console.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

  initialized() {
    this.course.attemptGUID = ADL.ruuid();
    const statement: Statement = this.getBase();

    statement.verb = {
      id: Verbs.started,
      display: { 'es-ES': 'ha empezado' }
    };

    statement.context.registration = this.course.attemptGUID;

    ADL.XAPIWrapper.sendStatement(statement, (resp: any) => {
      console.log(resp.status + ' - statement id: ' + resp.response);
    });
  }

}
