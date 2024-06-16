import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PoliceHome from "./mainhome";
import Working from "../screen/work";
import Chat from "../screen/call";
import ErrorFound from "../screen/call/paper";
import Done from "../paperwork/done";
import ChatBot from "../components/chatbot";
// import DecisionMaker from "../authority/decision_maker";

const Stack = createNativeStackNavigator()

export default function HappyTime({route}){
    const {id}=route.params
    return(
        <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
            <Stack.Screen name="home" component={PoliceHome} initialParams={{id}}/>
            <Stack.Screen name="Working" component={Working} initialParams={{id}} options={{headerShown:true}}/>
            <Stack.Screen name="Chat" component={Chat} initialParams={{id}} options={{headerShown:true}}/>
            <Stack.Screen name="Des1" component={ErrorFound} initialParams={{id}}/>
            <Stack.Screen name="Done" component={Done}/>
            <Stack.Screen name="Chatbot" component={ChatBot} options={{headerShown:true,headerBackTitleVisible:false}}/>
        </Stack.Navigator>
    )
}