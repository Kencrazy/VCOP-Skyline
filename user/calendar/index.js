import { SafeAreaView,View,Text,TouchableOpacity, ScrollView } from "react-native";
import  DatePicker,{getToday,getFormatedDate}  from "react-native-modern-datepicker"
import React,{useState,useEffect} from "react"
import GetUser from "../../API/Firebase/get";
import { db } from "../../API/Firebase/firebaseConfig";
import {doc,setDoc, updateDoc,arrayUnion} from "firebase/firestore"
import {styles} from "./styles"
// import { useSafeAreaFrame } from "react-native-safe-area-context";

export default function SetAppointment({route,navigation}){
    // Testing
    // const police_id = "2G842DINTNlF8pk7fz1X"
    // const id = "aVIsdGzacM7PekQgcK7P" 
    const {item} = route.params
    console.log(item);

    // console.log(id,police_id,violator);

    const today = new Date()
    const startDate = getFormatedDate(today.setDate(today.getDate()+1),'YYYY/MM/DD')
    const maxDate = getFormatedDate(today.setDate(today.getDate()+20), "YYYY/MM/DD")
    const [date,setDate] = useState()
    const [selectedDate,setSetlectedDate] = useState("")
    const [time,setTime] = useState("")

    // const [mydata,setData] = useState("")

    // const [violate,setViolate]=useState()
    
    



    const set_appointment = async()=>{
        if (selectedDate != null && time != null) {
            const police = await GetUser(item.item.id);
            const police_violate = police.violate // Make sure police_violate is an array
            console.log(police_violate);
            const newViolate = {
                id: item.id,
                violator: item.item.violator,
                date: selectedDate,
                time:time,
                type:3,
                district:"Hai Chau",
                city: "Da Nang",
                plateNum: item.item.plateNum
            };
        
            // Update the police_violate array
            police_violate.unshift(newViolate);
            console.log(police_violate);
        
            // Update the Firestore document
            const docRef = doc(db, "vcop", item.item.id);
            await updateDoc(docRef, {
              violate: police_violate,
            });

            const user = await GetUser(item.id)
            const user_violate = user.violate // Make sure police_violate is an array
            // console.log(police_violate);
            const nwViolate = {
                // violator_id: item.id,
                violator: item.item.violator,
                date: selectedDate,
                time:time,
                type:5,
                district:"Hai Chau",
                city: "Da Nang",
                police_id: item.item.id
            };
        
            // Update the police_violate array
            user_violate.unshift(nwViolate);
            // console.log(police_violate);
        
            // Update the Firestore document
            const docref = doc(db, "vcop", item.id);
            await updateDoc(docref, {
              violate: user_violate,
            });
        
            // setViolate(police_violate); 
            navigation.navigate("UserHome");
          }
    }
    

    return(
        <ScrollView style={styles.card}>
            <Text style={{fontSize:30,textAlign:"center",marginTop:20}}>ĐẶT LỊCH</Text>
            <Text style={{fontSize:20,fontWeight:"bold",textAlign:"left",marginLeft:10}}>Chọn ngày</Text>
            <Text style={{marginLeft:10,marginBottom:10}}>(20 ngày kể từ ngày nhận thông báo)</Text>
            <ScrollView style={{height:600}}>
            <DatePicker
            mode="calendar"
            // format="YYYY/MM/DD"
            // style={{height:400}}
            // onDateChange={handleChange}
            minimumDate={startDate}
            maximumDate={maxDate}
            onSelectedChange={date => setSetlectedDate(date)}
            primaryColor = "#FF0000"
            />

            {/* <Text style={{textAlign:"center",fontSize:25}}>CHỌN GIỜ</Text> */}
            <DatePicker
            mode="time"
            style={{top:-5}}
            minuteInterval={3}
            onTimeChange={selectedTime => setTime(selectedTime)}/>
            </ScrollView>
            <TouchableOpacity onPress={set_appointment} style={{alignItems:"center",backgroundColor:"#F7F8F9",marginHorizontal:100,paddingVertical:10,borderColor:"#E8ECF4",borderRadius:8,marginBottom:30}}>
                <Text>ĐẶT LỊCH</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}