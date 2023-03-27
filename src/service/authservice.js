import axios from "axios";

const signIn = async ({ token }) => {
  const response = await axios.post(
    "/auth",
    {},
    {
      headers: { Authorization: `${token}` },
      withCredentials: true,
    }
  );
  return response.data;
};

export const onGetMyInfo = async () => {
  const response = await axios.get("/users/me");
  return response.data
  
};

export const onUserPut1 = async (user) => {
  const responsePut1 = await axios.put(
    "/users/me",
    {
      "name":user.name,
    "phone": user.phone ,
    "company": {
        "name": user.company.name,
        "email": user.company.email,
        "phone": user.company.phone,
        "address": {
            "name":null ,
            "post_code":user.company.address.postCode,
            "address":user.company.address.name,
            "extra":user.company.address.extra,
            "detail":user.company.address.detail,
            "location_x":user.company.address.location_x,
            "location_y":user.company.address.location_y
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
  const response = await axios.delete("/auth", {
    withCredentials: true,
  });
  return response;
};

const AuthService = { signIn, signOut ,onGetMyInfo ,onUserPut1 };

export default AuthService;
