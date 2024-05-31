import { SafeAreaView,TouchableOpacity,Text } from "react-native";

export default function Done({navigation}){
    return(
        <SafeAreaView style={{backgroundColor:"white",flex:1,justifyContent:"center",alignItems:"center"}}>
            <TouchableOpacity onPress={()=>navigation.navigate("camera")}>
                <Text style={{fontSize:25,fontWeight:"bold"}}>Hoàn Thành</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}