// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // URL de la API de desarrollo 'json-server'
  apiUrl: 'http://localhost:3000',

  // Datos de conexión con Firebase
  firebase: {
    apiKey: 'AIzaSyDE2ypmJNJjjwbOIvaZVwkVjOhFBX_gXR4',
    authDomain: 'e-learning-ua.firebaseapp.com',
    databaseURL: 'https://e-learning-ua.firebaseio.com',
    projectId: 'e-learning-ua',
    storageBucket: 'e-learning-ua.appspot.com',
    messagingSenderId: '1031964504350'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
