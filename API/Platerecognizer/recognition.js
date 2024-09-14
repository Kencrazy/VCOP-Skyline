import axios from 'axios';
// new API 
export async function recognizePlate(imageUri) {
  try {
    const formData = new FormData();
    formData.append('upload', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg',
    });

    const config = {
      headers: {
        'Authorization': 'Token 394e5119868fe239ad5a814e23832c480af3c38b',
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.post('https://api.platerecognizer.com/v1/plate-reader/', formData, config);
    const plateData = response.data.results[0];
    return plateData.plate;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      console.error('Error scanning plate number: Invalid request format');
    } else {
      console.error('Error scanning plate number:', error);
    }
    console.log("hello");
    return false;
  }
}