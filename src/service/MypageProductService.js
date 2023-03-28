import axios from "axios"

const getMyProduct = async () =>{
  const response= await axios.get("/users/me/products");
  return response.data;
}
const MypageProductService = {getMyProduct}
export default MypageProductService;