import ViolatorContact from "./camera";
import ViolatorInf from "./violator_inf";
import Decision1 from "../paperwork/decision/1"
import Decision2 from "../paperwork/decision/2";
import Report2 from "../paperwork/report/2";
import Decision0 from "../paperwork/decision/0";
import Done from "../paperwork/done";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

export default function Aquafina({route}){
    const {id}=route.params
    return(
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="camera">
            <Stack.Screen name="camera" component={ViolatorContact}/>
            <Stack.Screen name="info" component={ViolatorInf}/>
            <Stack.Screen name="Des1" component={Decision1} initialParams={{id}}/>
            <Stack.Screen name="Des0" component={Decision0} initialParams={{id}}/>
            <Stack.Screen name="Des2" component={Decision2} initialParams={{id}}/>
            <Stack.Screen name="Report2" component={Report2} initialParams={{id}}/>
            <Stack.Screen name="Done" component={Done}/>
        </Stack.Navigator>
    )
}