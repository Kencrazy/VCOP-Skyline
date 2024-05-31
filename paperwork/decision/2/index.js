import { ScrollView,View,Text,TouchableOpacity, SafeAreaView,Image } from "react-native";
import { useState,useEffect } from "react";
import {doc,updateDoc} from "firebase/firestore"
import { db } from "../../../API/Firebase/firebaseConfig";
import GetUser from "../../../API/Firebase/get";
import RNPickerSelect from 'react-native-picker-select';
import { getDownloadURL,ref,getStorage } from "firebase/storage";


export default function Decision2({navigation,route}){
    
    const {id,violator_id,plateNum}=route.params
    const today = new Date()
    const hour = today.getHours()
    const minute = today.getMinutes()
    const day = today.getDate()
    const month = today.getMonth()+1
    const year = today.getFullYear()
    const [violator,setViolator]=useState()

    const storage = getStorage();
    const imagePath = `${id}/sign/sign.png`;
    const imagePathViolator = `${violator_id}/sign/sign.png`
    const storageRef = ref(storage, imagePath);
    const storageRef2 = ref(storage,imagePathViolator)
  const [downloadURL, setDownloadURL] = useState(null);
  const [downloadURL2, setDownloadURL2] = useState(null);
  const [error, setError] = useState(null);

  const [sign,setSign]=useState()
  const [sign2,setSign2]=useState()

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const police_info = await GetUser(id)
                // console.log(user_info);
               

                setSign(police_info.sign)
                // setID(user_info.id)
                // setViolate(user_info.violate.length)

                
            } catch(err){
                console.error(err)
            }
        } 
        getData()

        const fetchImage = async () => {
            try {
              const url = await getDownloadURL(storageRef);
            //   const url2 = await getDownloadURL(storageRef2)
            //   setDownloadURL2(url2)
              setDownloadURL(url);
            } catch (error) {
              setError(error);
            }
          };
      
          fetchImage()
        
    },[id])

    const set_appointment = async()=>{
        
        const client = await GetUser(violator_id);
        const client_violate = client.violate // Make sure police_violate is an array
        console.log(client_violate);
        const newReport = {
            id: id,
            type:1,
            violator:violator,
            date: `${day}/${month}/${year}`,
            time: `${hour}:${minute}`,
            plateNum:plateNum
        };
    
        // Update the police_violate array
        client_violate.unshift(newReport);
        console.log(client_violate);
    
        // Update the Firestore document
        const docRef = doc(db, "vcop",violator_id);
        await updateDoc(docRef, {
          violate: client_violate,
        });
    
        // setViolate(police_violate); 
        navigation.navigate("Done");
      
}
const handleValueChange = (value) => {
    setViolator(value);
    // console.log('Selected option:', value);
  };
    return(
        <ScrollView style={{backgroundColor:"white",flex:1,paddingTop:35,paddingHorizontal:10}}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={{fontSize:11}}>Số:....BB-VPHC</Text>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:12,fontWeight:"bold"}}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
                    <Text style={{fontSize:12,fontWeight:"bold"}}>Độc lập - Tự do - Hạnh phúc</Text>
                    <View style={{borderWidth:1,width:150,marginTop:3}}></View>
                </View>
            </View>

            <Text style={{color:"red",fontSize:20,fontWeight:"bold",textAlign:"center",marginTop:30}}>ĐƠN THÔNG BÁO VI PHẠM</Text>
            <Text style={{fontSize:11,fontWeight:"bold",textAlign:"center"}}>Phương tiện: {plateNum}</Text>

            <View style={{flexDirection:"row",marginTop:40}}>
                <Text style={{fontSize:13,fontWeight:"bold"}}>Được phát hiện vi phạm lỗi:</Text>
                <RNPickerSelect
                    onValueChange={handleValueChange}
                    style={{marginLeft:40,alignItems:"center"}}
                    value={violator}
                    placeholder={{ label: 'Lỗi vi phạm', value: null }}
                    items={[
                    { label: 'Không đội mũ bảo hiểm', value: 'Không đội mũ bảo hiểm' },
                    { label: 'Đậu xe không đúng nơi quy định', value: 'Đậu xe không đúng nơi quy định' },
                    ]}
                />
            </View>
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:20}}>Vào hồi: {hour} giờ {minute} phút</Text>
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:20}}>Ngày {day} tháng {month} năm {year}, tại đường Lê Văn Hiến</Text>

            <Text style={{fontSize:13,fontWeight:"bold",marginTop:20}}>Đề nghị: ông/bà trong vòng 20 ngày làm việc(kể từ thời điểm nhận được thông báo), đặt lịch làm việc với cơ quan chức năng để giải quyết vụ việc theo quy định của pháp luật</Text>
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:20}}>Nếu ông/bà không chấp hành,cơ quan chức năng sẽ tiến hành các biện pháp khác để xử lý, đồng thời thông báo các đơn vị đăng kiểm xe để phối hợp xử lý theo quy định</Text>
            <Text style={{textAlign:"right",marginTop:60,fontWeight:"bold"}}>NGƯỜI XÁC NHẬN</Text>
            <View style={{alignItems:"flex-end"}}>
            {sign ? (
                    <Image source={{uri: downloadURL}} style={{width:100,height:100}}/>

                    ):(
                        <Text>Sign not Found</Text>
                    )}
            </View>

            <TouchableOpacity onPress={set_appointment} style={{backgroundColor:"#E8ECF4",alignItems:"center",marginHorizontal:40,paddingVertical:20,borderRadius:10,marginTop:100}}>
                <Text>THÔNG BÁO CHO NGƯỜI VI PHẠM</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}