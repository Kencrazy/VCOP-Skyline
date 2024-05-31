// import { DiceOutline } from "react-ionicons"
import {View,Image,Text,FlatList,Dimensions,SafeAreaView} from "react-native"
import SettingButton from "../../components/settingButton"
import React,{useState,useEffect} from "react";
import GetUser from "../../API/Firebase/get";

export default function Setting({navigation,route}){
    const {id}=route.params
    // const [data,setData] = useState([])
    const [name,setName] = useState("")
    const [phoneNum,setPhone]=useState()
    // const [violate,setViolate]=useState()
    
    // const today = new Date()
    // const month = today.getMonth()+1
    // const year = today.getFullYear()


    

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const user_info = await GetUser(id.id)
                // console.log(user_info);
                // console.log(user_info);
               
                setName(user_info.name)
                // setData(user_info.violate)
                setPhone(user_info.phoneNum)
                // setViolate(user_info.violate.filter(x=>x.type==5).length)
                
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[id])

    const data = [
        {
          onPress: () => navigation.navigate("CallInfo"),
          source: require("../../assets/setting/info.png"),
          text: "Khai báo thông tin phương tiện",
          width: Dimensions.get("screen").width * 0.8,
          height: Dimensions.get("screen").height * 0.1,
        },
        {
          onPress: () => navigation.navigate("History"),
          source: require("../../assets/setting/history.png"),
          text: "Lịch sử liên lạc",
          width: Dimensions.get("screen").width * 0.8,
          height: Dimensions.get("screen").height * 0.1,
        },
        {
          onPress: () => console.warn("Đang trong quá trình hoàn thiện"),
          source: require("../../assets/setting/setting.png"),
          text: "Cài đặt chung",
          width: Dimensions.get("screen").width * 0.8,
          height: Dimensions.get("screen").height * 0.1,
        },
        {
          onPress: () => navigation.navigate("epass"),
          source: require("../../assets/setting/password.png"),
          text: "Thay đổi mật khẩu ví điện tử",
          width: Dimensions.get("screen").width * 0.8,
          height: Dimensions.get("screen").height * 0.1,
        },
        {
          onPress: () => navigation.navigate("Signing"),
          source: require("../../assets/setting/sign.png"),
          text: "Cài đặt chữ ký",
          width: Dimensions.get("screen").width * 0.8,
          height: Dimensions.get("screen").height * 0.1,
        },
        {
          onPress: () => console.warn("Đang trong quá trình hoàn thiện"),
          source: require("../../assets/setting/signout.png"),
          text: "Đăng xuất",
          width: Dimensions.get("screen").width * 0.8,
          height: Dimensions.get("screen").height * 0.1,
        },
      ];
    return(
        <SafeAreaView style={{flex:1,backgroundColor:"white",alignItems:"center"}}>
            <Image style={{width:90,height:90,borderRadius:40}} source={require("../../assets/setting/avatar.png")}/>
            <Text style={{fontSize:20,fontWeight:"bold",marginTop:5,color:"#1D3A70"}}>{name}</Text>
            <Text>{phoneNum}</Text>

            <FlatList
            data={data}
            renderItem={({item})=><SettingButton width={item.width} height={item.height} source={item.source} title={item.text} onPress={item.onPress} />
            }/>
        </SafeAreaView>
    )
}