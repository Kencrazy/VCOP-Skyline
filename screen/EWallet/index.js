import { useState } from "react"
import { View, SafeAreaView, Text, Image, TouchableOpacity, FlatList } from "react-native"
import CheckBox from "react-native-check-box"
import {styles} from "./styles"

export default function Ewallet({ navigation,route }) {
  const {id}=route.params
  const [bank, setBank] = useState([
    { src: require("../../assets/credit-card.png"), bank_name: "Vietcom Bank", pressed: false },
    { src: require("../../assets/credit-card.png"), bank_name: "BIDV", pressed: false },
    { src: require("../../assets/credit-card.png"), bank_name: "Vietin Bank", pressed: false },
    { src: require("../../assets/credit-card.png"), bank_name: "VIB", pressed: false },
    { src: require("../../assets/credit-card.png"), bank_name: "Techcom Bank", pressed: false },
  ]);

  const handleButton = () => {
    const selectedBanks = bank.filter(item => item.pressed);
    if (selectedBanks.length === 1) {
    //   console.log("Clicked:", selectedBanks[0].bank_name);
        const selectedBank = {
          bank_name: selectedBanks[0].bank_name,
          src:selectedBanks[0].src
        }
        if(id==null){
          // navigation.navigate("info")
          console.warn("Chọn 1 đơn ở thông tin để nộp phạt!");
        }
        else{
          navigation.navigate("BankConnect",{bank:selectedBank})
        }
    }
  }

  const handleCheckBoxClick = (item) => {
    const updatedBank = bank.map(bankItem => {
      if (bankItem === item) {
        bankItem.pressed = !bankItem.pressed;
      }
      return bankItem;
    });
    setBank(updatedBank);
  }

  return (
    <SafeAreaView style={styles.card}>
      <Text style={{color:"#1D3A70",fontSize:25,fontWeight:"bold",marginLeft:10}}>Ngân hàng</Text>

      <FlatList
        data={bank}
        renderItem={({ item }) => (
          <View style={{width:350,height:100,borderWidth:2,borderColor:"#E5E7EB", borderRadius:10, marginTop:20,marginLeft:30,flexDirection:"row"}}>
            <Image source={item.src} style={{top:20,left:20}} />
            <Text style={{top:20,left:30,fontSize:15,fontWeight:"bold",color:"#1D3A70"}}>{item.bank_name}</Text>

            <CheckBox
              isChecked={item.pressed}
              onClick={() => handleCheckBoxClick(item)}
              checkBoxColor="green"
              uncheckedCheckBoxColor="black"
              style={{top:35,left:300,position:"absolute"}}
              checkBoxStyle={{borderRadius:10}}
            />
          </View>
        )}
      />

      <TouchableOpacity style={{backgroundColor:"#E8ECF4",top:-70,alignItems:"center",marginHorizontal:100,paddingVertical:10,borderRadius:20}} onPress={handleButton}>
        <Text style={{fontSize:16,fontWeight:"bold"}}>Xác nhận</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}