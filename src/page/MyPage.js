import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DaumPost from '../component/DaumPost'
import AuthService, { onUserPut1 } from '../service/authservice'
import 'bootstrap/dist/css/bootstrap.min.css';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios'
import { myInfoThunk } from '../stores/myInfoSlice'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { HiLocationMarker } from 'react-icons/hi';
import {Container ,Row,Col} from 'react-bootstrap';

export default function MyPage() {


let navigate = useNavigate()
//경도 위도



const handleAddressChange = (event) => {
  setAddress(event.target.value);
};
const handleConvertAddress = async (event) => {
  event.preventDefault();
};

// 우편번호

  const [openPostcode, setOpenPostcode] = React.useState(false);
  const [address,setAddress] = useState()
  const [coordinates, setCoordinates] = useState({});
  const handle = {
    handleConvertAddress,
      // 버튼 클릭 이벤트
      clickButton: () => {
          setOpenPostcode(current => !current);
      },

      // 주소 선택 이벤트
      selectAddress: (data) => {
          console.log(`
              주소: ${data.address},
              우편번호: ${data.zonecode},
              
          `)
          setAddress(data.address)
          setOpenPostcode(false);  
      },
  }

const dispatch = useDispatch()
const [editedName, setEditedName] = useState({});
const [extra,setExtra] = useState()
const [postCode,setPostCode] =useState()
const [user, setUser] = useState({
  "name": null,
  "phone": null,
  "company": {
      "name": null,
      "email": null,
      "phone": null,
      "address": {
          "name": null,
          "post_code": null,
          "address": null,
          "extra": null,
          "detail": null,
          "location_x": null,
          "location_y": null
      }
  },
  });

let my= useSelector((state)=>state.myInfo.myInfo)
console.log(my)
useEffect(()=>{
  dispatch(myInfoThunk())
},[])
useEffect(()=>{
  const fetchData = async () => {
    const result = await AuthService.onGetMyInfo();
    // console.log("result", result);
    setUser(result)
    console.log(user)
  }
    fetchData()
    // make sure to catch any error
    .catch(console.error);

  console.log("값이 설정됨");
  return () => {
    console.log("가 바뀌기 전..");
  };
},[])


const handleNameChange = async(event) => {
  
  const {name , value}= event.target;
  setEditedName((editedName)=>({...editedName, [name] : value}))

  
      try {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
      {
        headers: {
          Authorization: "KakaoAK bf3e3b8848f7353aa7c8ef238ddc14bb", // Replace with your Kakao Maps REST API key
        },
      }
    );

    const { x: longitude, y: latitude } = response.data.documents[0].address;
    setExtra(response.data.documents[0].road_address.building_name)
    setPostCode(response.data.documents[0].road_address.zone_no)
    setCoordinates({ latitude, longitude });
    console.log(postCode)
  } catch (error) {
    console.error(error);
  }
  };
  const handleNameSubmit = (event) => {
    event.preventDefault();
    
    setUser(() => ({
        name:editedName.name,
        phone:editedName.phone,
        company: {

        name:editedName.companyName,
        email:editedName.companyEmail,
        phone:editedName.companyPhone,
    
        address: {
        
            name:address,
            postCode:postCode,
            extra:extra,
            detail:editedName.companyAdressDetail,
            location_x:coordinates.longitude,
            location_y:coordinates.latitude,  
        },},   
    }));
    console.log(editedName)
    console.log(user)
    onUserPut1(user)};
return (
  <>
  
      <Row>
        <Col lg={3}>
    <div className='padding'>
    <div className='mypage_navigate_header'>
      <h1 className='mypage_navigate_header_name'>MY PAGE</h1>
    </div>
    <h2>MY</h2>
    <div className='mypage_navigate'>
    <p>내정보</p>
      <button onClick={()=>{navigate('/mylist')}}>내 상품 리스트</button>
    </div>
  </div>
        </Col>
        <Col lg={9}>
  <form onSubmit={handleNameSubmit}>
  
  <Table striped bordered hover className='tables'>
      <thead>
        <h1>내정보</h1>
        <tr>
          <th colSpan={2}>내정보</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>이름</td>
          <td>
          <label>{user.name} </label>
          
          <input className='mypage_input'   name='name' onChange={handleNameChange}></input>
          
          
          </td>
         
        </tr>
        <tr>
          <td>전화번호</td>
          <td>
          <div>
            <label>{user.phone} </label>
            <input name='phone' className='mypage_input' onChange={handleNameChange} ></input>
            </div>
          </td>
          
        </tr>
        
      </tbody>
    </Table>
    
    <Table striped bordered hover className='tables'>
      <thead>
        <div className='mypage_edit'>
        <h1>사업자 정보</h1>
        
        </div>
      
        <tr>
          <th colSpan={2}>사업자 정보</th>
         
        </tr>
      </thead>
      <tbody>
        
        <tr>
          <td>사업장 이름</td>
          <td>
          <label> {user.company.name} </label>
          <input name='companyName' className='mypage_input' onChange={handleNameChange}></input>
          </td>
         
        </tr>
        <tr>
          <td>사업장 주소 </td>
          <td>
          <div>
            <label> {user.company.address.name} , {user.company.address.detail}</label>
            
            <div className='mapage_address_wrap'>
            <label>주소 : </label>
            <input  value={address} className='mypage_address_input' onChange={handleAddressChange} ></input>
            <label>상세주소 : </label>
            <input name='companyAdressDetail'className='mypage_input' onChange={handleNameChange}></input>
            <p onClick={handle.clickButton} className='MyPage_Location_btn'><HiLocationMarker/></p>
            <div>
        
          
          </div>
          {openPostcode && 
              <DaumPostcode 
                  onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                  autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                  />}
        
      </div>
            </div>
          </td>
          
        </tr>
        <tr>
          <td>사업장 이메일 </td>
          <td>
          <div>
          <label> {user.company.email} </label>
          <input name='companyEmail' className='mypage_input' onChange={handleNameChange} ></input>
          </div>
          </td>
          
        </tr>
        <tr>
          <td>사업장 번호 </td>
          <td>
          <div>
          <label>사업장 번호 : {user.company.phone}</label>
          <input name='companyPhone' className='mypage_input' onChange={handleNameChange} ></input>
          </div>
          </td>
          
        </tr>
      </tbody>
     
    </Table>
    <button className='mypage_edit_btn'>수정하기</button>
  
    
   
  </form>
  
        </Col>
      </Row>
   
  
  
  
  


   
  </>
)
}
