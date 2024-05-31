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
        'Authorization': 'Token b983ba59d336577582c110652892a336d78fc2c8',
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await axios.post('https://api.platerecognizer.com/v1/plate-reader/', formData, config);
    const plateData = response.data.results[0];
    console.log(plateData);
    
    
  } catch (error) {
    console.error('Error scanning plate number:', error);
    console.log("hello");
    return null;
  }
}