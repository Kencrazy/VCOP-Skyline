import {View,StyleSheet, TouchableOpacity, Image, Text} from 'react-native'

export default function FunctionButton({width,height,title1,title2,source,onPress,distance}){
    return(
        <View style={{width:"100%"}}>
            <TouchableOpacity style={[styles.btn,{width:width,height:height,marginTop:distance}]} onPress={onPress}>
                <Image style={styles.img} source={source}/>
                <View style={styles.text}>
                    <Text style={styles.title1}>{title1}</Text>
                    <Text style={styles.title2}>{title2}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor:"#F0F8FF",
        borderRadius:8,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        textAlign:"center",
        // marginTop:"7%"
        paddingLeft:"7%"
    },
    img:{
        width: 80,
        height:80,
        position:"absolute",
        left:30
    },
    text:{
        alignItems:"center",
        position:"relative",
        left:40
    },
    title1:{
        fontSize:18,
        fontWeight:"normal",
        color:"black"
    },
    title2:{
        fontSize:18,
        fontWeight:"normal",
        color:"black"
    }
    
})