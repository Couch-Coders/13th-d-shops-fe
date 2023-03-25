import axios from "axios";

export const onProductPut1 = async (inputs) => {
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
