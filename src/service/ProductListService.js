// 20230326 by jay 전체 상품 목록 서비스
import axios from "axios";

// 20230326 by jay 전체 상품 목록 가져오기
export const onProductListServiceGet = async (inputs) => {
  const response = await axios.get("/products?page=0&size=5&order=seq desc");
  console.log(response.data);
  inputs.data = response.data.content;
  // inputs.seq = response.data.seq;
  // inputs.title = response.data.title;
  // inputs.options = response.data.options;
  // inputs.description = response.data.description;
  // inputs.location_x = response.data.location_x;
  // inputs.location_y = response.data.location_y;
};
