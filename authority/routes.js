import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthorityHome from "./mainhome";
import Working from "../screen/work";
import DecisionMaker from "./decision_maker";
import Report3 from "../paperwork/report/3";
import Done from "../paperwork/done";
import Decision1 from "../paperwork/decision/1";
import Observe from "./decision_maker/paper";
const Stack = createNativeStackNavigator()

export default function KenJu({route}){
    const {id}=route.params
    console.log(id);
    return(
        <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
            <Stack.Screen name="home" component={AuthorityHome} initialParams={{id}}/>
            <Stack.Screen name="Working" component={Working} initialParams={{id}} options={{headerShown:true}}/>
            <Stack.Screen name="Decision Maker" component={DecisionMaker} initialParams={{id}} options={{headerShown:true}}/>
            <Stack.Screen name="Observe" component={Observe} options={{headerShown:true}}/>
            <Stack.Screen name="report3" component={Report3} initialParams={{id}} options={{headerShown:true}}/>
            <Stack.Screen name="Done" component={Done}/>
        </Stack.Navigator>
    )
}