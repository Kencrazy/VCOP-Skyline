import { TextInput,SafeAreaView,View,Text,TouchableOpacity,TouchableWithoutFeedback, Keyboard } from "react-native";
import React,{useState} from "react"

export default function Verify({navigation,route}){
    const {bank} = route.params
    const [code,setCode]=useState("")
    const handleCodeChange = (value)=>{
        if(value.length<=4){
            setCode(value)
        }
    }

    const handleTouch = ()=>{
        Keyboard.dismiss()
    }

    const handleButton = ()=>{
        navigation.navigate("Account",{bank:bank})
    }
    return(
        <TouchableWithoutFeedback onPress={handleTouch}>
        <SafeAreaView style={{flex:1,backgroundColor:"white",paddingLeft:10}}>
            <Text style={{fontSize:25,fontWeight:"bold",color:"#1D3A70",marginLeft:10,marginTop:50}}>Xin chào Le Duy Loc</Text>
            <Text style={{fontSize:17,color:"#6B7280",marginLeft:10}}>Hãy nhập mã bảo mật tài khoản của bạn</Text>

            <TextInput placeholderTextColor="gray" style={{borderWidth: 1,borderColor: 'gray',borderRadius: 5,width: 40,height: 40,fontSize: 16,textAlign: 'center',marginHorizontal: 5,alignItems:"center",width:300,marginTop:50,marginLeft:60}} value={code} onChangeText={handleCodeChange} maxLength={4} keyboardType="numeric" secureTextEntry/>

            <TouchableOpacity style={{backgroundColor:"#E8ECF4",alignItems:"center",marginHorizontal:100,paddingVertical:10,borderRadius:20,marginTop:450}} onPress={handleButton}>
                <Text>Xác nhận</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}