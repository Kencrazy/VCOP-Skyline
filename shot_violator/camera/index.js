import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text,SafeAreaView,TouchableOpacity,ScrollView } from 'react-native';
import { recognizePlate } from '../../API/Platerecognizer/recognition';
import { styles } from './styles';
import { getInfoFromPlateNumber } from '../../API/Firebase/getIDfromPlate';
import * as ImagePicker from 'expo-image-picker';

export default function ViolatorContact({navigation}) {
  const [imageUri, setImageUri] = useState(null);
  const [plateNumber, setPlateNumber] = useState(null);
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
      allowsEditing: true,
      aspect: [4,3],
      quality: 0.8,
    });
    console.log('result.uri', result.assets[0].uri);
    setImageUri(result.assets[0].uri);
  };


  const handleRecognizePlate = async () => {
    try {
      const plateData = await recognizePlate(imageUri);
      setPlateNumber(plateData);
      console.log(plateData);

      const violator_id = await getInfoFromPlateNumber("43A37302")
      navigation.navigate("info",{id:violator_id,plateNum: "43A37302"})
      setPlateNumber("43A37302")

    //   console.log('License Plate Data:', plateData);
    } catch (error) {
      console.error('Error recognizing plate:', error);
    }
    // navigation here
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
            <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate("Des0",{plateNum:"43A37302"})}>
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