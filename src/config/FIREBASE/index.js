import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/database'
import 'firebase/compat/storage'

firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
})

const FIREBASE = firebase

export default FIREBASE