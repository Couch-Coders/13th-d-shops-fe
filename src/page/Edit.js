import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../service/productService";

const Edit = () => {
  const { id } = useParams();
  console.log("id", id);
  const [product, setProduct] = useState({});

  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    // setInputs((inputs) => ({ ...inputs, [name]: value }));
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmitPost = async (e) => {
    e.preventDefault();

    const result = await ProductService.postProduct(product);
    console.log("result", result);
    setProduct({});
  };
  const handleSubmitPut = async (e) => {
    e.preventDefault();

    const result = await ProductService.putProduct(product);
    console.log("result", result);
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    console.log("product.seq", product.seq);
    const result = await ProductService.deleteProduct(product.seq);
    console.log("result", result);
    setProduct({});
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();

    const result = await ProductService.getProduct(product.seq);
    console.log("result", result);
    setProduct(result);
  };

  useEffect(() => {
    // // 20230327 jay 로딩시 데이터 늦게 받아오는 문제 해결
    const fetchData = async () => {
      if (!id) {
        console.log("id 없음");
        return;
      }

      const result = await ProductService.getProduct(id);
      console.log("result", result);
      setProduct(result);
      // console.log("product.title", product.title);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
    // console.log("값이 설정됨");
    return () => {
      //   console.log("가 바뀌기 전..");
    };
  }, []);

  return (
    <div>
      <p>현재 페이지의 파라미터는 {id} 입니다.</p>

      <div>
        <div>product</div>
        <input
          type="text"
          name="seq"
          value={product.seq ?? ""}
          onChange={handleChange}
        ></input>
        <button onClick={handleSubmitButton}>불러오기</button>
        <div>
          <form onSubmit={handleSubmitPut}>
            <div>
              <div>{/* <img></img> */}</div>
              <div>
                <div>옵션</div>
                <input
                  type="text"
                  name="options"
                  value={product.options ?? ""}
                  onChange={handleChange}
                ></input>
              </div>
              <div>
                <p>글제목</p>
                <input
                  type="text"
                  name="title"
                  value={product.title ?? ""}
                  onChange={handleChange}
                ></input>
                <p> 내용</p>
                <input
                  type="text"
                  name="description"
                  value={product.description ?? ""}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <button onClick={handleSubmitPost}>등록</button>
            <button onClick={handleSubmitPut}>수정</button>
            <button onClick={handleSubmitDelete}>삭제</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
