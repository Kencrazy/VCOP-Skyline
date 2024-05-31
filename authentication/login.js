import React,{useEffect, useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import { handleLogin } from '../API/Firebase/authentication'
import {doc,getDoc} from "firebase/firestore/lite"
// import UserNavigator from '../../Navigation/UserNavigator'
// import { getPersonalInfo } from '../API/getPersonalInfo'

const Login = ({route,navigation}) =>{
  
  const [username,setUsername] = useState('')
  const [id,setId] =useState('')
  const [password,setPassWord] = useState('')
  const [isLogged,setIsLogged] = useState(false)
  const handleLoginFunc = async() =>{
    console.log("hello");
    const position = await handleLogin({id,password})
    console.log(position)
    if (position[1].position == "user"){
      // console.log(id);
      navigation.navigate('UserNavigator',{id:position[0]})
    }
    
    else if (position[1].position == "police"){
      navigation.navigate('PoliceNavigator',{id:position[0]})
    }
    else if (position[1].position=="author"){
      navigation.navigate("AuthorNavigator",{id:position[0]})
    }
  }

  return(
    <View style={styles.container}>

      <Image style={styles.logo}source={require('../assets/vcop.png')} />


      <View>
        <Text style={styles.lead}>───────── Đăng nhập ─────────</Text>
        <TextInput style={styles.textInput} placeholder='Họ và tên' placeholderTextColor="gray" onChangeText={text => setUsername(text)} value={username}/>
        <TextInput style={styles.textInput} placeholder="Căn cước công dân" placeholderTextColor="gray" onChangeText={id => setId(id)} value={id} />
        <TextInput style={styles.textInput}  placeholder='Mật khẩu' placeholderTextColor="gray" onChangeText={PW => setPassWord(PW)} value={password}  />
        <TouchableOpacity style={styles.btn} 
          onPress={handleLoginFunc}>
          <Text style={styles.boldWhite}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </View>

      <View style={[{flexDirection:"row",top: "22%"}]}>
        <Text style={[{right: "40%"}]}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.bluetxt} >ĐĂNG KÝ</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}   

export default Login;