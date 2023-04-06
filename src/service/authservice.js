import axios from "axios";
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

const signIn = async ({ token }) => {
  const response = await axios.post(
    `${PROXY}/auth`,
    {},
    {
      headers: { Authorization: `${token}` },
      withCredentials: true,
    }
  );
  return response.data;
};

export const onGetMyInfo = async () => {
  const response = await axios.get(`${PROXY}/users/me`);
  return response.data
  
};

export const onUserPut1 = async (editedName) => {
  const responsePut1 = await axios.put(
    `${PROXY}/users/me`,
    {
      "name":editedName.name,
    "phone": editedName.phone ,
    "company": {
        "name": editedName.companyName,
        "email": editedName.companyEmail,
        "phone": editedName.companyPhone,
        "address": {
            "name":null ,
            "post_code":editedName.postCode,
            "address":editedName.address,
            "extra":editedName.extra,
            "detail":editedName.companyAdressDetail,
            "location_x":editedName.coordinates.longitude,
            "location_y":editedName.coordinates.latitude,
        }
    },
    },

    {
      withCredentials: true,
    },
   
  );
  return responsePut1.data
};

const signOut = async () => {
  const response = await axios.delete(`${PROXY}/auth`, {
    withCredentials: true,
  });
  return response;
};

const AuthService = { signIn, signOut ,onGetMyInfo ,onUserPut1 };

export default AuthService;
