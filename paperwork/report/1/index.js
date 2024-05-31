import {View,Text,ScrollView,TouchableOpacity,FlatList,CheckBox,Image} from 'react-native'
import {styles} from './styles'
import {doc,updateDoc} from "firebase/firestore"
import { db } from '../../../API/Firebase/firebaseConfig'
// import {styles} from "./styles"
import GetUser from '../../../API/Firebase/get'
import { useState,useEffect } from 'react'


export default function Report1({navigation,route}){
    const {item}=route.params
    const [organization,setOrg]=useState()
    const day = item.item.date.split("/")
    const date = day[0]
    const month = day[1]
    const year = day[2]
    const hour = item.item.time.split("/")[0]
    const [job,setJob]=useState()
    const [position,setPos]=useState()
    const [bornDate,setBD]=useState()
    const [bornMonth,setBM]=useState()
    const [bornYear,setBY]=useState()
    const [address,setAddress]=useState()
    const [police_name,setPName]=useState()
    const fine = 400000
    const [id2,setID]=useState()

    // console.log(item);
    useEffect(()=>{
        const getData = async ()=>{
            try{
                const user_info = await GetUser(item.id)
                setOrg(user_info.name)
                setJob(user_info.job)
                // console.log(user_info);
                // console.log(user_info);
                const birth = user_info.birthdate.split("/")
                setBD(birth[0])
                setBM(birth[1])
                setBY(birth[2])
                setAddress(user_info.address)
                setID(user_info.id)
               

                
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[item.id])

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const police_info = await GetUser(item.item.id)
                setPName(police_info.name)
                setPos(police_info.job)
                // console.log(user_info);
                // console.log(user_info);
               

                
            } catch(err){
                console.error(err)
            }
        } 
        getData()
        
    },[item.item.id])


    const pressHandler = ()=>{
        navigation.navigate("Senko",{fine:fine})
    }

    return(
        <ScrollView style={{backgroundColor:"white"}}>
        <View style={{marginHorizontal:"4%",marginTop:"4%"}}>

            <Text style={{fontSize:40,fontWeight:"bold",textAlign:"center",marginTop:"10%",alignItems:"center"}}>NỘP PHẠT</Text>

            <Text style={{fontSize:16,fontWeight:"bold",marginTop:"3%"}}>Bấm vào để xem: Quyết định xử phạt</Text>
            <ScrollView style={{borderWidth:3,borderColor:"black",height:600,paddingHorizontal:"5%"}}>
                <View style={{marginTop:"10%"}}>
                
                    <View style={styles.leading}>
                        <Text>Số:......QĐ-XPVPHC</Text>
                        <View style={styles.alignCenter}>
                            <Text style={styles.black}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
                            <Text style={styles.black}>Độc lập- Tự do-Hạnh phúc</Text>
                        </View>
                    </View>

                    <Text style={styles.judgedDate}>Đà Nẵng Ngày {date}tháng {month}năm {year}</Text>

                    <Text style={styles.Bred}>QUYẾT ĐỊNH XỬ PHẠT VI PHẠM HÀNH CHÍNH</Text>
                    <Text style={styles.Bblack}>Trong lĩnh vực giao thông đường bộ</Text>

                    <View style={{marginTop:"10%"}}>
                        <Text>Căn cứ Điều 3 Luật xử lý vi phạm hành chính</Text>
                        <Text>Căn cứ nghị định số 4 của Chính phủ quy định xử phạt vi phạm hành chính trong lĩnh vực giao thông đường bộ:......... </Text>
                        <Text>Căn cứ Biên bản vi phạm hành chính số: ...../BB-VPHC do... lập hồi .../... ngày ... tháng ... năm ... tại ...</Text>
                        <Text>Xét hành vi vi phạm hành chính do ông(bà)/tổ chức:{organization} thực hiện và các tình tiết giảm nhẹ, tình tiết tăng nặng (nếu có): ....</Text>
                        <View>
                            <Text>Tôi: {police_name} </Text>
                            <Text>Chức vụ: {position}</Text>
                            <Text>Đơn vị: 3</Text>
                        </View>


                        <Text style={[styles.Bblack,{marginTop:"10%"}]}>QUYẾT ĐỊNH:</Text>

                        <Text style={{marginTop:"5%"}}><Text style={styles.black}>Điều 1.</Text> Xử phạt vi phạm hành chính theo thủ tục xử phạt không lập biên bản đối với:</Text>
                        <Text>Ông (Bà)/Tổ chức: {organization}</Text>
                        <View>
                        <Text>Ngày {bornDate} tháng {bornMonth} năm sinh {bornYear} </Text>
                        <Text>Quốc tịch: Việt Nam</Text>
                        </View>
                        <Text>Nghề nghiệp/lĩnh vực hoạt động: {job}</Text>
                        <Text>Địa chỉ: {address}</Text>
                        <Text>Giấy CMND hoặc hộ chiếu/Quyết định thành lập hoặc ĐKKD số:{id2}</Text>
                        <Text>Cấp ngày: 00 / 00 / 0000 Nơi cấp: xxxxxxxxx</Text>
                        <Text>Với các hình thức sau:</Text>
                        <Text>1. Phạt tiền đối với hành vi vi phạm quy định của Nghị định số.../.../NĐ-CP tại:</Text>

                        {/* Nghị định */}
                        <FlatList/>

                        <Text>Tổng cộng tiền phạt là: {item.item.fine}VNĐ (Bằng chữ: ....)</Text>

                        <Text>2. Hình thức phạt bổ sung (nếu có): .....</Text>

                        <Text>3. Các biện pháp khắc phục hậu quả (nếu có): ....</Text>

                        <Text style={{marginTop:"5%"}}><Text style={styles.black}>Điều 2.</Text> Ông (bà)/tổ chức có tên tại Điều 1 phải nghiêm chỉnh chấp hành Quyết định xử phạt trong thời hạn 10 (mười) ngày, kể từ ngày được giao Quyết định xử phạt là ngày ….. tháng ….. năm ………, trừ trường hợp được hoãn chấp hành theo quy định của pháp luật vì ……………….……………………..…..Quá thời hạn nêu trên, nếu không tự nguyện chấp hành thì bị cưỡng chế thi hành theo quy định của pháp luật.
    Số tiền phạt quy định tại Điều 1 phải được nộp vào tài khoản số xxxxx của Kho bạc Nhà nước. trong vòng 10 (mười) ngày, kể từ ngày được giao Quyết định xử phạt.
    Ông (bà)/tổ chức có tên tại Điều 1 có quyền khiếu nại hoặc khởi kiện đối với Quyết định xử phạt vi phạm hành chính này theo quy định của pháp luật.</Text>

                        <Text style={{marginTop:"5%"}}><Text style={styles.black}>Điều 3.</Text>Quyết định này có hiệu lực thi hành kể từ ngày {date} / {month} / {year} và được lập thành 03 bản có nội dung và giá trị như nhau, 01 bản giao cho người vi phạm hoặc đại diện tổ chức vi phạm, 01 bản giao cho Kho bạc Nhà nước nơi thu tiền phạt, 01 bản lưu hồ sơ cơ quan xử lý vi phạm hành chính.</Text>
                    </View>

                    <View style={styles.sign}>
                        <View style={{alignItems:"center",top:"-3%"}}>
                            <Text style={styles.black}>Quyết định này đã được giao cho</Text>
                            <Text style={styles.black}> người vi phạm hoặc đại diện</Text>
                            <Text style={styles.black}>cho tổ chức vi phạm lúc {hour} ngày</Text>
                            <Text style={styles.black}>{date}//{month}//{year}</Text>
                            <Text >(Người nhận ký ghi rõ họ tên)</Text>
                        </View>

                        <View style={{alignItems:"center"}}>
                            <Text style={styles.black}>Người ra quyết định</Text>
                            <Text>(Ký ghi rõ họ tên và đóng dấu)</Text>
                        </View>
                    </View>


                
                </View>
            </ScrollView>
        <Text style={{marginTop:"5%"}}><Text style={{fontSize:17,fontWeight:"bold"}}>SỐ TIỀN PHẠT:</Text> {fine}</Text>
        <Text>*Liên kết với tài khoản ngân hàng</Text>
        <TouchableOpacity style={styles.btn} onPress={pressHandler}>
                    <Text>NỘP PHẠT</Text>
        </TouchableOpacity>
        </View>
        </ScrollView>
 )
}