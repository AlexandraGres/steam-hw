// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from "./interface";

export const environment: Environment = {
  production: false,
  apiKey: 'AIzaSyCNQD3AObUQsrDDeCtRFlqmCbvbpruszoE',
  fbDbUrl: 'https://steam-c13d4-default-rtdb.europe-west1.firebasedatabase.app',
  firebaseConfig: {
    apiKey: "AIzaSyCNQD3AObUQsrDDeCtRFlqmCbvbpruszoE",
    authDomain: "steam-c13d4.firebaseapp.com",
    databaseURL: 'https://steam-c13d4-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: "steam-c13d4",
    storageBucket: "steam-c13d4.appspot.com",
    messagingSenderId: "915084050254",
    appId: "1:915084050254:web:6ca05f8a3db69191baa81f"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
