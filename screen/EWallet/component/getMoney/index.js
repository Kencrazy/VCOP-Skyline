import { Image,SafeAreaView,View,Text,TextInput,TouchableOpacity,TouchableWithoutFeedback,Keyboard } from "react-native"
import CheckBox from "react-native-check-box"
import { useState } from "react"
import GetUser from "../../../../API/Firebase/get"
import {doc,updateDoc} from "firebase/firestore"
import { db } from "../../../../API/Firebase/firebaseConfig"
export default function ExportMoney({navigation,route}){
    const {bank}=route.params
    const {id}=route.params
    const [money,setMoney]=useState()
    const handle_keyboard = ()=>{
        Keyboard.dismiss()
    }
    const handle_get =async ()=>{
        const money2 = await GetUser(id).money
        const docRef = doc(db, "vcop", id);
        await updateDoc(docRef, {
          money: Number(money)+money2,
        });
    }
    return(
        <TouchableWithoutFeedback onPress={handle_keyboard}>
        <SafeAreaView style={{flex:1,backgroundColor:"white",alignItems:"center"}}>
            <View style={{width:350,height:100,borderWidth:2,borderColor:"#E5E7EB", borderRadius:10, marginTop:20,flexDirection:"row"}}>
                <Image style={{top:20,left:20}} source={bank.src}/>
                <Text style={{top:20,left:30,fontSize:15,fontWeight:"bold",color:"#1D3A70"}}>{bank.bank_name}</Text>

                <CheckBox
                    isChecked={true}
                    checkedCheckBoxColor="green"
                    onClick={()=>{console.log("pressed");}}
                    style={{top:35,left:300,position:"absolute"}}
                    />
            </View>

            <Text style={{fontSize:19,fontWeight:"bold",color:"#1D3A70"}}>CHỌN SỐ TIỀN</Text>

            <TextInput onChangeText={text=>setMoney(text)} keyboardType="numeric" style={{borderWidth: 1,borderColor: 'gray',borderRadius: 5,width: 40,height: 40,fontSize: 16,textAlign: 'center',marginHorizontal: 5,alignItems:"center",width:320,marginTop:10}}/>

            <TouchableOpacity onPress={handle_get} style={{backgroundColor:"#E8ECF4",alignItems:"center",marginHorizontal:40,paddingVertical:10,borderRadius:20,marginTop:450,paddingHorizontal:50}}>
                <Text>Xác nhận</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}