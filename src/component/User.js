import React from 'react'
import { Link } from 'react-router-dom'
import { BsFillPencilFill} from 'react-icons/bs';

export default function User({user:{photoURL,displayName}}) {
  
  return (
    <div className='login_userMenu'>
    <Link to='/edit' className='edit'><BsFillPencilFill/></Link>
    <Link to='mypage' className='username'>{displayName}</Link>
    <Link to='mypage'><img className='photoURL' src={photoURL}></img></Link>
    </div>
  )
}
