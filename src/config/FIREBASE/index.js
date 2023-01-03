import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/storage'

firebase.initializeApp({
    apiKey: "AIzaSyCU9KIZHpF9uWd6QbD3yeB_PQjezT7nu2o",
    authDomain: "e-skripsi-b6ffb.firebaseapp.com",
    projectId: "e-skripsi-b6ffb",
    storageBucket: "e-skripsi-b6ffb.appspot.com",
    messagingSenderId: "828894543844",
    appId: "1:828894543844:web:440992c31676c5fa0e11f1"
})

const FIREBASE = firebase

export default FIREBASE