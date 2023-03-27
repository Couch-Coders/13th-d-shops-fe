import axios from "axios";
// 20230326 jay 품목 등록
const postProduct = async (product) => {
  const responsePost = await axios.post("/users/me/products", {
    title: product.title,
    options: product.options,
    description: product.description,
    //이건 내정보에서 가져오기
    location_x: 126.777966,
    location_y: 37.366536,
  });
  return responsePost.data;
  // console.log(responsePost.data);
  //받아온 자료 확인하기
  // const responseGet = await axios.get("/products/" + responsePost.data.seq);
  // console.log(responseGet.data);
};

// 20230326 jay 품목 읽기
const getProduct = async (seq) => {
  const response = await axios.get("/products/" + seq);
  // console.log(response.data);
  // inputs.seq = response.data.seq;
  // inputs.title = response.data.title;
  // inputs.options = response.data.options;
  // inputs.description = response.data.description;
  // inputs.location_x = response.data.location_x;
  // inputs.location_y = response.data.location_y;
  return response.data;
};

// 20230326 jay 품목 수정
const putProduct = async (product) => {
  const response = await axios.put("/users/me/products/" + product.seq, {
    name: product.name,
    title: product.title,
    options: product.options,
    description: product.description,
  });
  // console.log(response.data);
  return response.data;
};

// 20230326 jay 품목 삭제
const deleteProduct = async (seq) => {
  const response = await axios.delete("/users/me/products/" + seq);
  // console.log(response.data);
  return response.data;
};

const ProductService = { postProduct, getProduct, putProduct, deleteProduct };

export default ProductService;
