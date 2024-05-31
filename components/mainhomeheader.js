import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity} from "react-native"

export default function Header({name, id,onPress}){
    return(
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.id}>{id}</Text>
            </View>

            <TouchableOpacity style={styles.info} onPress={onPress}>
                <Image source={require("../assets/bell.png")}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#1D3A70",
        width: Dimensions.get('screen'),
        height: Dimensions.get('screen').height * 0.15
    },
    userInfo:{
        textAlign:"left",
        position:"absolute",
        top:60,
        left:20
    },
    name:{
        color:"white",
        fontWeight:"bold",
        // fontFamily: "Open-Sans",
        fontSize:20
    },
    id:{
        color:"white",
        fontWeight:"bold",
        // fontFamily: "Open-Sans",
        fontSize:10
    },
    info:{
        position:"absolute",
        top:60,
        left:350
    }
})