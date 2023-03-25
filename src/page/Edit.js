import React, { useState } from "react";
import { onProductPut1 } from "../service/productService";

export default function Edit() {
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onProductPut1(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>{/* <img></img> */}</div>
        <div>
          <div>옵션</div>
          <input
            type="text"
            name="options"
            value={inputs.options ?? ""}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <p>글제목</p>
          <input
            type="text"
            name="title"
            value={inputs.title ?? ""}
            onChange={handleChange}
          ></input>
          <p> 내용</p>
          <input
            type="text"
            name="description"
            value={inputs.description ?? ""}
            onChange={handleChange}
          ></input>
        </div>
      </div>
      <button>등록</button>
    </form>
  );
}
