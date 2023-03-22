import React from 'react'
import signIn, { onGetMyInfo, onUserPut1 } from '../service/authservice'
import { googleSignIn } from '../service/firebaseAuth'

export default function Login() {
  return (
    <div>
      <button onClick={googleSignIn}>로그인</button>
      <button onClick={onGetMyInfo}>내정보</button>
      <button onClick={onUserPut1}>수정</button>
    </div>
  )
}
