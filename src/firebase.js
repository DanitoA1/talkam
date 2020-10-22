import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init
const firebaseConfig = {
  apiKey: 'AIzaSyBdYYSMdW7NJFra5neoIM8gsRDhCGwsIao',
  authDomain: 'talkam-2d177.firebaseapp.com',
  databaseURL: 'https://talkam-2d177.firebaseio.com',
  projectId: 'talkam-2d177',
  storageBucket: 'talkam-2d177.appspot.com',
  messagingSenderId: '501391458052',
  appId: '1:501391458052:web:bda6c770cfab2577f25a51',
  measurementId: 'G-9RNQ36TFDL',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// data referencing
const usersCollection = db.collection('users');
const boardsCollection = db.collection('boards');
const quizCollectioin = db.collection('quizzes');
const boardResults = db.collection('boardResults');
const quizResults = db.collection('quizResults');

// export utils/refs
export {
  db,
  auth,
  usersCollection,
  boardsCollection,
  quizCollectioin,
  boardResults,
  quizResults,
};
