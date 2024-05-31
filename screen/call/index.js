import {View,Text,TextInput,TouchableOpacity, Image,KeyboardAvoidingView,Platform, Alert,Linking,Modal} from "react-native"
import React,{useState,useRef,useEffect,useCallback,useLayoutEffect} from "react"
// import Messages from "../../components/messages"
import { GiftedChat } from "react-native-gifted-chat"
import { Timestamp, collection, doc, setDoc ,addDoc, orderBy, onSnapshot,query} from "firebase/firestore"
import { db } from "../../API/Firebase/firebaseConfig"
import GetUser from "../../API/Firebase/get"
export default function Chat({route,navigation}){
  const [position,setPosition]=useState()
  const [modal,setModal]=useState(false)

    const handlePress = () => {
        const url = 'https://newtocodenow.github.io/ZegoCloud/'; // Replace with your desired URL
        Linking.openURL(url);
      };

      useEffect(()=>{
        // const user_info = await GetUser(id)

        createRoomIfNoExisted()
        const docRef = doc(db,"rooms",roomID)
        const messageRef = collection(docRef,"messages")
        const q = query(messageRef,orderBy("createdAt","desc"))

        let unsub = onSnapshot(q,(snapshot)=>{
            let allMessages = snapshot.docs.map(doc=>{
                return doc.data()

            })
            // setMessages([...allMessages])
            const mappedMessages = allMessages.map((message) => {
                const { _id, text, createdAt } = message.messages[0];
                const user = message.user;
                return {
                  _id,
                  text,
                  createdAt,
                  user,
                };
              });
              setMessages(mappedMessages);
        })
        return unsub
    },[])
    
      // console.log(position);
      useLayoutEffect(() => {
        const getData = async ()=>{
          try{
            const user_info = await GetUser(id)
              
              // console.log(user_info);
              // console.log(user_info.position)
              setPosition(user_info.position)
             

              
          } catch(err){
              console.error(err)
          }
      } 
      getData()
        navigation.setOptions({
          headerRight: () => (
            
            <>
            {position === "police" ?(
              <View style={{flexDirection:"row",gap:10}}>             


                {/* <Text>Hello</Text> */}


                <TouchableOpacity onPress={handlePress} style={{right:20}}>
                  <Image source={require("../../assets/phone.png")} />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setModal(true)}>
                  <Image source={require("../../assets/chart.png")} />
                </TouchableOpacity>
              </View>

            ):(
              <TouchableOpacity onPress={handlePress}>
                <Image source={require("../../assets/phone.png")} />
              </TouchableOpacity>
            )}
            </>
          ),
        });
      }, [navigation,position]);
    const {id,id2,item}=route.params
    const [messages, setMessages] = useState([])
    const getM = []
    
    // console.log(item.id);
    


    // console.log(messages);

//   useEffect(() => {
//     setMessages([])
//   }, [])

  const createRoom = (id,id2)=>{
    const sortedID = [id,id2].sort()
    const room = sortedID.join('-')
    return room
  }
  const roomID = createRoom(id,id2)

  const createRoomIfNoExisted = async ()=>{
    // let roomID = roomID
    await setDoc(doc(db,"rooms",roomID),{
        roomID,
        createdAt: Timestamp.fromDate(new Date())   
    })
  }

  const handleSend=  ()=>{
    let violator_id = item.id
    navigation.navigate("Des1",{violator_id: violator_id ,plateNum: item.plateNum,item:item})
    setModal(false)
  }
  
  const handleStop = async ()=>{
    setModal(false)
    // Demo trước rồi sau đó mới xóa data, giữ data 
  }


  const onSend = useCallback(async (messages = []) => {
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messages),
    // )
    

        const docRef = doc(db,"rooms",roomID)
        const messageRef = collection(docRef,"messages")

        const add = await addDoc(messageRef,{
            messages,
            user:{
                _id:id2,
                name: "Ẩn Danh",
                avatar:"https://cdn-icons-png.flaticon.com/32/3135/3135715.png"
            },
            createdAt: new Date()
        })
    // console.log(add);
  }, [])
  // console.log(modal);   

  return (
    <View style={{flex:1}}>
<Modal animationType="fade" visible={modal} transparent={true}>
  <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
    <View style={{ backgroundColor: 'white', width:300,height:150,borderRadius:20 ,marginTop:100}}>
      <TouchableOpacity onPress={() => setModal(false)} style={{ alignSelf: 'flex-end',top:10,right:15 }}>
        <Text style={{fontSize:20,fontWeight:"bold"}}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{width:"90%",alignItems:"center",backgroundColor:"#143072",paddingVertical:10,marginTop:20,marginHorizontal:15,borderRadius:10}} onPress={handleSend}>
        <Text style={{
        // fontFamily: "Inter",
        fontSize: 15,
        // fontWeight: 600,
        // lineHeight: 18,   
             
        // letterSpacing: "0em",
        textAlign: "center",
        color: "white"
    }}>Phát hiện vi phạm</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={{width:"90%",alignItems:"center",backgroundColor:"#143072",paddingVertical:10,marginTop:16,marginHorizontal:15,borderRadius:10}} onPress={handleStop}>
        <Text style={{
        // fontFamily: "Inter",
        fontSize: 15,
        // fontWeight: 600,
        // lineHeight: 18,   
             
        // letterSpacing: "0em",
        textAlign: "center",
        color: "white"
    }}>Không vi phạm</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: id,
      }}
    />
    </View>
  )
}