import { View,SafeAreaView,FlatList,Text } from "react-native";
import React,{useState,useEffect} from "react"
import GetUser from "../../../../API/Firebase/get";

export default function History({navigation}){
    // const id = "aVIsdGzacM7PekQgcK7P"
    // const [data,setData] = useState([])
    // const [history,setHistory] = useState([])
    // const handle_history = async()=>{
    //     setData(await GetUser(id))
    //     if(data != null){
    //         setHistory(data.history)
    //     }
    // }

    // handle_history()
    return(
        <SafeAreaView>
            <Text>LỊCH SỬ VI PHẠM</Text>

            {/* <FlatList
            data={history}
            renderItem={({item})=>{
                <View>
                    <View>
                        <Text>{item.violate}</Text>
                        <Text>{item.city}</Text>
                        <Text>{item.district}</Text>
                    </View>
                </View>
            }}/> */}
        </SafeAreaView>
    )
}