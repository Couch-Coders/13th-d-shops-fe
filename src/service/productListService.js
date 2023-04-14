import axios from "axios";
const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

// 20230326 by jay 전체 상품 목록 가져오기
const getProduct = async () => {
  const response = await axios.get(
    `${PROXY}/products?page=0&size=100&order=seq desc`
  );
  return response.data;
};

// 20230326 jay 품목 검색
const getProductSearch = async (keyword) => {
  const response = await axios.get(`${PROXY}/products/search/` + keyword);
  return response.data;
};

const ProductListService = { getProduct, getProductSearch };

export default ProductListService;
