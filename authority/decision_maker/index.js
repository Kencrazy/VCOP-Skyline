import React, { useState, useEffect } from "react";
import { View, FlatList, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import { styles } from "./styles";


// Component
import Infotab from "../../components/infoTab";

// Get Violate
import GetUser from "../../API/Firebase/get";

export default function DecisionMaker ({ navigation, route }) {
  const {id} = route.params
  const [data, setData] = useState([]);

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

//   const violator = {violator:item.violator}

  return (
    <View style={styles.background}>
      <View style={styles.quantity}>
        <Text style={styles.count}>{data.filter(x=>x.type==4).length} lịch hẹn ➜</Text>
        <Image style={styles.filter} source={require("../../assets/Filter.png")} />
      </View>

      <FlatList
        data={data}
        
        renderItem={({ item }) => {
          if (item.type === 4) {
            return (
              <Infotab
                onPress={()=>navigation.navigate("Observe",{item:item})}
                width={Dimensions.get("screen").width * 0.8}
                height={Dimensions.get("screen").height * 0.13}
                item={item}
              />
            );
          } 
        }}
      />
    </View>
  );
}