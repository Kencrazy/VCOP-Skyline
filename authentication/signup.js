import React,{useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import { handleSignUp } from '../API/Firebase/authentication'

const SignUp =({navigation}) =>{
  const [username,setUsername] = useState('')
  const [id,setId] =useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [password,setPassword] = useState('')
  const handleSignUpFunc = async ()=>{
    const a = await handleSignUp({id, password, username, phoneNum})
    console.log(a);
    navigation.navigate("Login")
  }
  return(
    <View style={styles.container}>

      <Image style={styles.logo}source={require('../assets/vcop.png')} />


      <View>
        <Text style={styles.lead}>───────── Tạo tài khoản ─────────</Text>
        <TextInput style={styles.textInput} placeholderTextColor="gray" placeholder="Họ và tên" onChangeText={text =>setUsername(text)}/>
        <TextInput style={styles.textInput} placeholderTextColor="gray" placeholder="Căn cước công dân" onChangeText={text => setId(text)} />
        <TextInput style={styles.textInput} placeholderTextColor="gray" placeholder="Số điện thoại" onChangeText={text => setPhoneNum(text)} />
        <TextInput style={styles.textInput} placeholderTextColor="gray"  placeholder='Mật khẩu' onChangeText={text => setPassword(text)} />
        <TouchableOpacity style={styles.btn} onPress={handleSignUpFunc}>
          <Text style={styles.boldWhite}>ĐĂNG KÝ</Text>
        </TouchableOpacity>
      </View>

      <View style={[{flexDirection:"row",top: "10%"}]}>
        <Text style={[{right: "35%"}]}>Bạn đã có tài khoản?</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
          <Text style={styles.bluetxt} >Đăng nhập</Text>
        </TouchableOpacity>
      </View>


    </View>
  )
}

export default SignUp;