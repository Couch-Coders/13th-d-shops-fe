
import './App.css';
import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {useDispatch,useSelector} from 'react-redux'
import Login from './component/Login';
import { getUserThunk } from './stores/auth/authSlice';
import { auth } from './service/firebaseAuth';
function App() {
  const user = useSelector((state)=>state)
  console.log(user)

  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken()
        console.log(token)
        dispatch(getUserThunk(token))
      }
    })
    return unsubscribe
  }, [dispatch])
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
