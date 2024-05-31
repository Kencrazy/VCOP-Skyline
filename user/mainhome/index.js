import {View,SafeAreaView,Text,FlatList, TouchableOpacity} from "react-native"
import Header from "../../components/mainhomeheader"
import HomeInfo from "../../components/homeinfo"
import FunctionButton from "../../components/functionButton"
import { Dimensions } from "react-native"
import { styles } from "./styles"
import React,{useState,useEffect} from "react"

// Testing
import GetUser from "../../API/Firebase/get"


export default function UserHome({navigation,route}){
    
    const {id} = route.params
    const [data,setData] = useState([])
    const [name,setName] = useState("")
    const [id2,setID]=useState()
    const [violate,setViolate]=useState()
    
    const today = new Date()
    const month = today.getMonth()+1
    const year = today.getFullYear()


    

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const user_info = await GetUser(id)
                // console.log(user_info);
                // console.log(user_info);
               
                setName(user_info.name)
                setData(user_info.violate)
                setID(user_info.id)
                setViolate(user_info.violate.filter(x=>x.type==5).length)
                
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[id])

    // getInfo()
    const handle_button = ()=>{
        // console.log("pressed");
        navigation.navigate("Notification")
    }



    return(
        <View style={{backgroundColor:"white",flex:1}}>
            <Header name={name} id={id2}/>

            <View style={{borderRadius: 22,backgroundColor:"white",top:"-2.4%",paddingLeft:"10%"}}>
                <Text style={styles.introduce}>Tính năng người dùng</Text>
                
                <FunctionButton onPress={handle_button} width={Dimensions.get('screen').width * 0.81} 
                height={Dimensions.get('screen').height * 0.2} source={require("../../assets/info.png")} 
                title1={"Thông báo"} title2={"vi phạm"} distance={"10%"}/>

                <View style={styles.date_appoint}>
                    <Text style={{position:"relative",right:"250%",fontSize:16,fontWeight:"bold"}}>Tháng {month}/{year}</Text>
                    <TouchableOpacity>
                        <Text style={{fontSize:16,fontWeight:"bold"}}>{violate} lịch hẹn ➜</Text>
                    </TouchableOpacity>
                </View>


            </View>

            <FlatList
  style={{ marginHorizontal: "10%", marginTop: "-5%" }}
  data={data}
//   keyExtractor={(item) => item.id} // Assuming item.id is a unique identifier
  renderItem={({ item }) => {
    if (item.type === 5) {
      return (<HomeInfo item={item} />)
    } else {
      return null;
    }
  }}
/>
        </View>
    )
}