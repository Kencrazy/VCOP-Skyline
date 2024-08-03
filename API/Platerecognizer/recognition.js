import axios from 'axios';

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
        'Authorization': 'Token b4d9bb8199991c810e1fa7115c5ced059d743866',
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
