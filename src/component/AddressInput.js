
import React, { useState } from "react";
import axios from "axios";
import DaumPost from "./DaumPost";
import { onUserPut1 } from "../service/authservice";


function AddressInput({getDate}) {

 

  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
   
  };
const handleConvertAddress = async () => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
      {
        headers: {
          Authorization:'KakaoAK bf3e3b8848f7353aa7c8ef238ddc14bb', // Replace with your Kakao Maps REST API key
        },
      }
    );

    const { x: longitude, y: latitude } = response.data.documents[0].address;

    setCoordinates({ latitude, longitude });
  
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="App">
      <div>
      <input type="text" value={address} onChange={handleAddressChange} />
      
      <button onClick={handleConvertAddress}>Convert Address</button>
      {coordinates.latitude && coordinates.longitude && (
        <p>
          Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
        </p>
        
      )}
       
    </div>

   
    </div>
  );
}

export default AddressInput;
