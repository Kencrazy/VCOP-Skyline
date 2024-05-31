import {View,SafeAreaView,Text,FlatList, TouchableOpacity} from "react-native"
import Header from "../../components/mainhomeheader"
import HomeInfo from "../../components/homeinfo"
import FunctionButton from "../../components/functionButton"
import { Dimensions } from "react-native"
import { styles } from "./styles"
import React,{useState,useEffect} from "react"

// Testing
import GetUser from "../../API/Firebase/get"


export default function PoliceHome({navigation,route}){
    // const id = "2G842DINTNlF8pk7fz1X"
    const {id}=route.params
    const [data,setData] = useState([])
    const [name,setName] = useState("")
    const [id2,setID]=useState()
    const [violate,setViolate]=useState()
    
    
    const today = new Date()
    const month = today.getMonth()
    const year = today.getFullYear()

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const user_info = await GetUser(id)
                // console.log(user_info);
               
                setName(user_info.name)
                setData(user_info.violate)
                setID(user_info.id)
                setViolate(user_info.violate.length)

                
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[id])

    // getInfo()
    const handle_button = ()=>{
        // console.log("pressed");
        navigation.navigate("Working",{id:id})
    }



    return(
        <View style={{backgroundColor:"white",flex:1}}>
            <Header name={name} id={id2}/>

            <View style={{borderRadius: 22,backgroundColor:"white",top:"-2.4%",paddingLeft:"10%"}}>
                <Text style={styles.introduce}>Tính năng người dùng</Text>
                
                <FunctionButton onPress={handle_button} width={Dimensions.get('screen').width * 0.81} height={Dimensions.get('screen').height * 0.2} source={require("../../assets/info.png")} title1={"Làm việc"}  distance={"10%"}/>

                <View style={styles.date_appoint}>
                    <Text style={{position:"relative",right:"250%",fontSize:16,fontWeight:"bold"}}>Tháng {month}/{year}</Text>
                    <TouchableOpacity>
                        <Text style={{fontSize:16,fontWeight:"bold"}}>{violate} lịch hẹn ➜</Text>
                    </TouchableOpacity>
                </View>


            </View>

            <FlatList
                style={{marginHorizontal:"10%",marginTop:"-5%"}}
                data={data}
                renderItem={({item})=>{
                    if(item.type==3){
                        return(<HomeInfo item={item}/>)
                    }
                }}/>
        </View>
    )
}