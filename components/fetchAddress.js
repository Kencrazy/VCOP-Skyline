import * as Location from "expo-location"

export default async function fetchAddress() {
    try {
        console.log("hello");
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      const API_KEY = "AIzaSyC7bsh-IKSNI9areFUSJmfPcipHzIHUevw"
      // Get the current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}&language=vi`
            );
            const data = await response.json();
        
            if (data.results && data.results[0]) {
                return data.results[0].formatted_address;
            } else {
                return 0; // Set address to "Địa chỉ không tìm thấy" (Address not found) in Vietnamese
        }
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }
  
