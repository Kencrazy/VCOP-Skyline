import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
//Screen
import HappyTime from "../police/routes";
// import EWallet from "../screen/EWallet";
import Aquafina from "../shot_violator/routes";
import Setting from "../screen/Setting";
import Kitkat from "../screen/Setting/routes";

const Tab = createBottomTabNavigator()
const homeName = "Home"

const accountName = "Tài Khoản"

export default function PoliceNavigator({route}){
    const {id}=route.params
    console.log(id);
    return(
            <Tab.Navigator initialRouteName={homeName}
            screenOptions={({route})=>({
                tabBarActiveTintColor:"blue",
                lazy: true,
                tabBarInactiveTintColor:"grey",
                tabBarLabelStyle:{paddingBottom:10,fontSize:13},
                tabBarStyle:{height:100},
                headerShown:false,
                
                tabBarIcon: ({focus})=>{
                    let iconName
                    let rn = route.name

                    if(rn === homeName){
                        iconName = "home"
                    }
                    else if (rn === accountName){
                        iconName = "person"
                    }

                    return <Ionicons name={iconName} size={32}/>
                }})
                }
            
            >

                <Tab.Screen name={homeName} component={HappyTime} initialParams={{id}}/>
                <Tab.Screen name="Shot"  component={Aquafina} options={{tabBarIcon: ()=>{return(<Image source={require("../assets/scan.png")}/>)}}} initialParams={{id}}/>
                {/* <Tab.Screen name={accountName} component={Setting} initialParams={{id}}/> */}
                <Tab.Screen name={accountName} component={Kitkat} initialParams={{id}}/>


            </Tab.Navigator>
    )
}