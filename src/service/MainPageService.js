// 20230326 by jay 전체 상품 목록 서비스
import axios from "axios";

// 20230326 by jay 가까운 상품 목록 가져오기
const getProductNear = async (location_x, location_y) => {
  const response = await axios.get(
    "/products/near?location_x=" +
      location_x +
      "&location_y=" +
      location_y +
      "&page=0&size=5"
  );
  return response.data;
};

const MainPageService = { getProductNear };

export default MainPageService;
