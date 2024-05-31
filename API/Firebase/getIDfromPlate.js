import { auth,db } from './firebaseConfig';
import { collection, doc, setDoc, getDoc, query, where,getDocs} from 'firebase/firestore';
// import { FIRESTORE_DB } from '../../firebaseConfig';
import { useState } from 'react';


export const getInfoFromPlateNumber = async ( plateNumber ) => {
    const q = query(collection(db,"vcop"))
    const querySnapshot = await getDocs(q);
    let documentId 
    // const [data,setData]=useState()
    // let plateInfo = []
  
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const data = userData.plateNum
      // console.log(doc.id);
      // console.log(userData.plateNum[1]);
      for(let i = 0 ; i<= data.length-1; i=i+1){
        // setData( userData.plateNum[i])
        
        if (data[i].plateNumb === plateNumber) {
          documentId = doc.id;
          break
          
          
          // console.log('This is the owner of the car:', plateNumber);
          // console.log(doc.id);

        }
    }
    });
    // console.log(plateInfo);
    return documentId;

  
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