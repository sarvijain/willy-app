import firebase from 'firebase'
require('@firebase/firestore')

const firebaseConfig = {

    apiKey: "AIzaSyDc4zQKf42IhyPXKspJVMchSh6NRv8OX2I",
    authDomain: "willy-app-e9e43.firebaseapp.com",
    projectId: "willy-app-e9e43",
    storageBucket: "willy-app-e9e43.appspot.com",
    messagingSenderId: "438421593428",
    appId: "1:438421593428:web:1442abf53b277893f7bcc1"
 
};
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 export default firebase.firestore();
 