import axios from 'axios'


const signIn = async ({token}) => {
  const response = await axios.post('/auth',{}, {
    headers: { Authorization: `${token}` },
    withCredentials: true,

    
  })

 return response.data
 
}
export const onGetMyInfo = async () => {
  const response1 = await axios.get("/users/me");
   console.log(response1.data);
 };


 export const onUserPut1 = async () => {
  const responsePut1 = await axios.put(
    "/users/me",
    {
      name: "name-1",
      phone: "phone-1",
      company: {
        name: "company-name-1",
        phone: "company-phone-1",
        email: "company-email-1",
        address: {
          name: "company-address-name-1",
        },
      },
    },
    {
      withCredentials: true,
    }
  );
  console.log(responsePut1.data);

  const response1 = await axios.get("/users/me");
  console.log(response1.data);
};

const signOut = async () => {
  const response = await axios.delete('/auth', {
    withCredentials: true,
  })
  return response

}

const AuthService = { signIn, signOut }

export default AuthService


