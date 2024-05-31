import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screen
import UserNavigator from "./navigation/userNavigation";
import PoliceNavigator from "./navigation/policeNavigation";
import AuthorNavigator from "./navigation/authorityNavigation";
import Login from "./authentication/login";
import SignUp from "./authentication/signup";

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Login">
        {/* <Stack.Screen name="user" component={AuthorNavigator}/> */}
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="UserNavigator" component={UserNavigator}/>
        <Stack.Screen name="PoliceNavigator" component={PoliceNavigator}/>
        <Stack.Screen name="AuthorNavigator" component={AuthorNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

