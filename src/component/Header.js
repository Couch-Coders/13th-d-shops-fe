import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import { SearchOutlined } from '@ant-design/icons';
export default function Header() {
  return (
    <div className='header'>
      <Link to='/'>
        <img width={200} src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FV8fHf%2Fbtr4PqndKIw%2F4BziaW30wr6i7g60T4z7PK%2Fimg.png'></img>
      </Link>
      <div className='header_inputBox'>
        <input className='header_input' type='text' placeholder='상품을 검색해 주세요'></input>
        <div className='Search'><SearchOutlined /></div>
      </div>
      <div className='header_right'>
    
        <div className='Login_btn'><Login/></div>
      </div>
    </div>
  )
}
