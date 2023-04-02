import axios from "axios";
// 20230326 jay 품목 등록
const postProduct = async (product,my) => {
  console.log(my)
  const responsePost = await axios.post("/users/me/products", {
    title: product.title,
    options: product.options,
    description: product.description,
    "company": {
      "name": my.company.name,
      "email": my.company.email,
      "phone": my.company.phone,
      "address": {
          "name":null ,
          "post_code":my.company.address.post_code,
          "address":my.company.address.address,
          "extra":my.company.address.extra,
          "detail":my.company.address.detail,
          "location_x":my.company.address.location_x,
          "location_y":my.company.address.location_y,
      }
  },
    
  });
  return responsePost.data;
 
  //받아온 자료 확인하기
  // const responseGet = await axios.get("/products/" + responsePost.data.seq);
  // console.log(responseGet.data);
};

const onfileupload = async (file) => {
  console.log(file)
  const formData = new FormData();
  formData.append("files",file );
  try {
    const response = await axios.post(`/products/1/images`, formData, {
      headers: {
        "Contest-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log(response.data);
    console.log("성공");
  } catch (e) {
    console.log(e);
  }
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

const ProductService = { postProduct, getProduct, putProduct, deleteProduct,onfileupload };

export default ProductService;
