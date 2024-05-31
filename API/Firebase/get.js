import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default async function GetUser(id) {
  const docRef = doc(db, "vcop", id);
  let data_container;

  try {
    const docSnap = await getDoc(docRef);
    data_container = docSnap.data();
  } catch (error) {
    console.warn(error);
  }

  return data_container;
}