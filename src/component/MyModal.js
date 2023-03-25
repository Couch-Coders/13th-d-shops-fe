import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { onUserPut1 } from '../service/authservice';
import { getMyInfo } from '../stores/myInfoSlice';
import { useDispatch, useSelector } from 'react-redux';
import DaumPostCode from 'react-daum-postcode';
import axios from 'axios';


function MyVerticallyCenteredModal(props) {

  const [adressfull,setAdressfull] = useState()
// 우편번호

const handleComplete = (data) => {
  let fullAddress = data.address;
  let extraAddress = '';
  if (data.addressType === 'R') {
      if (data.bname !== '') {
          extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
          extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
  }
  setAdressfull(fullAddress)
}
// 위도경도 불러오기

  const [coordinates, setCoordinates] = useState({});
const handleConvertAddress = async () => {
  try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${adressfull}`,
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

const dispatch = useDispatch()

const [inputs,setInputs] = useState({
  
   
} )

const handleChange = (e) =>{
  const { name, value }= e.target;
  setInputs((inputs)=>({...inputs, [name] : value}))
  console.log(inputs)
 
}
const handleSubmit = (e)=>{
  e.preventDefault();
  onUserPut1(inputs)
}
useEffect(()=>{
  
},[inputs])

useEffect(()=>{
  dispatch(getMyInfo())
},[])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          내정보 / 사업장 정보 수정하기
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit}>
        <div>
          <div>이름</div>
          <input type='text' name='name' onChange={handleChange} value={inputs.name ?? ''}></input>
        </div>
    <div>
      <div> 사업장 이메일</div>
      <input type='text' name='email' onChange={handleChange} value={inputs.email ?? ''}></input>
    </div>
    <div>
      <div>사업장 전화번호</div>
      <input type='text' name='phone' onChange={handleChange} value={inputs.phone ?? ''}></input>
    </div>
    <div>
      <div>사업장 이름</div>
      <input type='text' name='names' onChange={handleChange} value={inputs.names ?? ''}></input>
    </div>
    <div>
      <div>사업장 주소</div>
      <input tyep='text' name='adressfull' id='companyAdrees' onChange={handleChange} value={inputs.adressfulls ?? adressfull}></input>
      <input type='text' name='locationX' onChange={handleChange} value={inputs.locationX ?? coordinates.latitude}></input>
      <input type='text' name='locationY' onChange={handleChange} value={inputs.locationY ?? coordinates.longitude}></input>
      {/* <input type='text' name='post_code' onChange={handleChange} value={inputs.post_code ?? ''}></input>
      <input type='text' name='address' onChange={handleChange} value={inputs.address ?? ''}></input>
      <input type='text' name='extra' onChange={handleChange} value={inputs.extra ?? ''}></input>
      <input type='text' name='detail' onChange={handleChange} value={inputs.detail ?? ''}></input> */}
 

      
      <button onClick={handleConvertAddress}>Convert Address</button>
      
    </div>
    <div>
    <DaumPostCode onComplete={handleComplete} className="post-code" />
        
        </div>


    
    <button>수정</button>
    </form>
      </Modal.Body>
      <Modal.Footer>
     
        <button  onClick={props.onHide}>수정</button>
      </Modal.Footer>
    </Modal>
  );
}
export default function MyModal() {
  const [modalShow, setModalShow] = React.useState(false);

 
  return (
    <div>
       
      <button onClick={() => setModalShow(true)} > 수정하기 </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

   
    </div>



  )
}
