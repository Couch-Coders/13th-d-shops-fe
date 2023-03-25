import axios from 'axios'


const signIn = async ({token}) => {
  const response = await axios.post('/auth',{}, {
    headers: { Authorization: `${token}` },
    withCredentials: true,
  })
  return response.data
}

export const onGetMyInfo = async () => {
  const response = await axios.get("/users/me");
  return response.data
};

export const onUserPut1 = async () => {
  const responsePut1 = await axios.put(
    "/users/me",
    {
      "name": "",
      "phone": "",
      "company": {
    "name": "",
    "email": "",
    "phone": "",
    "address": {
        "name": null,
        "post_code": null,
        "address": null,
        "extra": null,
        "detail": null,
        "location_x": null,
        "location_y": null
    },
  }
},
    {
      withCredentials: true,
    }
  );
  console.log(responsePut1.data);

  const response1 = await axios.get("/users/me");
  console.log(response1.data)
};

const signOut = async () => {
  const response = await axios.delete('/auth', {
    withCredentials: true,
  })
  return response

}

const AuthService = { signIn, signOut }

export default AuthService


