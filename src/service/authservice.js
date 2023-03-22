import axios from 'axios'




const signIn = async ({token}) => {
  const response = await axios.get('/users/me', {
    headers: { Authorization: `${token}` },
    withCredentials: true,

    
  })

 return response.data
 
}


const signOut = async () => {
  const response = await axios.delete('/auth', {
    withCredentials: true,
  })
  return response

}

const AuthService = { signIn, signOut }

export default AuthService


