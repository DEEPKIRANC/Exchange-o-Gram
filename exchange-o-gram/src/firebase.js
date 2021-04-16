import firebase from "firebase";

const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyAYxIx9V9_0yon-cQEhtXtxzj--P3ISqFs",
    authDomain: "exchange-o-gram-f8d0e.firebaseapp.com",
    projectId: "exchange-o-gram-f8d0e",
    storageBucket: "exchange-o-gram-f8d0e.appspot.com",
    messagingSenderId: "262200067676",
    appId: "1:262200067676:web:980a08f9cbf0b98d948899",
    measurementId: "G-Z5ETR429ZG"
  })

  const db=firebaseApp.firestore();
  const projectStorage=firebaseApp.storage();
  const auth=firebase.auth();

  export {db,projectStorage,auth} ;