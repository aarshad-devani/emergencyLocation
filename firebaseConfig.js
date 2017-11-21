import * as firebase from 'firebase';

const config = {
    apiKey: "<your-api-key>",
    authDomain: "<your-auth-domain>",
    databaseURL: "<your-database-url>",
    projectId: "<your-project-id>",
    storageBucket: "<your-storage-bucket>",
    messagingSenderId: "<your-messagingSender-ID>"
};
firebase.initializeApp(config);
export default firebase;