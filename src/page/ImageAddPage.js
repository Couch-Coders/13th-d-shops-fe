import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function ImageAddPage() {

  const [productSeq,setProductSeq] = useState([])
  const onfileupload = async (event) => {
    console.log("onfileupload")
    const formData = new FormData();
    formData.append("files", event.target.files[0]);
    try {
      const response = await axios.post(
        `users/me/products/${productSeq.seq}/images`,
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
    <div>
      <div>
    
   
    <input
      type="file"
      id="upload-file"
      accept="image/*"
      onChange={onfileupload}
      ></input>
     
  </div>
    </div>
  )
}
