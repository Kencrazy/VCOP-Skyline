import {View,StyleSheet,Text,Dimensions} from "react-native"
import React from "react"

export default function HomeInfo({item,key}){
    const title = item.violator
    // console.log(item);
    const key2 = key
    return(
        <View style={styles.container}>
            <View style={styles.box1}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.city}>{item.city}</Text>
                <Text style={styles.district}>{item.district}</Text>
            </View>

            <View style={styles.box2}>
                <Text style={styles.appointment}>Ngày giờ đặt lịch</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
        </View>
    )
}

const styles  = StyleSheet.create({
    container:{
        backgroundColor:"#F7F8F9",
        borderRadius:8,
        // justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        width: Dimensions.get('screen').width*0.8,
        height: Dimensions.get('screen').height * 0.13,
        borderWidth:0,
        paddingHorizontal:"4%",
        marginTop:"5%",
        // borderWidth:1
    },
    box1:{
        textAlign:"left"
    },
    title:{
        color:"#143072",
        fontSize:15,
        fontWeight:"bold",
        textAlign:"left",
        width:180
    },
    city:{
        color:"#8391A1",
        fontSize:14,
        textAlign:"left"
    },
    district:{
        color:"#8391A1",
        fontSize:14,
        textAlign:"left"
    },
    box2:{
        textAlign:"left",
        position:"relative",
        left:"20%"
    },
    appointment:{
        color:"#090808AB",
        fontSize:13,
        textAlign:"left"
    },
    date:{
        color:"#556A92",
        fontWeight:"bold",
        textAlign:"left",
        fontSize:11
    },
    time:{
        color:"#556A92",
        fontWeight:"bold",
        textAlign:"left",
        fontSize:11
    }
})