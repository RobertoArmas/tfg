import { UaBaseURI } from './config';

const verbsURI = UaBaseURI + '/verbs';

export const verbs = {
    started: {
        id: 'http://activitystrea.ms/schema/1.0/start',
        display: { 'es-ES': 'ha empezado' }
    },
    progressed: {
        id: 'http://adlnet.gov/expapi/verbs/progressed',
        display: { 'es-ES': 'ha avanzado a' }
    },
    navigatedBack: {
        id: verbsURI + '/navigate-back',
        display: { 'es-ES': 'ha vuelto a' }
      },
    navigatedTo: {
        id: verbsURI + 'navigate-to',
        display: { 'es-ES': 'ha navegado a' }
      },
    acknowledged: {
        id: 'http://activitystrea.ms/schema/1.0/acknowledge',
        display: { 'es-Es': 'ha observado' }
      },
    reviewed: {
        id: 'http://id.tincanapi.com/verb/reviewed',
        display: { 'es-Es': 'ha revisado' }
      },
    answered: {
        id: 'http://adlnet.gov/expapi/verbs/answered',
        display: { 'es-Es': 'ha contestado' }
      },
    interacted: {
      id: 'http://adlnet.gov/expapi/verbs/interacted',
      display: {'es-Es': 'ha completado interacción'}
    },
    checked: {
      id: 'http://tfg-jespinosa/verbs/checked',
      display: {'es-Es': 'ha marcado la opción'}
    },
    unchecked: {
      id: 'http://tfg-jespinosa/verbs/unchecked',
      display: {'es-Es': 'ha desmarcado la opción'}
    }
};
