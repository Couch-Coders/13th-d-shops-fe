import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import signIn, { onGetMyInfo, onUserPut1 } from '../service/authservice'
import { googleSignIn, googleSignOut } from '../service/firebaseAuth'
import User from './User'

export default function Login() {

    const user = useSelector((state)=>state.user.user)
  const handleLogin = ()=>{
    googleSignIn()
  }
  const handleLogout = ()=>{
    googleSignOut()
  }
  return (
    <div className='header_right'>
      <Link to='/products' className='product_list_text'>상품목록</Link>
      {user && <User user={user}/>}
      {user && <button className='login_btn' onClick={googleSignOut}>로그아웃</button>}
      {!user && <button className='login_btn' onClick={googleSignIn}>로그인</button>}
      
    </div>
  )
}
