import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DaumPost from '../component/DaumPost'
import { onUserPut1 } from '../service/authservice'
import { myInfoThunk } from '../stores/auth/myInfoSlice'

export default function MyPage() {

  const dispatch = useDispatch()
  const [editedName, setEditedName] = useState({});
  const [user, setUser] = useState({
    "name": "name-1",
    "phone": "phone-1",
    "company": {
        "name": "company-name-1",
        "email": "company-email-1",
        "phone": "company-phone-1",
        "address": {
            "seq": 1,
            "name": " ",
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
  useEffect(()=>{
    dispatch(myInfoThunk())
  },[])

  
  const handleNameChange = (event) => {
    const {name , value}= event.target;
    setEditedName((editedName)=>({...editedName, [name] : value}))
    console.log(editedName)
    
    };
    const handleNameSubmit = (event) => {
      event.preventDefault();
      
      setUser((prevUser) => ({
          ...prevUser,
          name:editedName.name,
          phone:editedName.phone,
          company: {
          ...prevUser.company,
          name:editedName.companyName,
          email:editedName.companyEmail,
          phone:editedName.companyPhone,

          address: {
              ...prevUser.company.address,
              name: editedName.address,
                     
          },
      
          },
      }));
      
      
      console.log(user)
      onUserPut1(user)
      };
  return (
    <>
    <div>{my && my.email}</div>
    <div>이름 : {user.name}</div>
    <div>전화번호 : {user.phone}</div>
    <div>사업자명 : {user.company.name}</div>
    <div>사업자주소 : {user.company.address.address}</div>
    <div>사업자 이메일 : {user.company.email}</div>
    <div>사업자 번호 : {user.company.phone}</div>
    <form onSubmit={handleNameSubmit}>
      <input name='name' onChange={handleNameChange}></input>
      <input name='phone' onChange={handleNameChange}></input>
      <input name='address' onChange={handleNameChange}></input>
      <input name='companyEmail' onChange={handleNameChange}></input>
      <input name='companyName' onChange={handleNameChange}></input>
      <input name='companyPhone' onChange={handleNameChange}></input>
      
      <button>수정</button>
      <DaumPost user={user}/>
   </form>
    </>
  )
}
