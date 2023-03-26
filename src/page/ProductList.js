import React, { useEffect, useState } from "react";
import { onProductListServiceGet } from "../service/ProductListService";
import { Card, List } from "antd";

export default function ProductList() {
  const [inputs, setInputs] = useState({});
  useEffect(() => {
    onProductListServiceGet(inputs);
    console.log("inputs", inputs);

    // console.log("product 값이 설정됨");
    // console.log(inputs);
    return () => {
      // console.log("product 가 바뀌기 전..");
      // console.log(inputs);
    };
  }, [inputs]);

  return (
    <div>
      <div>ProductList</div>

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
        dataSource={inputs.data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>{item.description}</Card>
          </List.Item>
        )}
      />
    </div>
  );
}
