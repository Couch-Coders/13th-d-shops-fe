import axios from "axios";


export const onProductPut1 = async (inputs) => {
  const responsePut1 = await axios.post(
    "/products",
    {
      name:inputs.name,
      options:inputs.option,
      description:inputs.description,
      image: {
        name: "products-image-name",
        url: "products-image-url",
      },

      user_seq: 1,
    }
    // {
    //   withCredentials: true,
    // }
  );
  console.log(responsePut1.data);

  const response1 = await axios.get("/products");
  console.log(response1.data);
};