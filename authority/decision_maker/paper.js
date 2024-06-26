import { ScrollView,View,Text,TouchableOpacity } from "react-native";
import { useState,useEffect } from "react";
import {doc,updateDoc} from "firebase/firestore"
import { db } from "../../API/Firebase/firebaseConfig";
import GetUser from "../../API/Firebase/get";
// import Picker from "@react-native-picker/picker"
import RNPickerSelect from 'react-native-picker-select';

export default function Observe({navigation,route}){
    // const {violator_id} = route.params
    const {item}=route.params
    // console.log(id,violator_id);
    const today = new Date()
    const hour = today.getHours()
    const minute = today.getMinutes()
    const day = today.getDate()
    const month = today.getMonth()+1
    const year = today.getFullYear()
    const place = item.address
    const [police_name,setPName]=useState("")
    const [position,setPos]=useState("")
    const [violator_name,setVName]=useState("")
    const [address,setAddress]=useState("")
    const [job,setJob]=useState("")
    const [birthdate,setBirth]=useState([])
    const [id2,setID]=useState("")
    // const [plateNum,setPlate]=useState("")
    const [phoneNumber,setPhoneNum]=useState("")
    // const author_id = "kQM76I4VHhTr9HicMmni8fMMwH42"
    const [violator,setViolator]=useState()
    // console.log(violator);

    console.log(item);

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const police_info = await GetUser(item.police_id)
                // console.log(user_info);
               
                setPName(police_info.name)
                setPos(police_info.job)
                // setID(user_info.id)
                // setViolate(user_info.violate.length)

                
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[item.police_id])

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const user_info = await GetUser(item.id)
                // console.log(user_info);
               
                setVName(user_info.name)
                setAddress(user_info.address)
                setJob(user_info.job)
                const birth = user_info.birthdate.split("/")
                setBirth(birth[2])
                setID(user_info.id)
                // setViolate(user_info.violate.length)
                // setPlate(user_info.plateNum)
                setPhoneNum(user_info.phoneNumber)

                
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[item.id])
    const handle_decision = ()=>{
        navigation.navigate("report3",{item:item})
          
    }





    return(
        <ScrollView style={{backgroundColor:"white",flex:1,paddingTop:10,paddingHorizontal:10}}>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <Text style={{fontSize:11}}>Số:....BB-VPHC</Text>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:12,fontWeight:"bold"}}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
                    <Text style={{fontSize:12,fontWeight:"bold"}}>Độc lập - Tự do - Hạnh phúc</Text>
                    <View style={{borderWidth:1,width:150,marginTop:3}}></View>
                </View>
            </View>

            <Text style={{color:"red",fontSize:20,fontWeight:"bold",textAlign:"center",marginTop:30}}>BIÊN BẢN VI PHẠM HÀNH CHÍNH</Text>
            <Text style={{fontSize:11,fontWeight:"bold",textAlign:"center"}}>Trong lĩnh vực giao thông đường bộ, đường sắt</Text>

            <Text style={{fontSize:13,fontWeight:"bold",marginTop:20}} >Hôm nay, hồi {hour} giờ {minute} phút, ngày {day} tháng {month} năm {year}, tại {place}</Text>

            <View style={{flexDirection:"row",justifyContent:"space-between",marginVertical:10}}>
                <Text style={{fontSize:13,fontWeight:"bold"}}>Tôi: {police_name}</Text>
                <Text style={{fontSize:13,fontWeight:"bold"}}>Chức vụ: {position}</Text>
            </View>

            <Text style={{fontSize:13,fontWeight:"bold"}}>Tiến hành lập biên bản VPHC trong lĩnh vực giao thông đường bộ đối với</Text>

            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Ông (bà) tổ chức : {violator_name}</Text>
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Địa chỉ: {address}</Text>
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Nghề nghiệp(lĩnh vực hoạt động): {job} Năm sinh: {birthdate}</Text>
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Số CMND hoặc hộ chiếu quyết định thành lập ĐKKD: {id2}</Text>
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Ngày cấp: XX/XX/XXXX Nơi cấp: XXXXXXXXX</Text>
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Phương tiện sử dụng khi vi phạm: {item.plateNum}</Text>
            <Text style={{fontSize:13,fontWeight:"bold",marginTop:10}}>Số điện thoại liên lạc: {phoneNumber}</Text>

            <View style={{flexDirection:"row",marginTop:20}}>
                <Text style={{fontSize:13,fontWeight:"bold"}}>Đã có vi phạm hành chính:</Text>
                {/* Droplist */}
                <Text>{item.violator}</Text>
            </View>

            <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:10,fontWeight:"bold"}}>CÁ NHÂN VI PHẠM HOẶC ĐẠI DIỆN TỔ CHỨC VI PHẠM</Text>
                    <Text style={{fontSize:10,fontWeight:"bold"}}>(Ký tên, ghi rõ, chức vụ, họ và tên)</Text>
                    {/* Police Sign */}
                </View>

                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:10,fontWeight:"bold"}}>NGƯỜI LẬP BIÊN BẢN</Text>
                    <Text style={{fontSize:10,fontWeight:"bold"}}>(Ký, ghi rõ họ tên)</Text>
                    {/* Violator Sign */}
                </View>
            </View>

            <TouchableOpacity onPress={handle_decision}  style={{backgroundColor:"#E8ECF4",alignItems:"center",marginHorizontal:40,paddingVertical:20,borderRadius:10,marginTop:100}}>
                <Text>Ra Quyết Định Xử Phạt</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}