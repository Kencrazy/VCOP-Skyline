import { createNativeStackNavigator } from "@react-navigation/native-stack";
 const Theme = createNativeStackNavigator()

 //Screen
 import Ewallet from ".";
 import BankConnect from "./component/bank_Connect";
 import BankPass from "./component/bank_pass";
 import Verify from "./component/verify";
 import AccountBalance from "./component/account balance";
 import ExportMoney from "./component/getMoney";
 import Userinfo from "../notification";

 export default function Senko({route}){
    const {id}=route.params
    const {fine}=route.params
    return(
        <Theme.Navigator initialRouteName="EWallet" screenOptions={{headerShown:false}}>
            <Theme.Screen name="Ewallet" component={Ewallet} initialParams={{id}}/>
            <Theme.Screen name="BankConnect" component={BankConnect}/>
            <Theme.Screen name="BankPass" component={BankPass} initialParams={{id}}/>
            <Theme.Screen name="Verify" component={Verify}/>
            <Theme.Screen name="Account" component={AccountBalance} initialParams={{fine,id}}/>
            <Theme.Screen name="Money" component={ExportMoney} initialParams={{id}} options={{headerShown:true}}/>
            <Theme.Screen name="Notification" component={Userinfo} initialParams={{id}} options={{headerShown:true}}/>
        </Theme.Navigator>
    )
 }