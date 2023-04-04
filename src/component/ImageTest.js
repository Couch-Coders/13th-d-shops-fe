import axios from 'axios';
import React from 'react'

export default function ImageTest() {

  const onfileupload = async (event) => {
    const formData = new FormData();
    formData.append("files", event.target.files[0]);
    try {
      const response = await axios.post(
        "users/me/products/1/images",
        formData,
        {
          headers: {
            "Contest-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log("성공");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <input
          type="file"
          id="upload-file"
          accept="image/*"
          onChange={onfileupload}
        />
  )
}
