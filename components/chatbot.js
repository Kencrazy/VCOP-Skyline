import { ScrollView,View,Modal,Text,TextInput,TouchableOpacity, SafeAreaView, FlatList, KeyboardAvoidingView,Platform,Keyboard,TouchableWithoutFeedback, Dimensions ,Image, ActivityIndicator} from "react-native";
import React,{useState,useEffect} from "react";
import axios from "axios";
import { speak,isSpeakingAsync,stop } from "expo-speech";
import ChatBubble from "./chatbubble";

export default function ChatBot(){
    const API_KEY = "AIzaSyCRlCe7UIDlKc2Ece-F_XwL7dQ-HhiPEQs"
    const [chat,setChat]=useState([])
    const [userInput,setUserInput]=useState('')
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)
    const [isSpeaking,setIsSpeaking]=useState()
    const handleUserInput = async ()=>{
        let updatedChat = [
            ...chat,{
                role: "user",
                parts: [{text:userInput}]
            },
        ]
        setLoading(true)
        try{
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    contents: updatedChat
                }
            )
            const modelResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
            if(modelResponse){
                const updatedChatWithModel = [
                    ...updatedChat,{
                        role: "model",
                        parts: [{text:modelResponse}]
                    }
                ]
                setChat(updatedChatWithModel)
                setUserInput("")
            }
        } catch(err){
            setError(err)
            console.log(error);
        } finally{
            setLoading(false)
        }
    }
    const handleSpeech = async (text)=>{
        if(isSpeaking){
            stop()
            setIsSpeaking(false)
        } else{
            if(!(await isSpeakingAsync())){
                speak(text)
                setIsSpeaking(true)
            }
        }
    }

    const renderChatItem = ({item})=>(
        <ChatBubble role={item.role} text = {item.parts[0].text} onSpeech={()=>handleSpeech(item.parts[0].text)}/>
    )

    return(
        <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS =="ios" ? 'padding+20' : 'height'}>
        <View  style={{flex:1,padding:16,backgroundColor:"#f8f8f8"}}>
            <FlatList data={chat} renderItem={renderChatItem} keyExtractor={(item,index)=>index.toString()} contentContainerStyle={{flexGrow:1,justifyContent:"flex-end"}}/>
            <View style={{flexDirection:"row",alignItems:"center",marginTop:10,}}>
                <TextInput style={{flex:1,height:50,marginRight:10,padding:8,borderColor:"#333", borderWidth:1,borderRadius:25,color:"#333",backgroundColor:"#fff"}} placeholder="Type your question..." placeholderTextColor="grey" value={userInput} onChangeText={text=>setUserInput(text)}/>
                <TouchableOpacity onPress={handleUserInput} style={{padding:10,backgroundColor:"#007AFF",borderRadius:25}}>
                    <Text style={{color:"#fff",textAlign:"center",}}>Send</Text>
                </TouchableOpacity>
            </View>
            {loading && <ActivityIndicator style={{marginTop:5}} color="#333"/>}
            {error && <Text style={{color:"red",marginTop:10}}>{error}</Text>}
        </View>
        </KeyboardAvoidingView>
    )
}