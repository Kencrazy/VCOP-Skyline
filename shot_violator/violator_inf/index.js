import { useState,useEffect } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import {styles} from './styles'
import GetUser from "../../API/Firebase/get";

export default function ViolatorInf({navigation,route}){
    const {id,plateNum}=route.params
    // console.log(id);
    const [violator_name,setName]=useState("")
    const [violator_phone,setPhone]=useState("")
    const [violator_address,setAddress]=useState("")
    const [count,setCount]=useState(0)

    
    useEffect(()=>{
        const getData = async ()=>{
            try{
                const user_info = await GetUser(id)
                // console.log(user_info);
                // console.log(user_info);
               
                setName(user_info.name)
                setPhone(user_info.phoneNumber)
                setAddress(user_info.address)
                setCount(user_info.history.length)
                // setViolate(user_info.violate.length)
                
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[id])
    return(
        <ScrollView style={{backgroundColor:"white"}}>
            <View>
                <View style={{flexDirection:"row",marginTop:"10%",justifyContent:"center"}}>
                    <TouchableOpacity style={{flexDirection:"row",right:"15%",top:"40%"}} onPress={()=>navigation.navigate("ViolatorContact")}>
                        <Image source={require("../../assets/arrow.png")}/>
                    </TouchableOpacity>
                    <Text style={styles.header}>THÔNG TIN CHỦ XE</Text>
                </View>
                
                <Text style={styles.black}>Tên chủ phương tiện</Text>
                <Text style={styles.textBox}>{violator_name}</Text>

                <Text style={styles.black}>Số điện thoại</Text>
                <Text style={styles.textBox}>{violator_phone}</Text>

                <Text style={styles.black}>Địa chỉ thường trú</Text>
                <Text style={styles.textBox}>{violator_address}</Text>
                

                <Text style={styles.header}>HỒ SƠ ĐĂNG KIỂM</Text>
                <Image source={require('../../assets/registration.jpg')} style={styles.image} />

                <Text style={styles.header}>BẰNG LÁI XE</Text>
                <Image source={require('../../assets/license.jpg')} style={styles.image} />


                <View>
                    <Text style={styles.header}>LỊCH SỬ VI PHẠM</Text>
                    <Text style={{left:"7%"}}>Có {count} kết quả</Text>
                </View>

                <Text style={styles.header}>GIẤY ĐĂNG KÝ XE</Text>
                <Image  style={styles.image} source={require('../../assets/regis.jpg')}/>

                <View style={{flexDirection:"row",marginTop:"20%",marginLeft:"7%"}}>
                    <TouchableOpacity style={[styles.btn1,{alignItems:"center",justifyContent:"center"}]} onPress={()=>navigation.navigate("Des1",{violator_id:id,plateNum:plateNum})} >
                        <Text style={{fontWeight:"bold"}}>TẠO BIÊN BẢN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn1,{alignItems:"center"}]} onPress={()=>navigation.navigate("Des2",{violator_id:id,plateNum: plateNum})}>
                        <Text style={{fontWeight:"bold"}}>TẠO ĐƠN</Text>
                        <Text style={{fontWeight:"bold"}}>THÔNG BÁO</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.btn1,{alignItems:"center",justifyContent:"center",marginTop:"10%",marginBottom:"40%",marginHorizontal:60}]} onPress={()=>navigation.navigate("Report2",{violator_id:id,plateNum:plateNum})}>
                        <Text style={{fontWeight:"bold"}}>TẠO QUYẾT ĐỊNH XỬ</Text>
                        <Text style={{fontWeight:"bold"}}>PHẠT (KHÔNG BIÊN BẢN)</Text>
                    </TouchableOpacity>
            </View>
        </ScrollView>
    )
}