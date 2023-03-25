import axios from "axios";

export const onProductPut1 = async (inputs) => {
  const responsePut1 = await axios.post("/users/me/products", {
    name: "name",
    title: "title",
    options: "optoins",
    description: "inputs.description",
    location_x: 126.777966,
    location_y: 37.366536,
  });
  console.log(responsePut1.data);

  const response1 = await axios.get("/products");
  console.log(response1.data);
};
