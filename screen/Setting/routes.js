import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
//Screen
import Setting from ".";
import CallInfo from "./component/userInfo";
import Signing from "./component/Sign";
import History from "./component/history";
import EPass from "./component/EPass";

const Theme = createNativeStackNavigator()

export default function Kitkat({route}){
    const id = route.params
    return(
       
        <Theme.Navigator initialRouteName="Setting" screenOptions={{headerShown:false}}>
            <Theme.Screen name="Setting" component={Setting} initialParams={{id}}/>
            <Theme.Screen name="CallInfo" component={CallInfo} initialParams={{id}}/>
            <Theme.Screen name="Signing" component={Signing} initialParams={{id}}/>
            <Theme.Screen name="History" component={History} initialParams={{id}}/>
            <Theme.Screen name="epass" component={EPass} initialParams={{id}}/>
        </Theme.Navigator>
       
    )
}