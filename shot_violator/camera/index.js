import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text,SafeAreaView,TouchableOpacity,ScrollView,Alert } from 'react-native';
import { recognizePlate } from '../../API/Platerecognizer/recognition';
import { styles } from './styles';
import { getInfoFromPlateNumber } from '../../API/Firebase/getIDfromPlate';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator  from 'expo-image-manipulator';

export default function ViolatorContact({navigation}) {
  const [imageUri, setImageUri] = useState(null);
  const [plateNumber, setPlateNumber] = useState("");
  // const [violator_id,setID]=useState("")
  // const [violator_id,setID]=useState("")

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        console.log('Camera permission not granted');
      }
    })();
  }, []);

  const handleTakePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1,1],
      quality: 1,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri)
      // setImageUri(await resizeImage(result.assets[0].uri))
    }
    // const plateData = await recognizePlate(imageUri)
    

    



      // console.log(plateData);
      

    //   console.log('License Plate Data:', plateData);
    
  };

  useEffect(() => {
    const resizeImage = async (uri) => {
      const manipResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 800, height: 600 } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipResult.uri
    };
    if (imageUri) {
      const updatePlateNumber = async () => {
        const recognizedPlate = await recognizePlate(await resizeImage(imageUri));
        setPlateNumber(recognizedPlate);
      };
      updatePlateNumber();
    }
  }, [imageUri]);



  const handleRecognizePlate = async () => {
    try {
      if (plateNumber) {
        const violator_id = await getInfoFromPlateNumber(plateNumber);
        if (violator_id) {
          navigation.navigate("info", { id: violator_id, plateNum: plateNumber });
        } else {
          Alert.alert("Người dùng không có trong hệ thống, hãy kiểm tra có quét đúng biển số không");
        }
      } else {
        Alert.alert("Người dùng không có trong hệ thống, hãy kiểm tra có quét đúng biển số không");
      }
    } catch (error) {
      console.error('Error recognizing plate:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor:"white" }}>
      <View style={{ flex: 1 }}>

        <TouchableOpacity style={{alignItems:"center",marginTop:"10%"}} onPress={handleTakePhoto}>
          <Image style={{width:320,height:550}} source={require("../../assets/Camera.png")} />
        </TouchableOpacity>



        {imageUri ? (
          <View style={{alignItems:"center",marginTop:"10%"}}>
            <Image source={{ uri: imageUri }} style={{ width: 300, height: 200 }} />

            <View style={{marginTop:"5%"}}>

            <View>
              <Text >Biển số xe được nhận diện:{plateNumber} </Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Des0",{plateNum:plateNumber})}>
              <Text>Tạo biên bản thủ công</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={handleRecognizePlate}>
              <Text>Tạo biên bản</Text>
            </TouchableOpacity>
            </View>


          </View>
         ) : ( 
          <View style={{alignItems:"center", marginTop:"2%"}}>
            <Text>No photo taken</Text>
          </View>
         )} 
      </View>
    </ScrollView>
  );
}