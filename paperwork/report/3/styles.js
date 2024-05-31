import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    leading:{
        flexDirection:"row",
        justifyContent:"space-around",
    },
    alignCenter:{
        alignItems:"center"
    },
    judgedDate:{
        marginTop:"10%",
        textAlign:"right",
        color:"black",
        fontSize: 13,
        right:"5%"
    },
    Bred:{
        fontSize: 24,
        fontWeight:"bold",
        marginTop:"5%",
        textAlign:"center",
        color: "red"
    },
    Bblack:{
        fontSize: 15,
        fontWeight:"bold",
        marginTop:"2%",
        textAlign:"center",
        color: "black"
    },
    black:{
        fontWeight:"bold",
        color:"black",
        fontSize:12
    },
    Sblack:{
        fontSize:13,
        marginTop:"1%"
    },
    sign:{
        marginTop:"15%",
        flexDirection:"row",
        justifyContent:"space-around"
    },
    btn:{
        backgroundColor:"#F7F8F9",
        borderColor:"#E8ECF4",
        borderWidth:1,
        borderRadius: 8,
        alignItems:"center",
        marginVertical:"10%",
        paddingVertical:"4%",
        marginHorizontal:"15%"
    }
})

export {styles}