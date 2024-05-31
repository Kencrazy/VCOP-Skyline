import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { styles } from "./styles";


// Component
import Infotab from "../../components/infoTab";

// Get Violate
import GetUser from "../../API/Firebase/get";

export default function Userinfo({ navigation, route }) {
  // const id = "aVIsdGzacM7PekQgcK7P";
  const {id}= route.params
  const [data, setData] = useState([]);
  // const { id }= route.params
  const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let hour = date.getHours()
let minute = date.getMinutes()

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}/${month}/${year}`;
let currentTime = `${hour}:${minute}`

  useEffect(() => {
    const handleViolator = async () => {
      try {
        const user_info = await GetUser(id);
        setData(user_info.violate);
      } catch (err) {
        console.error(err);
      }
    };
    handleViolator();
  }, [id]);

  const handleItemPress = (screenName,item) => {
    navigation.navigate(screenName,{item:item});
    
  };
  const handleMeeting = (item)=>{
    navigation.navigate("Chat",{id2: item.police_id})
  }

//   const violator = {violator:item.violator}

  return (
    <View style={styles.background}>
      <View style={styles.quantity}>
        <Text style={styles.count}>{data.filter(x=>x.type==1 || x.type ==2 ||x.type==5).length} lịch hẹn ➜</Text>
        <Image style={styles.filter} source={require("../../assets/Filter.png")} />
      </View>

      <FlatList
        data={data}
        
        renderItem={({ item }) => {
          if (item.type === 1) {
            return (
              <Infotab
                onPress={() => handleItemPress("Calendar",{item:item,id:id})}
                width={Dimensions.get("screen").width * 0.8}
                height={Dimensions.get("screen").height * 0.13}
                item={item}
              />
            );
          } else if (item.type === 2) {
            return (
              <Infotab
                onPress={() => handleItemPress("Report",{item:item,id:id})}
                width={Dimensions.get("screen").width * 0.8}
                height={Dimensions.get("screen").height * 0.13}
                item={item}
              />
            );
          }
          else if (item.type==5){
            return(
              <Infotab 
              onPress={()=>handleMeeting(item)}
              width={Dimensions.get("screen").width * 0.8}
              height={Dimensions.get("screen").height * 0.13}
              item={item}/>
            )
          }
        }}
      />
    </View>
  );
}