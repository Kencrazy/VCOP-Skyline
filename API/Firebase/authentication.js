// import { FIREBASE_AUTH } from '../../firebaseConfig';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { db } from './firebaseConfig';
import { collection, doc, setDoc, getDoc} from 'firebase/firestore';

export const handleLogin = async ({id, password}) => {
  try {
    const response = await signInWithEmailAndPassword(auth, `${id}@gmail.com`, password="12345678");
    // console.log(response);
    const currentUser = auth.currentUser;
    let position;
    if (currentUser) {
      const currentUserID = currentUser.uid;
      const userDocRef = doc(db, 'vcop', currentUserID);
      const res = await getDoc(userDocRef);
      position = res.data()
      // console.log("type", type.data());
    }
    let data = []
    data.unshift(position)
    data.unshift(currentUser.uid)

    return data;
  } catch (error) {
    console.log('signInwithemailandpassword: ', `${id}@gmail.com`, password);

    console.log('Login Error:', error);
    return false;
  }
};

export const handleSignUp = async ({ id, password, username, phoneNum,job="undefined",birthdate="00/00/0000",plateNum = "" }) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, `${id}@gmail.com`, password);
      console.log(response);
      let position
      if(Number(id)==1){
        position = "user"
      } else if(Number(id)==2){
        position="police"
      } else if(Number(id)==3){
        position = "author"
      }
  
      const currentUser = auth.currentUser;
      if (currentUser) {
        const currentUserID = currentUser.uid;
        const userDocRef = doc(db, 'vcop', currentUserID);
        await setDoc(userDocRef, {
          position: position, 
          name: username,
          id: Number(id),
          phoneNumber: phoneNum,
          job: job,
          birthdate: birthdate,
          position: position,
          plateNum: plateNum,
          violate:[],
          history:[],
          money:0
        });
        console.log('User information successfully added to Firestore');
      } else {
        console.log('No current user found');
      }
    } catch (error) {
      console.log('Signup Error:', error);
    }
};

export const handleSignOut = async()=> {
  await signOut();
}