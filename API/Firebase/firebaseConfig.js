import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import {getStorage, ref} from "firebase/storage"
import {getDatabase} from "firebase/database"
import firebase from "firebase/compat/app";
// import { Database } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDshsATIzdV48PSItUv0ePHJIaB2RwAEyA",
  authDomain: "weatherforecast-184a2.firebaseapp.com",
  databaseURL: "https://weatherforecast-184a2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "weatherforecast-184a2",
  storageBucket: "weatherforecast-184a2.appspot.com",
  messagingSenderId: "842320066215",
  appId: "1:842320066215:web:40d1eac20f905293640d82",
  measurementId: "G-17Q4Q5XKGB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const data = getDatabase(app)
// export const auth = initializeAuth(app,{persistence: getReactNativePersistence(ReactNativeAsyncStorage)})
export const auth = getAuth(app)

export const storage = getStorage(app)

