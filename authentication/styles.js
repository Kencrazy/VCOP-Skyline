import { StyleSheet } from "react-native";

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        backgroundColor:"white"
    },
    logo:{
        marginTop:"20%",
        width:"32%",
        height:"20%"
    },
    textInput:{
        backgroundColor:"#F7F8F9",
        borderWidth: 1,
        borderColor:"#E8ECF4",
        borderRadius: 8,
        color:"#8391A1",
        textAlign:"center",
        paddingVertical: "4%",
        marginHorizontal:"5%",
        marginVertical:"3%"
    },
    lead: {
        color:"#6A707C",
        // fontWeight: 600,
        borderWidth: 0.2,
        borderColor: "#E8ECF4",
        marginTop: "10%",
        marginBottom:"5%"
    },
    boldWhite:{
        // fontFamily: "Inter",
        fontSize: 15,
        // fontWeight: 600,
        // lineHeight: 18,   
             
        // letterSpacing: "0em",
        textAlign: "center",
        color: "white"
    },
    btn:{
        backgroundColor:"#143072",
        paddingHorizontal:"15%",
        paddingVertical:"5%",
        marginTop:"4%",
        borderRadius: 8,
        marginHorizontal:"5%",
        top: "6%"
    },
    bluetxt:{
        color:"#143072",
        // fontWeight: "bold",
    }
})

export default styles