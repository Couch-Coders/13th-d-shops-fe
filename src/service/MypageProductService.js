import axios from "axios"

const getMyProduct = async () =>{
  const response= await axios.get("/users/me/products");
  return response.data;
}


const deleteProduct = async (seq) => {
  const response = await axios.delete("/users/me/products/" + seq);
  console.log(response.data);
  return response.data;
};

const MypageProductService = {getMyProduct ,deleteProduct}
export default MypageProductService;