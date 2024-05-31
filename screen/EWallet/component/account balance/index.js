import {View,Image,Text,SafeAreaView,TouchableOpacity} from "react-native"
import React,{useState,useEffect} from "react"
import GetUser from "../../../../API/Firebase/get"
import {doc,updateDoc} from "firebase/firestore"
import { db } from "../../../../API/Firebase/firebaseConfig"

export default function AccountBalance({navigation,route}){
    const {bank} = route.params
    const {id,fine} =route.params
    console.log(id);
    console.log(fine);
    const [money2,setMoney]=useState()

    const handle_send =async ()=>{
        // const money = await GetUser(id).money
        // console.log(money);
        if(Number(money2)-Number(fine)>=0){
        const docRef = doc(db, "vcop", id);
        await updateDoc(docRef, {
          money: Number(money2)-Number(fine),
        });
        navigation.navigate("Notification")
    }else{
        console.warn("Không đủ số dư trong tài khoản hãy nạp thêm");
    }
    }
    const handle_get = ()=>{
        navigation.navigate("Money",{bank:bank})
    }

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const user_info = await GetUser(id)
                // console.log(user_info);
                // console.log(user_info);
               
                setMoney(user_info.money)
                
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[id])
    return(
        <SafeAreaView style={{alignItems:"center",backgroundColor:"white",flex:1}}>
            <View style={{borderWidth:1,borderRadius:10,borderColor:"#4D5DFA4D",width:320,marginTop:50,alignItems:"center",paddingVertical:15}}>
                <View style={{flexDirection:"row"}}>
                    <Text style={{fontSize:18,fontWeight:"bold"}}>SỐ DƯ TÀI KHOẢN</Text>
                    <Image style={{left:30}} source={require("../../../../assets/frame.png")}/>
                </View>

                <Text style={{fontSize:17,fontWeight:"bold",color:"#616161",marginTop:4}}>{money2} vnđ</Text>
                <Image style={{marginTop:7,right:100}} source={require("../../../../assets/setting-4.png")}/>
            </View>

            <View style={{flexDirection:"row",marginTop:150}}>
                <TouchableOpacity style={{backgroundColor:"#F0F8FF",paddingHorizontal:30,paddingVertical:30,borderRadius:15,right:15}} onPress={handle_get}>
                    <Text style={{fontSize:17,fontWeight:"bold"}}>Chuyển tiền</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handle_send} style={{backgroundColor:"#556A92",paddingHorizontal:30,paddingVertical:30,borderRadius:15,left:15}}>
                    <Text style={{fontSize:17,fontWeight:"bold",color:"white"}}>Nộp tiền</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}