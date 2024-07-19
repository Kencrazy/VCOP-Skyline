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
        'Authorization': 'Token ae4d61440b95fbb1792cbaa14008bbc5290308c6',
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
