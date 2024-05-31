import SignatureScreen from 'react-native-signature-canvas';
import { useRef, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import GetUser from '../../../../API/Firebase/get';
import { db } from '../../../../API/Firebase/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';
import { View, Text, Image } from 'react-native';

const Signing = ({ text = 'Sign here', route }) => {
  const signatureRef = useRef();
  const { id } = route.params;
  const [sign, setSign] = useState();

  const storage = getStorage();
  const imagePath = `${id.id}/sign/sign.png`;
  const storageRef = ref(storage, imagePath);
  const [downloadURL, setDownloadURL] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const user_info = await GetUser(id.id);
        setSign(user_info.sign);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [id]);

  const handleOK = async (signature) => {
    try {
      const uri = await saveSignatureImage(signature);
      const response = await fetch(uri, { responseType: 'blob' });
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);

      const docRef = doc(db, 'vcop', id.id);
      await updateDoc(docRef, {
        sign: true,
      });
    } catch (error) {
      console.error('Error saving signature:', error);
    }
  };

  const handleClear = () => {
    // signatureRef.current.clearSignature(); // Clears the signature canvas
    console.log("clear success!");
  };

  useEffect(() => {
    // Fetch image when the component mounts
    const fetchImage = async () => {
      try {
        const url = await getDownloadURL(storageRef);
        setDownloadURL(url);
      } catch (error) {
        setError(error);
      }
    };

    if (sign === true) {
      fetchImage();
    }
  }, [sign, storageRef]);

  useEffect(() => {
    // Additional logic if needed
  }, [sign, id]);

  const saveSignatureImage = async (signature) => {
    const base64Signature = signature.replace('data:image/png;base64,', ''); // Remove the data URL prefix
    const uri = FileSystem.cacheDirectory + 'signature.png';

    try {
      await FileSystem.writeAsStringAsync(uri, base64Signature, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return uri;
    } catch (error) {
      throw new Error('Failed to save signature image.');
    }
  };

  if (sign === true) {
    console.log(downloadURL);
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'white' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
          KHÔNG CÓ GÌ ĐỂ LÀM Ở ĐÂY
        </Text>
        {downloadURL ? (
          <Image source={{ uri: downloadURL }} style={{ width: 200, height: 200 }} />
        ) : (
          <Text>Loading image...</Text>
        )}
      </View>
    );
  }

  return (
    <SignatureScreen
      ref={signatureRef}
      onEnd={() => signatureRef.current.readSignature()}
      onOK={handleOK}
      onEmpty={() => console.log('Empty')}
      onClear={handleClear}
      onGetData={(data) => console.log(data)}
      autoClear={false}
      descriptionText={text}
      // webStyle={style}
    />
  );
};

export default Signing;