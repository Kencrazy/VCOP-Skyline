import { SafeAreaView,View,Text,TouchableOpacity,TextInput } from "react-native";
import { useState } from "react";
import { styles } from "./styles";
import { value } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";

export default function BankConnect({navigation,route}){
    const {bank} = route.params
    const [name,setName]=useState()
    const [card_id,setID]=useState()
    const [id,setid]=useState()
    const handleButton = ()=>{
        if(name!=null && card_id!=null&& id!=null){
            navigation.navigate("BankPass",{bank:bank})
        }
    }
    return(
        <SafeAreaView style={{backgroundColor:"white",flex:1,alignItems:"center"}}>
            <View style={{alignItems:"center",marginTop:30}}>
                <Text style={{fontSize:22,fontWeight:"bold"}}>LIÊN KẾT TÀI KHOẢN</Text>
                <Text style={{fontSize:22,fontWeight:"bold"}}>NGÂN HÀNG</Text>
            </View>

            <View style={{marginTop:240}}>
            <Text style={styles.card}>{bank.bank_name}</Text>

            <TextInput style={styles.card} placeholderTextColor="gray" placeholder="Họ và tên chủ thẻ/ tài khoản" onChangeText={text=>setName(text)} value={name}/>

            <TextInput style={styles.card} placeholderTextColor="gray" placeholder="Số thẻ/số tài khoản" onChangeText={text=>{setID(text)}} value={card_id}/>

            <TextInput style={styles.card} placeholderTextColor="gray" placeholder="Số CMND" onChangeText={text=> setid(text)} value={id}/>

            </View>

            <TouchableOpacity style={{backgroundColor:"#E8ECF4",alignItems:"center",paddingHorizontal:30,paddingVertical:10,borderRadius:20,marginTop:40,}} onPress={handleButton}>
                <Text style={{fontSize:18,fontWeight:"bold"}}>Xác nhận</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}