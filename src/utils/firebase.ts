import firebase from 'firebase';

export type FirebaseConfig = {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
};

const firebaseConfig: FirebaseConfig = {
    apiKey: '***REMOVED***',
    authDomain: '***REMOVED***',
    databaseURL: '***REMOVED***',
    projectId: 'triage-wheel-of-misfortune',
    storageBucket: '***REMOVED***',
    messagingSenderId: '***REMOVED***',
    appId: '1:***REMOVED***:web:0f775cea90d9ad3bb7adb3',
    measurementId: '***REMOVED***',
};

firebase.initializeApp(firebaseConfig);
export default firebase;
