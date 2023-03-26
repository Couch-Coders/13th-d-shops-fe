// 20230326 by jay 전체 상품 목록 서비스
import axios from "axios";

// 20230326 by jay 전체 상품 목록 가져오기
export const onProductListServiceGet = async (inputs) => {
  const response = await axios.get("/products?page=0&size=5&order=seq desc");
  inputs.data = response.data;
};

// 20230326 jay 품목 검색
export const onProductListSearchGet = async (inputs) => {
  const response = await axios.get("/products/search/" + inputs.k);
  inputs.search = response.data;
};
