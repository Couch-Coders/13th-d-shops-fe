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


export default function MyPage() {

//경도 위도

 
  const [coordinates, setCoordinates] = useState({});
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleConvertAddress = async () => {
 
  };



// 우편번호
 
    /**
     * useState
     */
    const [openPostcode, setOpenPostcode] = React.useState(false);
    const [address,setAddress] = useState()
    /**
     * handler
     */
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
  
 


  const handleNameChange = async(event) => {

    const {name , value}= event.target;
    setEditedName((editedName)=>({...editedName, [name] : value}))
    console.log(editedName)
    
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

      console.log(response.data.documents[0])
      setCoordinates({ latitude, longitude });
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
              location_x:coordinates.longitude,
              location_y:coordinates.latitude
          },
      
          },
         
      }));
      console.log(user)
      onUserPut1(user)
     
      
      };
     


  return (
    <>
    
   
    
    <form onSubmit={handleNameSubmit}>
     
    <div>{my && my.email}</div>
    <div>
    <div>이름 : {my ? my.name : '' }</div>
    <input name='name' onChange={handleNameChange}></input>
    </div>
    <div>
    <div>전화번호 : {my ? my.phone : ''}</div>
    <input name='phone' onChange={handleNameChange} ></input>
    </div>
    <div>
    <div>사업자명 : {my ? my.company?.name : ''}</div>
    <input name='companyName' onChange={handleNameChange} ></input>
    </div>
    <div>
    <div>사업자주소 : {my ? my.company?.address.name : ''}</div>
    <input name='companyAdress' value={address} onChange={handleAddressChange} ></input>
    </div>
    <div>
    <div>사업자 이메일 : {my ? my.company?.email : ''}</div>
    <input name='companyEmail' onChange={handleNameChange} ></input>
    </div>
    <div>
    <div>사업자 번호 : {my ? my.company?.phone : ''}</div>
    <input name='companyPhone' onChange={handleNameChange} ></input>
    </div>
     
      
    
      

      <button >수정</button>
      {/* 우편번호 */}
      <div>
            
            <div>{address}</div>
           <button onClick={handle.clickButton }>toggle</button>

           {openPostcode && 
               <DaumPostcode 
                   onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                   autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                   defaultQuery='판교역로 235' // 팝업을 열때 기본적으로 입력되는 검색어 
                   />}
          
       </div>
   </form>
   <div>
        

       
 
      </div>

    </>
  )
}
