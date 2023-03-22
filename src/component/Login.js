import React from 'react'
import signIn from '../service/authservice'
import { googleSignIn } from '../service/firebaseAuth'

export default function Login() {
  return (
    <div>
      <button onClick={googleSignIn}>로그인</button>
    </div>
  )
}
