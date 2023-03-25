import React, { useState } from "react";
import {
  onProductPost,
  onProductGet,
  onProductPut,
  onProductDelete,
} from "../service/productService";
import { useParams } from "react-router-dom";

export default function Edit() {
  let { params } = useParams();
  console.log(params);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  const handleSubmitPost = (e) => {
    e.preventDefault();
    onProductPost(inputs);
  };
  const handleSubmitPut = (e) => {
    e.preventDefault();
    onProductPut(inputs);
  };

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    onProductDelete(inputs);
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    onProductGet(inputs);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmitPost}>
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
      </div>
      <div>
        <div>seq</div>
        <input
          type="text"
          name="seq"
          value={inputs.seq ?? ""}
          onChange={handleChange}
        ></input>
        <button onClick={handleSubmitButton}>
          불러오기후 화면뿌리기 해주세요
        </button>
        <button onClick={handleSubmitDelete}>삭제</button>
      </div>
      <div>
        <form onSubmit={handleSubmitPut}>
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
          <button>수정</button>
        </form>
      </div>
    </div>
  );
}
