import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import signIn, { onGetMyInfo, onUserPut1 } from '../service/authservice'
import { googleSignIn, googleSignOut } from '../service/firebaseAuth'
import User from './User'

export default function Login() {
  const [user,setUser] = useState()
  const handleLogin = ()=>{
    googleSignIn().then(setUser)
  }
  const handleLogout = ()=>{
    googleSignOut().then(setUser)
  }
  return (
    <div className='header_right'>
      <Link to='/products' className='product_list_text'>상품목록</Link>
      {user && <User user={user}/>}
      {user && <button className='login_btn' onClick={handleLogout}>로그아웃</button>}
      {!user && <button className='login_btn' onClick={handleLogin}>로그인</button>}
      {/* <button onClick={onGetMyInfo}>내정보</button>
      <button onClick={onUserPut1}>수정</button> */}
    </div>
  )
}
