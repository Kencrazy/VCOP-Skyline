import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../API/Firebase/firebaseConfig';
import GetUser from '../../../API/Firebase/get';
import { styles } from './styles';

export default function Report3({ navigation, route }) {
    const { item, id } = route.params;

    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [organization, setOrganization] = useState('');
    const [bornDate, setBD] = useState('');
    const [bornMonth, setBM] = useState('');
    const [bornYear, setBY] = useState('');
    const [job, setVJOB] = useState('');
    const [address, setAddress] = useState('');

    const [username, setAName] = useState('');
    const units = 'Đơn vị 3';
    const rule = 3;
    const rule2 = 4;
    const title = '...........';
    const fine = 4000000;
    const today = new Date();
    const tdate = today.getDate();
    const hour = today.getHours();
    const tmonth = today.getMonth() + 1;
    const tyear = today.getFullYear();
    const position = 'Người có thẩm quyền';
    const [id2,setID2]=useState()

    const getData = useCallback(async () => {
        const user_info = await GetUser(item.id);
        setOrganization(user_info.name);
        const [day, month, year] = user_info.birthdate.split('/');
        setID2(user_info.id)
        setBD(day);
        setBM(month);
        setBY(year);
        setVJOB(user_info.job);
        setAddress(user_info.address);
    }, [item.id]);

    useEffect(() => {
        getData();
    }, [getData]);

    const getData2 = useCallback(async () => {
        const author_info = await GetUser(id);
        setAName(author_info.name);
    }, [id]);

    useEffect(() => {
        getData2();
    }, [getData2]);

    const handle_report = useCallback(async () => {
        const user = await GetUser(item.id);
        const user_violate = user.violate || []; // Ensure user.violate is initialized as an array
        const newReport = {
            type: 2,
            author_id: id,
            date: `${tdate}/${tmonth}/${tyear}`,
            time: `${hour}:${today.getMinutes()}`,
            fine: fine,
            violator: item.violator,
        };

        user_violate.unshift(newReport);

        const docRef = doc(db, 'vcop', item.id);
        await updateDoc(docRef, {
            violate: user_violate,
        });

        navigation.navigate('Done');
    }, [item.id, id, fine, hour, item.violator, tdate, today.getMinutes(), tmonth, tyear]);

    const formattedDate = useMemo(() => `${date} tháng ${month} năm ${year}`, [date, month, year]);

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={{ marginTop: '10%' }}>
                <View style={styles.leading}>
                    <Text>Số:......QĐ-XPVPHC</Text>
                    <View style={styles.alignCenter}>
                        <Text style={styles.black}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
                        <Text style={styles.black}>Độc lập- Tự do-Hạnh phúc</Text>
                    </View>
                </View>

                <Text style={styles.judgedDate}>Đà Nẵng Ngày {formattedDate}</Text>

                <Text style={[styles.Bred,{marginTop:"10%"}]}>QUYẾT ĐỊNH</Text>
                <Text style={styles.Bblack}>Xử phạt vi phạm hành chính không lập biên bản</Text>

                <View style={{marginHorizontal:"1%",marginTop:"10%"}}>
                    <Text>Căn cứ Điều {rule} Luật xử lý vi phạm hành chính</Text>
                    <Text>Căn cứ {rule2}: {title} </Text>
                    <Text>Căn cứ Văn bản giao quyền số .../... ngày ... tháng ... năm ... (nếu có),</Text>
                    <View>
                        <Text>Tôi: {username} </Text>
                        <Text>Chức vụ: {position}</Text>
                        <Text>Đơn vị: {units}</Text>
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
                    <Text>Giấy CMND hoặc hộ chiếu/Quyết định thành lập hoặc ĐKKD số:{id2}</Text>
                    <Text>Cấp ngày: XX / XX / XXXX Nơi cấp: XXXXXX</Text>
                    <View style={{flexDirection:"row"}}>
                    <Text>Đã thực hiện hành vi vi phạm hành chính </Text>
                    <Text>{item.violator}</Text>
                    </View>
                    <Text>Địa điểm xảy ra vi phạm: đường Lê Văn Hiến</Text>
                    <Text>Các tình tiết liên quan đến giải quyết vi phạm (nếu có): </Text>

                    <Text style={{marginTop:"5%"}}><Text style={styles.black}>Điều 2.</Text> Các hình thức xử phạt và biện pháp khắc phục hậu quả được áp dụng:</Text>
                    <Text>1. Hình thức xử phạt chính:</Text>
                    <Text>Mức phạt: {fine}</Text>
                    <Text>2. Hình thức xử phạt bổ sung: </Text>
                    <Text>3. Biện pháp khắc phục hậu quả:</Text>

                    <Text style={{marginTop:"5%"}}><Text style={styles.black}>Điều 3.</Text> Quyết định này có hiệu lực thi hành kể từ ngày {tdate} / {tmonth} /{tmonth} và được lập thành 03 bản có nội dung và giá trị như nhau, 01 bản giao cho người vi phạm hoặc đại diện tổ chức vi phạm, 01 bản giao cho Kho bạc Nhà nước nơi thu tiền phạt, 01 bản lưu hồ sơ cơ quan xử lý vi phạm hành chính..</Text>

                    
                </View>

                <View style={styles.sign}>
                    <View style={{alignItems:"center",top:"-3%"}}>
                        <Text style={styles.black}>Quyết định này đã được giao cho</Text>
                        <Text style={styles.black}> người vi phạm hoặc đại diện</Text>
                        <Text style={styles.black}>cho tổ chức vi phạm lúc {hour} giờ ngày</Text>
                        <Text style={styles.black}>{tdate}//{tmonth}//{tyear}</Text>
                        <Text >(Người nhận ký ghi rõ họ tên)</Text>
                    </View>

                    <View style={{alignItems:"center"}}>
                        <Text style={styles.black}>Người ra quyết định</Text>
                        <Text>(Ký ghi rõ họ tên và đóng dấu)</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.btn} onPress={handle_report}>
                    <Text>THÔNG BÁO CHO NGƯỜI VI PHẠM</Text>
                </TouchableOpacity>
            
            </View>
        </ScrollView>
        
    )
}