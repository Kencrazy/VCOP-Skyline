import { auth,db } from './firebaseConfig';
import { collection, doc, setDoc, getDoc, query, where,getDocs} from 'firebase/firestore';
// import { FIRESTORE_DB } from '../../firebaseConfig';
import { useState } from 'react';


export const getInfoFromPlateNumber = async (plateNumber) => {
  const q = query(collection(db, "vcop"));
  const querySnapshot = await getDocs(q);
  let documentId = null;

  for (const doc of querySnapshot.docs) {
    const userData = doc.data();
    const data = userData.plateNum;
    
    for (let i = 0; i < data.length; i++) {
      if (data[i].plateNumb === plateNumber) {
        documentId = doc.id;
        return documentId; // Early return with the found documentId
      }
    }
  }
  return documentId; // Returns null if not found
};

  export const GetDocIDFromUserID= async(violator_id)=>{
    console.log(violator_id);
    const q = query(collection(db,"vcop"))
    const querySnapshot = await getDocs(q);
    let documentId =""
  
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      // console.log(userData);
    //   console.log(doc.id);
      if (userData.id === Number(violator_id)) {
        documentId = doc.id;
        // console.log('This is the owner of the car:', plateNumber);
        // console.log(doc.id);

      }
    });
    return documentId;
  }