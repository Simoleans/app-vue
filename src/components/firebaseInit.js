import firebase from 'firebase'
import 'firebase/auth'
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig);
const rtdb = firebaseApp.database();
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();
const provider =  new firebase.auth.GoogleAuthProvider();
export {rtdb as rtdb, db as db,provider as provider, storage as storage, firebase as firebase};