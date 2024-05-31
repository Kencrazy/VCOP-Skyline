import { TouchableOpacity,View,Text,Image,StyleSheet } from "react-native";

export default function SettingButton({width,height,onPress,source,title,navigation}){

    return(
        <TouchableOpacity style={[{width:width,height:height,flexDirection:"row",marginVertical:8}]} onPress={onPress}>
            <Image source={source}/>
            <Text style={{position:"absolute",top:10,left:50}}>{title}</Text>
            <Image style={{position:"absolute",top:12,left:300}} source={require("../assets/setting/chevron-right.png")}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
})