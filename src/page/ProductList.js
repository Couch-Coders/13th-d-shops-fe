import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onProductListServiceGet } from "../service/ProductListService";
import { Card, List } from "antd";

const data = [
  {
    title: "Title 1",
  },
  {
    title: "Title 2",
  },
  {
    title: "Title 3",
  },
  {
    title: "Title 4",
  },
  {
    title: "Title 5",
  },
  {
    title: "Title 6",
  },
];

export default function ProductList({ product }) {
  // let { params } = useParams();
  // console.log(params);
  // const [inputs, setInputs] = useState({});
  // const handleChange = (e) =>
  //   const { name, value } = e.target;
  //   setInputs((inputs) => ({ ...inputs, [name]: value }));
  // };
  const [inputs, setInputs] = useState({});
  useEffect(() => {
    onProductListServiceGet(inputs);
    console.log("inputs", inputs);
    console.log("data", data);

    console.log("product 값이 설정됨");
    console.log(inputs);
    return () => {
      console.log("product 가 바뀌기 전..");
      console.log(inputs);
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
