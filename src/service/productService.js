import axios from "axios";
// 20230326 jay 품목 등록
export const onProductPost = async (inputs) => {
  const responsePost = await axios.post("/users/me/products", {
    title: inputs.title,
    options: inputs.options,
    description: inputs.description,
    //이건 내정보에서 가져오기
    location_x: 126.777966,
    location_y: 37.366536,
  });
  console.log(responsePost.data);

  //받아온 자료 확인하기
  const responseGet = await axios.get("/products/" + responsePost.data.seq);
  console.log(responseGet.data);
};

// 20230326 jay 품목 읽기
export const onProductGet = async (inputs) => {
  const response = await axios.get("/products/" + inputs.seq);
  console.log(response.data);
  inputs.seq = response.data.seq;
  inputs.title = response.data.title;
  inputs.options = response.data.options;
  inputs.description = response.data.description;
  inputs.location_x = response.data.location_x;
  inputs.location_y = response.data.location_y;
};

// 20230326 jay 품목 수정
export const onProductPut = async (inputs) => {
  const response = await axios.put("/users/me/products/" + inputs.seq, {
    name: inputs.name,
    title: inputs.title,
    options: inputs.options,
    description: inputs.description,
  });
  console.log(response.data);
};

// 20230326 jay 품목 삭제
export const onProductDelete = async (inputs) => {
  const response = await axios.delete("/users/me/products/" + inputs.seq);
  console.log(response.data);
};
