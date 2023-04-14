import axios from "axios";
const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

const getMyProduct = async () => {
  const response = await axios.get(`${PROXY}/users/me/products`);
  return response.data;
};

const deleteProduct = async (seq) => {
  const response = await axios.delete(`${PROXY}/users/me/products/` + seq);
  console.log(response.data);
  return response.data;
};

const MypageProductService = { getMyProduct, deleteProduct };
export default MypageProductService;
