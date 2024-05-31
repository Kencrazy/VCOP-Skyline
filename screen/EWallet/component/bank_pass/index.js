import {View,SafeAreaView,Text,TextInput,TouchableOpacity} from "react-native"
import { useState,useEffect } from "react"
import { styles } from "./styles"
import GetUser from "../../../../API/Firebase/get"

export default function BankPass({navigation,route}){
    const {id}=route.params
    const {bank}= route.params
    const [data,setData] = useState()
    const [pass,setPass]=useState()
    const [checkPass,setCheck]=useState()
    const handleButton = ()=>{
        if(data==pass && data==checkPass){
            navigation.navigate("Verify",{bank:bank})
        }
    }
    

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const user_info = await GetUser(id)
                // console.log(user_info);
               
                // setName(user_info.username)
                setData(user_info.epass)
                
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[id])
    return(
        <SafeAreaView style={{backgroundColor:"white",alignItems:"center",flex:1}}>
            <Text style={{fontSize:22,fontWeight:"bold",marginVertical:20}}>LIÊN KẾT THÀNH CÔNG</Text>

            
            <Text style={{fontSize:19,fontWeight:"bold"}}>Hãy thiết lập/ nhập mật khẩu để</Text>
            <Text style={{fontSize:19,fontWeight:"bold"}}>bảo vệ ví của bạn</Text>
           

            <View style={{marginHorizontal:30,marginTop:300}}>
                <TextInput style={styles.card} placeholderTextColor="gray" placeholder="Nhập mật khẩu" onChangeText={text=>setPass(text)} value={pass}/>
                <TextInput style={styles.card} placeholderTextColor="gray" placeholder="Xác minh mật khẩu" onChangeText={text=>setCheck(text)} value={checkPass}/>
            </View>

            <TouchableOpacity style={{backgroundColor:"#E8ECF4",alignItems:"center",marginHorizontal:100,paddingVertical:10,borderRadius:20,marginTop:40,paddingHorizontal:20}} onPress={handleButton}>
                <Text>Xác nhận</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}