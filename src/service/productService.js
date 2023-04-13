import axios from "axios";
const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

export const onGetMyProduct = async () => {
  const response = await axios.get(`${PROXY}/users/me/products`);
  return response.data
  
};


// 20230326 jay 품목 등록
export const postProduct = async (product) => {
  console.log(product)
  const responsePost = await axios.post(
    `${PROXY}/users/me/products`, 
    {
    "title": product.title,
    "options":  product.options,
    "description":  product.description,
    // "images":product.imageFiles
    // "company": {
    //   "name": my.company.name,
    //   "email": my.company.email,
    //   "phone": my.company.phone,
    //   "address": {
    //       "name":null ,
    //       "post_code":my.company.address.post_code,
    //       "address":my.company.address.address,
    //       "extra":my.company.address.extra,
    //       "detail":my.company.address.detail,
    //       "location_x":my.company.address.location_x,
    //       "location_y":my.company.address.location_y,
    //   },
    // }
//  },
    
  },
  {
    withCredentials: true,
  },
  );

return responsePost.data
  // return responsePost.data;
 
  //받아온 자료 확인하기
  // const responseGet = await axios.get("/products/" + responsePost.data.seq);
  // console.log(responseGet.data);
};

export const imageDate = async (file,seq)=>{
  
}



// 20230326 jay 품목 읽기
export const getProduct = async (seq) => {
  const response = await axios.get(`${PROXY}/products/` + seq);
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
  const response = await axios.put(`${PROXY}/users/me/products/` + product.seq, {
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
  const response = await axios.delete(`${PROXY}/users/me/products/` + seq);
  // console.log(response.data);
  return response.data;
};




const ProductService = {onGetMyProduct, postProduct, getProduct, putProduct, deleteProduct};

export default ProductService;
