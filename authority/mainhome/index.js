import {View,SafeAreaView,Text,FlatList, TouchableOpacity} from "react-native"
import Header from "../../components/mainhomeheader"
import HomeInfo from "../../components/homeinfo"
import FunctionButton from "../../components/functionButton"
import { Dimensions } from "react-native"
import { styles } from "./styles"
import React,{useState,useEffect} from "react"

// Testing
import GetUser from "../../API/Firebase/get"


export default function AuthorityHome({navigation,route}){
    const {id}=route.params
    // console.log(id);
    const [data,setData] = useState([])
    const [name,setName] = useState("")
    const today = new Date()
    const month = today.getMonth()+1
    const year = today.getFullYear()
    const [author_id,setID]=useState()
    
    

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const user_info = await GetUser(id)
                // console.log(user_info);
               
                setName(user_info.name)
                setData(user_info.violate)
                setID(user_info.id)
                
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[id])

    // getInfo()
    const handle_button = ()=>{
        // console.log("pressed");
        navigation.navigate("Working")
    }



    return(
        <View style={{backgroundColor:"white",flex:1}}>
            <Header name={name} id={author_id}/>

            <View style={{borderRadius: 22,backgroundColor:"white",top:"-2.4%",paddingLeft:"10%"}}>
                <Text style={styles.introduce}>Tính năng người dùng</Text>
                
                <FunctionButton onPress={()=>navigation.navigate("Decision Maker")} width={Dimensions.get('screen').width * 0.81} height={Dimensions.get('screen').height * 0.18} source={require("../../assets/users.png")} title1={"Ra quyết định"} title2={"xử phạt"}  distance={"10%"}/>
                <FunctionButton onPress={handle_button} width={Dimensions.get('screen').width * 0.81} height={Dimensions.get('screen').height * 0.18} source={require("../../assets/info.png")} title1={"Làm việc"}  distance={"5%"}/>


                <View style={styles.date_appoint}>
                    <Text style={{position:"relative",right:"250%",fontSize:16,fontWeight:"bold"}}>Tháng {month}/{year}</Text>
                    <TouchableOpacity>
                        <Text style={{fontSize:16,fontWeight:"bold"}}>{data.filter(x=>x.type==3).length} lịch hẹn ➜</Text>
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