import React,{useState,useEffect} from "react"
import {View,SafeAreaView,FlatList,Text,TextInput, TouchableOpacity,Dimensions, ScrollView,Image,Button,Modal} from "react-native"
import { Animated } from "react-native"
import { NativeModules } from 'react-native';
// import RNFS from 'react-native-fs';
    // import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import GetUser from "../../../../API/Firebase/get";
import { db } from "../../../../API/Firebase/firebaseConfig";
import { updateDoc,doc } from "firebase/firestore";
import { getStorage,ref, uploadBytes,getDownloadURL  } from "firebase/storage";
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';


export default function CallInfo({navigation,route}){
    const {id}= route.params
    const [selectedImage,setSelectedImage]=useState("")
    // const storage = getStorage()
    const docRef = doc(db,"vcop",id.id)

    const [placeName,setPN]=useState()

        // const [data,setData] = useState([])
        const [name,setName] = useState("")
        const [phoneNum,setPhone]=useState()
        const [address,setAddress]=useState()
        const [job,setJob]=useState()
        const [birth,setBirth]=useState()
        const [plateNumber,setPlateNum]=useState([])
        const [clone,setClone]= useState()

        const [lis,setLis]=useState()
        const [regis,setRegis]=useState()
        const [rc,setRC]=useState()
        // const [violate,setViolate]=useState()
        
        // const today = new Date()
        // const month = today.getMonth()+1
        // const year = today.getFullYear()

        // let updatedData =[]
        // console.log(plateNumber);

        const [imageURIs, setImageURIs] = useState([]);
        const [visisbleModal,setVisibleModal]=useState(false)

  useEffect(() => {
    const fetchImageURIs = async () => {
      const updatedImageURIs = [];

      for (let i = 0; i < plateNumber.length-1; i++) {
        const item = plateNumber[i];
        let lisenceURI 
        let registrationURI
        let registration_certificateURI

        if(item.lisence){
          lisenceURI = await getImage(item.plateNum, i, "lisence");
        } else {
          lisenceURI = null
        }

        if(item.registration){
          registrationURI = await getImage(item.plateNum, i, "registration");
        } else {
          registrationURI = null
        }

        if(item.registration_certificate){
          registration_certificateURI = await getImage(item.plateNum, i, "registration_certificate");
        } else {
          registration_certificateURI = null
        }

        updatedImageURIs.push({
          lisenceURI,
          registrationURI,
          registration_certificateURI
        });
      }

      setImageURIs(updatedImageURIs);
    };

    fetchImageURIs();
  }, [plateNumber]);

  const renderImage = (uri) => {
    if (uri) {
      return (
        <Image source={{ uri }} style={{ width: 300, height: 200 }} />
      );
    } else {
      return (
        <View style={{ width: 100, height: 100, backgroundColor: "gray" }}>
          <Text>No Image</Text>
        </View>
      );
    }
  };
        
        const fetchAndUploadImage = async (imageUrl,index,name,plateNum) => {      
          const storage = getStorage();
          const storageRef = ref(
            storage,
            `${id.id}/${plateNum}/${index}/${name}/${name}.jpg`
          );
        
          try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
        
            await uploadBytes(storageRef, blob);
            console.log('Image uploaded successfully.');
          } catch (error) {
            console.error('Error uploading image:', error);
          }

        };


    
        useEffect(() => {
            (async () => {
              const { status } = await ImagePicker.requestCameraPermissionsAsync();
              if (status !== 'granted') {
                console.log('Camera permission not granted');
              }
            })();
          }, []);
        
          const handleGetPhoto = async (index,name,plateNum) => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [4, 3],
              quality: 0.8,
            });
            // console.log('result.uri', result);
            // setImageUri(result.assets[0].uri);



            setSelectedImage(result.assets[0].uri)
            // console.log(selectedImage);
           
            
            // setClone(plateNumber)
            
            // console.log(converted);
            console.log(selectedImage);
            const a = await fetchAndUploadImage(selectedImage,index,name,plateNum)
                let updatedData = []

                if(name === "lisence"){
                setPlateNum(prevPlateNumber => {
                    updatedData = [...prevPlateNumber];
                    updatedData[index].lisence = true;
                    return updatedData;
                  });
                }

                if(name === "registration"){
                    setPlateNum(prevPlateNumber => {
                        updatedData = [...prevPlateNumber];
                        updatedData[index].registration = true;
                        return updatedData;
                      });
                    }

                    if(name === "registration_certificate"){
                        setPlateNum(prevPlateNumber => {
                            updatedData = [...prevPlateNumber];
                            updatedData[index].registration_certificate = true;
                            return updatedData;
                          });
                        }
            console.log(plateNumber);
                    
            
          };
        
    
        useEffect(()=>{
            const getData = async ()=>{
                try{
                    const user_info = await GetUser(id.id)
                    // console.log(user_info);
                    // console.log(user_info);
                   
                    setName(user_info.name)
                    // setData(user_info.violate)
                    setPhone(user_info.phoneNumber)
                    setAddress(user_info.address)
                    setBirth(user_info.birthdate)
                    setJob(user_info.job)
                    setPlateNum(user_info.plateNum)
                    // setViolate(user_info.violate.filter(x=>x.type==5).length)
                    
                } catch(err){
                    console.error(err)
                }
            } 
            getData()
            
        },[id])

    const infos = [
        {title:"Tên chủ phương tiện/tổ chức sở hữu",info:name},
        {title:"Số điện thoại",info:phoneNum},
        {title:"Địa chỉ thường trú",info:address},
        {title:"Nghề nghiệp,Công ty", info:job},
        {title:"Ngày tháng năm sinh", info:birth}
    ]


    const getImage = async (plateNum, index, name) => {
      const storage2 = getStorage();
      const storageRef2= ref(storage2, `${id.id}/${plateNum}/${index}/${name}/${name}.jpg`);
      
      try {
        const downloadURL1 = await getDownloadURL(storageRef2);
        return downloadURL1;
      } catch (error) {
        console.error('Error downloading image:', error);
        return null;
      }
      };

  const handlePress = async ()=>{
    await updateDoc(docRef, {
        plateNum: plateNumber
      });
  }

  console.log(imageURIs);


    return( 
        <SafeAreaView style={{flex:1,backgroundColor:"white",alignItems:"center"}}>
            <View style={{alignItems:"center",marginTop:30}}>
                <Text style={{fontSize:20,fontWeight:"bold"}}>KHAI BÁO THÔNG TIN</Text>
                <Text style={{fontSize:20,fontWeight:"bold"}}>PHƯƠNG TIỆN,</Text>
                <Text style={{fontSize:20,fontWeight:"bold"}}>CHỦ PHƯƠNG TIỆN</Text>
            </View>

            <ScrollView>
            <FlatList
            style={{marginTop:5}}
            data={infos}
            renderItem={({item})=>{
                return(
                <View style={{marginTop:15,width: Dimensions.get("screen").width*0.8}}>
                    <Text style={{fontWeight:"bold",fontSize:15}}>{item.title}</Text>
                    <Text style={{marginTop:5,backgroundColor:"#F7F8F9",paddingLeft:10,paddingVertical:7,color:"#8391A1",borderRadius:20}}>{item.info}</Text>
                </View>)
            }}/>

            <FlatList
            data={plateNumber}
            renderItem={({item,index})=>{
                
                
                return(
                    <View style={{marginTop:20}}>
                    <Text style={{fontWeight:"bold",fontSize:15}}>Phương tiện sở hữu {index+1}</Text>
                    <Text style={{marginTop:5,backgroundColor:"#F7F8F9",paddingLeft:10,paddingVertical:7,color:"#8391A1",borderRadius:20}}>{item.plateNum}</Text>
                    <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between",marginTop:20,backgroundColor:"#F7F8F9",paddingHorizontal:10,paddingVertical:13}} onPress={()=>handleGetPhoto(index,"lisence",item.plateNum)}>
                        <Text>Bằng Lái</Text>
                        <Text>TẢI LÊN</Text>
                    </TouchableOpacity>

                    {item.lisence? (
                          renderImage(imageURIs[index].lisenceURI)
                    ):(
                        <View></View>
                    )} 

<TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between",marginTop:20,backgroundColor:"#F7F8F9",paddingHorizontal:10,paddingVertical:13}} onPress={()=>handleGetPhoto(index,"lisence",item.plateNum)}>
                        <Text>Giấy Đăng Kiểm</Text>
                        <Text>TẢI LÊN</Text>
                    </TouchableOpacity>

                    {item.registration? (
                          renderImage(imageURIs[index].registrationURI)
                    ):(
                        <View></View>
                    )}

<TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between",marginTop:20,backgroundColor:"#F7F8F9",paddingHorizontal:10,paddingVertical:13}} onPress={()=>handleGetPhoto(index,"lisence",item.plateNum)}>
                        <Text>Cà Vẹt Xe</Text>
                        <Text>TẢI LÊN</Text>
                    </TouchableOpacity>

                    {item.registration_certificate? (
                         renderImage(imageURIs[index].registration_certificateURI)
                    ):(
                        <View style={{width: 0, height: 0}}></View>
                    )}
                    </View>
                )
            }}/>

            <Button title="Thêm Biển Số" color="midnightblue" onPress={()=>setVisibleModal(true)}/>
            <Modal visible={visisbleModal}>
              <View>
                <Text>Biển Số Xe</Text>
                <TextInput  placeholderTextColor="gray" placeholder="Nhập Biển Số Xe" onChangeText={text=>setPN(text)}/>
                <TouchableOpacity>
                  <Image/>
                </TouchableOpacity>
              </View>
            </Modal>
            </ScrollView>

            <TouchableOpacity onPress={handlePress} style={{paddingBottom:20}}>
                <Text>Xác nhận</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}