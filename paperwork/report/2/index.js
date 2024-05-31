import {View,Text,TouchableOpacity,SafeAreaView,ScrollView,Image} from 'react-native'
import {useState,useEffect} from 'react'
import {doc,updateDoc} from "firebase/firestore"
import { db } from '../../../API/Firebase/firebaseConfig'
import {styles} from "./styles"
import GetUser from '../../../API/Firebase/get'
import { getStorage,ref,getDownloadURL } from 'firebase/storage'
import RNPickerSelect from 'react-native-picker-select';


export default function Report2({navigation,route}){
    const{id,violator_id,plateNum}=route.params
    const [violator,setViolator]=useState()
    const fine=400000

    const storage = getStorage();
    const imagePath = `${id}/sign/sign.png`;
    const imagePathViolator = `${violator_id}/sign/sign.png`
    const storageRef = ref(storage, imagePath);
    const storageRef2 = ref(storage,imagePathViolator)
  const [downloadURL, setDownloadURL] = useState(null);
  const [downloadURL2, setDownloadURL2] = useState(null);
  const [error, setError] = useState(null);

  const [sign,setSign]=useState()
  const [sign2,setSign2]=useState()
    const set_appointment = async()=>{
        
        const client = await GetUser(violator_id);
        const client_violate = client.violate // Make sure police_violate is an array
        console.log(client_violate);
        const newReport = {
            type:2,
            violator:violator,
            id:id,
            fine:fine,
            date: `${date}/${month}/${year}`,
            time: `${hour}:${today.getMinutes()}`
        };
    
        // Update the police_violate array
        client_violate.unshift(newReport);
        console.log(client_violate);
    
        // Update the Firestore document
        const docRef = doc(db, "vcop",violator_id);
        await updateDoc(docRef, {
          violate: client_violate,
        });
    
        // setViolate(police_violate); 
        navigation.navigate("Done");
      
}

const [username,setPName]=useState()
const [position,setPos]=useState()

useEffect(()=>{
    const getData = async ()=>{
        try{
            const police_info = await GetUser(id)
            // console.log(user_info);
            // console.log(user_info);
           
            setPName(police_info.name)
            setPos(police_info.job)
            setSign(police_info.sign)



            // setViolate(user_info.violate.length)
            
        } catch(err){
            console.error(err)
        }
    } 
    getData()

    const fetchImage = async () => {
        try {
          const url = await getDownloadURL(storageRef);
        //   const url2 = await getDownloadURL(storageRef2)
        //   setDownloadURL2(url2)
          setDownloadURL(url);
        } catch (error) {
          setError(error);
        }
      };
  
      fetchImage()
    
},[id])
const [organization,setOrganization]=useState("")

const [bornDate,setBD]=useState()
const [bornMonth,setBM]=useState()
const [bornYear,setBY]=useState()
const [job,setVJOB]=useState()
const [address,setAddress]=useState()
const [id2,setID]=useState()
useEffect(()=>{
    const getData = async ()=>{
        try{
            const violator_info = await GetUser(violator_id)
            // console.log(user_info);
            // console.log(user_info);
           
            setOrganization(violator_info.name)
            setVJOB(violator_info.job)
            const birthdate = violator_info.birthdate.split("/")
            setBD(birthdate[0])
            setBM(birthdate[1])
            setBY(birthdate[2])
            setVJOB(violator_info.job)
            setAddress(violator_info.address)
            setID(violator_info.id)
            setSign2(violator_info.sign)

            // setViolate(user_info.violate.length)
            
        } catch(err){
            console.error(err)
        }
    } 
    getData()

    const fetchImage = async () => {
        try {
        //   const url = await getDownloadURL(storageRef);
          const url2 = await getDownloadURL(storageRef2)
          setDownloadURL2(url2)
        //   setDownloadURL(url);
        } catch (error) {
          setError(error);
        }
      };
  
      fetchImage()
    
},[violator_id])

const today = new Date()
const date = today.getDate()
const month = today.getMonth()+1
const year = today.getFullYear()
const hour = today.getHours()

const handleValueChange = (value) => {
    setViolator(value);
    // console.log('Selected option:', value);
  };
    return(
        <ScrollView style={{flex:2,backgroundColor:"white"}}>
            <View style={{marginTop:"10%"}}>
                <View style={{marginBottom:"5%",left:"5%"}}>
                    <TouchableOpacity style={{flexDirection:"row",right:"15%",}} onPress={()=>navigation.navigate("info")}>
                        <Image source={require("../../../assets/arrow.png")}/>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.leading}>
                    <Text>Số:...... QĐ-XPVPHC</Text>
                    <View style={styles.alignCenter}>
                        <Text style={styles.black}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
                        <Text style={styles.black}>Độc lập- Tự do-Hạnh phúc</Text>
                    </View>
                </View>

                <Text style={styles.judgedDate}>Đà Nẵng Ngày {date}tháng {month}năm {year}</Text>

                <Text style={[styles.Bred,{marginTop:"10%"}]}>QUYẾT ĐỊNH</Text>
                <Text style={styles.Bblack}>Xử phạt vi phạm hành chính không lập biên bản</Text>

                <View style={{marginLeft:"1%",marginTop:"10%"}}>
                    <Text>Căn cứ Điều 3 Luật xử lý vi phạm hành chính</Text>
                    <Text>Căn cứ 4: .................. </Text>
                    <Text>Căn cứ Văn bản giao quyền số .../... ngày ... tháng ... năm ... (nếu có),</Text>
                    <View>
                        <Text>Tôi: {username} </Text>
                        <Text>Chức vụ: {position}</Text>
                        <Text>Đơn vị: 3</Text>
                    </View>


                    <Text style={styles.Bblack}>QUYẾT ĐỊNH:</Text>

                    <Text style={{marginTop:"5%"}}><Text style={styles.black}>Điều 1.</Text> Xử phạt vi phạm hành chính theo thủ tục xử phạt không lập biên bản đối với:</Text>
                    <Text>Ông (Bà)/Tổ chức: {organization}</Text>
                    <View>
                    <Text>Ngày {bornDate} tháng {bornMonth} năm sinh {bornYear} </Text>
                    <Text>Quốc tịch: Việt Nam</Text>
                    </View>
                    <Text>Nghề nghiệp/lĩnh vực hoạt động: {job}</Text>
                    <Text>Địa chỉ: {address}</Text>
                    <Text>Giấy CMND hoặc hộ chiếu/Quyết định thành lập hoặc ĐKKD số: {id2}</Text>
                    <Text>Cấp ngày: 00 / 00 / 0000 Nơi cấp: xxxxxxxx</Text>
                    <View style={{flexDirection:"row"}}>
                    <Text>Đã thực hiện hành vi vi phạm hành chính: </Text>
                    <RNPickerSelect
        onValueChange={handleValueChange}
        style={{marginLeft:40}}
        value={violator}
        placeholder={{ label: 'Lỗi vi phạm', value: null }}
        items={[
          { label: 'Không đội mũ bảo hiểm', value: 'Không đội mũ bảo hiểm' },
          { label: 'Đậu xe không đúng nơi quy định', value: 'Đậu xe không đúng nơi quy định' },
        ]}
      />
                    </View>
                    <Text>Địa điểm xảy ra vi phạm: đường Lê Văn Hiến</Text>
                    <Text>Các tình tiết liên quan đến giải quyết vi phạm (nếu có): </Text>

                    <Text style={{marginTop:"5%"}}><Text style={styles.black}>Điều 2.</Text> Các hình thức xử phạt và biện pháp khắc phục hậu quả được áp dụng:</Text>
                    <Text>1. Hình thức xử phạt chính:</Text>
                    <Text>Mức phạt: {fine}</Text>
                    <Text>2. Hình thức xử phạt bổ sung: </Text>
                    <Text>3. Biện pháp khắc phục hậu quả:</Text>

                    <Text style={{marginTop:"5%"}}><Text style={styles.black}>Điều 3.</Text> Quyết định này có hiệu lực thi hành kể từ ngày ký.</Text>

                    <Text style={{marginTop:"5%"}}><Text style={styles.black}>Điều 4.</Text> Quyết định này được:</Text>
                    <Text>1. Giao cho ông (bà)/tổ chức {organization} để chấp hành Quyết định xử phạt. Trong trường hợp bị xử phạt tiền, ông (bà)/tổ chức nộp tiền phạt tại chỗ cho người có thẩm quyền xử phạt; trường hợp không nộp tiền phạt tại chỗ thì nộp tại phần “Nộp phạt” ở ứng dụng VCOP hoặc nộp vào tài khoản của Kho bạc nhà nước/Ngân hàng thương mại trong thời hạn 10 ngày, kể từ ngày được giao Quyết định này.</Text>

                    <Text>Thời hạn thi hành hình thức xử phạt bổ sung là 20 ngày; thời hạn thi hành các biện pháp khắc phục hậu quả là 0 ngày, kể từ ngày được giao Quyết định này.</Text>
                    <Text>Nếu quá thời hạn trên mà không chấp hành sẽ bị cưỡng chế thi hành.</Text>
                    <Text>Ông (bà)/tổ chức bị tạm giữ phương tiện {plateNum} để bảo đảm thi hành quyết định xử phạt.</Text>

                    <Text>Ông (Bà)/Tổ chức có quyền khiếu nại hoặc khởi kiện hành chính đối với Quyết định này theo quy định của pháp luật.</Text>
                    <Text>2. Gửi cho ngân hàng nhà nước để thu tiền phạt</Text>
                    <Text>3. ...................................................... để tổ chức thực hiện Quyết định này.</Text>
                    <Text>4. Gửi cho ........................................................ để biết./.</Text>
                </View>

                <View style={styles.sign}>
                    <View style={{alignItems:"center",top:"-3%"}}>
                        <Text style={styles.black}>Quyết định này đã được giao cho</Text>
                        <Text style={styles.black}> người vi phạm hoặc đại diện</Text>
                        <Text style={styles.black}>cho tổ chức vi phạm lúc {hour} ngày</Text>
                        <Text style={styles.black}>{date}//{month}//{year}</Text>
                        <Text >(Người nhận ký ghi rõ họ tên)</Text>
                        {sign2 ? (
                    <Image source={{uri: downloadURL2}} style={{width:100,height:100}}/>

                    ):(
                        <Text>Sign not Found</Text>
                    )}
                    </View>

                    <View style={{alignItems:"center"}}>
                        <Text style={styles.black}>Người ra quyết định</Text>
                        <Text>(Ký ghi rõ họ tên và đóng dấu)</Text>
                        {sign ? (
                    <Image source={{uri: downloadURL}} style={{width:100,height:100}}/>

                    ):(
                        <Text>Sign not Found</Text>
                    )}
                    </View>
                </View>

                <TouchableOpacity style={styles.btn} onPress={set_appointment}>
                    <Text>THÔNG BÁO CHO NGƯỜI VI PHẠM</Text>
                </TouchableOpacity>
            
            </View>
        </ScrollView>
        
    )
}