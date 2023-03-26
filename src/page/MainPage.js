import Carousel from "../component/Carousel";
import React, { useEffect, useState } from "react";
import MainPageService from "../service/MainPageService";
import { Card, List } from "antd";
import { useSelector } from "react-redux";

export default function MainPage() {
  const user = useSelector((state) => state.user.user);
  const [productNear, setProductNear] = useState([]);

  useEffect(() => {
    console.log("user", user);
    // 20230327 jay 로딩시 데이터 늦게 받아오는 문제 해결
    const fetchData = async () => {
      const result = await MainPageService.getProductNear(
        126.977966,
        36.566537
      );
      console.log("result", result);
      setProductNear(result.content);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

    // console.log("product 값이 설정됨");
    return () => {
      // console.log("product 가 바뀌기 전..");
    };
  }, [user]);

  return (
    <div>
      <div>
        <Carousel />
      </div>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={productNear}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>{item.description}</Card>
          </List.Item>
        )}
      />
    </div>
  );
}
