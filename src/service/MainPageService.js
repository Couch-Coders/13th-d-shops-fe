// 20230326 by jay 전체 상품 목록 서비스
import axios from "axios";

// 20230326 by jay 가까운 상품 목록 가져오기
export const onProductNearListServiceGet = async (inputs) => {
  const response = await axios.get(
    "/products/near?location_x=126.977966&location_y=36.566537&page=0&size=5"
  );
  console.log("onProductNearListServiceGet", response.data);
  inputs.data = response.data.content;
};
