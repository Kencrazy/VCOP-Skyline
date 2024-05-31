import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
//Screen
import UserRoutes from "../user/routes";
import Senko from "../screen/EWallet/routes";
// import Aquafina from "../shot_violator/routes";
import Setting from "../screen/Setting";
import Kitkat from "../screen/Setting/routes";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator()
const homeName = "Home"
const walletName = "EWallet"
const accountName = "Tài Khoản"

export default function UserNavigator({route}){
    const {id}=route.params
    const nul = null
    const fine = null
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
                    else if (rn === walletName){
                        iconName = "wallet"
                    }
                    else if (rn === accountName){
                        iconName = "person"
                    }

                    return <Ionicons name={iconName} size={32}/>
                }})
                }
            
            >

                <Tab.Screen name={homeName} component={UserRoutes} initialParams={{id}}/>
                <Tab.Screen name={walletName} component={Senko} initialParams={{nul,fine}}/>
                <Tab.Screen name={accountName} component={Kitkat} initialParams={{id}}/>


            </Tab.Navigator>
    )
}