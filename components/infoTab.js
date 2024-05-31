import { View, TouchableOpacity, Text } from "react-native";
import { useState, useMemo,useEffect } from "react";
import GetUser from "../API/Firebase/get";

//GET DATA
// import GetUser from "../API/Firebase/get";

export default function Infotab({ width, height, onPress, item }) {
//   const id = "aVIsdGzacM7PekQgcK7P";

  const [titles, setTitles] = useState("");
  const [linked, setLink] = useState("");
  const [button, setButton] = useState("");
  const [title2, setTitle2] = useState("");
  const [Userordate, setUserDate] = useState("");
  const [time, setTime] = useState("");
  // const [data,setData]=useState([])

  // console.log(item.police_id);
  // console.log(item);

  useEffect(()=>{
    const getData = async()=>{
        try{
            
            const police_info = await GetUser(item.id)
            // console.log(police_info);
            // console.log(police_info.name);
            // setData(police_info)

            if(item.type==1){
              setUserDate(police_info.name)
            } else if (item.type==2){
              setUserDate(police_info.name)
            } else if (item.type==3){
              setTitles(police_info.name)
              setUserDate(item.date)
              console.log(Userordate);
              console.log("hello");
              // setTitle()
            } else if (item.type==4){
              console.log("hello");
              // setTitles(police_info.plateNum);
              const police_in = await GetUser(item.police_id)
              setUserDate(police_in.name)

             }// else if(item.type==5){
            //   // setTitles(item.violate)

            // }
        } catch(err){
            console.error(err)
        }
    } 
    getData()
    
},[item])

  useMemo(() => {
    if (item.type === 1) {
      setTitles("Thông báo vi phạm");
      setButton("ĐẶT LỊCH");
      setTitle2("Cán bộ phụ trách");
      // setUserDate(data.name);
      setTime(item.date);
    } else if (item.type === 2) {
      setTitles("Quyết định xử phạt");
      setButton("NỘP PHẠT");
      setTitle2("Cán bộ phụ trách");
      // setUserDate(data.name);
      setTime(item.date);
    } else if (item.type === 3) {
      // console.log("run");
      // console.log(title);
      setButton("LÀM VIỆC");
      setTitle2("Ngày, giờ đặt lịch");
      // setUserDate(item.date);
      setTime(item.time);
    } else if (item.type === 4) {
      setTitles(item.plateNum)
      setButton("XEM CHI TIẾT");
      setTitle2("Người tạo biên bản");
      // setUserDate(item.police);
      setTime(item.date);
    } else if(item.type===5){
      setTitles(item.violator)
      setTitle2("Thời gian tổ chức")
      setUserDate(item.date)
      setTime(item.time)
      setButton("THAM GIA")
    }
  }, [item]);

  // console.log(title);

  return (
    <View style={[{ width: width, height: height, backgroundColor: "#F7F8F9", flexDirection: "row", justifyContent: "space-between", marginHorizontal: 10,marginTop:20,left:30,paddingTop:20,paddingHorizontal:7,borderRadius:10 }]}>
      <View>
        <Text style={{ color: "#143072", fontSize: 15, fontWeight: "bold",width:160 }}>{titles}</Text>
        <Text style={{ color: "#8391A1" }}>Hải Châu</Text>
        <Text style={{ color: "#8391A1" }}>Đà Nẵng</Text>
      </View>

      <View>
        <Text style={{ fontSize: 15 }}>{title2}</Text>
        <Text style={{ fontWeight: "bold" }}>{Userordate}</Text>
        <Text style={{ fontWeight: "bold" }}>{time}</Text>
        <TouchableOpacity style={{ paddingHorizontal: 1, paddingVertical: 5, alignItems: "center", backgroundColor: "#143072",marginTop:5,marginHorizontal:10,borderRadius:5 }} onPress={onPress}>
          <Text style={{ fontWeight: "bold", fontSize: 15, color: "white" }}>{button}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}