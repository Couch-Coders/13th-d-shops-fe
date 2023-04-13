import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../service/productService";
import { myInfoThunk } from "../stores/myInfoSlice";
import axios from "axios";
import productSlice, {
  productThunk,
  productUpdateThunk,
} from "../stores/productSlice";

const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [imageFile, setImageFile] = useState();
  const [imageSrc, setImageSrc] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(myInfoThunk());
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setImageFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
    console.log("handleChange", product);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    console.log("handleSubmitPost.product", product);
    const result = await ProductService.postProduct(product);
    // onfileupload(result.seq);
    console.log("handleSubmitPost.result", result);
    setProduct(result);
    // 20230413 jay 저장 완료 후
    navigate("/mylist");
  };

  const handleSubmitPut = async (e) => {
    e.preventDefault();
    const result = await ProductService.putProduct(product);
    console.log("handleSubmitPut.result", result);
    //onfileupload(result?.seq, result?.images[0]?.seq);
    alert(" 수정 되었습니다.");
    // 20230413 jay 저장 완료 후
    navigate("/mylist");
  };

  const onNewfileupload = async (event) => {
    let response;
    if (product.images[0]?.seq != null) {
      console.log("no image");
      // 20230413 jay 이미지가 있으면
      // 지워라(여러게 처리하연 지울필요없음)
      console.log("product.image?.seq", product.image?.seq);
      response = await axios.delete(
        `${PROXY}/users/me/products/${product?.seq}/images/${product.images[0]?.seq}`
      );
      console.log("지워라", response.data);
    }

    // 20230413 jay 이미지가 없으면
    // 이미지 업로드하고
    const formData = new FormData();
    formData.append("files", event.target.files[0]);
    try {
      response = await axios.post(
        // "users/me/products/1/images",
        `${PROXY}/users/me/products/${product?.seq}/images`,
        formData,
        {
          headers: {
            "Contest-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log("다시등록", response.data);
      console.log("성공");
      // 20230413 jay 위에 title 입력시 지워지는 문제로
      response.data.title = product.title;
      response.data.description = product.description;
      response.data.options = product.options;
      // 20230413 jay 이미지 다시 보이게 하기위해
      setProduct(response.data);
    } catch (e) {
      console.log(e);
    }
    alert("이미지 등록 완료");
  };

  // const onfileupload = async (seq, imageseq) => {
  //   console.log("onfileupload", seq);
  //   if (imageseq) {
  //     const response1 = await axios.delete(
  //       `${PROXY}/users/me/products/${seq}/images/${imageseq}`
  //     );
  //     console.log(response1);
  //     alert("이미지가 삭제 되었습니다 다시 이미지를 등록해 주세요");
  //   } else {
  //     const formData = new FormData();
  //     formData.append("files", imageFile);
  //     try {
  //       axios.defaults.baseURL = "";
  //       const response = await axios.post(
  //         `${PROXY}/users/me/products/${seq}/images`,
  //         formData,
  //         {
  //           headers: {
  //             "Contest-Type": "multipart/form-data",
  //           },
  //           withCredentials: true,
  //         }
  //       );
  //       console.log(response.data);

  //       console.log("성공");
  //       alert("이미지 등록 완료! ");
  //     } catch (e) {
  //       console.log(e);
  //     }
  //     const file = imageFile;
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);

  //     return new Promise((resolve) => {
  //       reader.onload = () => {
  //         setImageSrc(reader.result || null); // 파일의 컨텐츠
  //         resolve();
  //       };
  //     });
  //   }
  // };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    console.log("product.seq", product.seq);
    const result = await ProductService.deleteProduct(product.seq);
    console.log("result", result);
    setProduct({});
    alert("삭제 되었습니다.");
    // 20230413 jay 저장 완료 후
    navigate("/mylist");
  };

  useEffect(() => {
    // 20230327 jay 로딩시 데이터 늦게 받아오는 문제 해결
    const fetchData = async () => {
      let result;
      let mySeq = id;
      if (!mySeq) {
        console.log("useEffect", "id 없음 새로 만들기");
        // 20230413 jay 신규 임시 저장 먼저 만든다
        // 20230413 jay TODO: 임시 저장 파라메터 및 임시저장 있는지 확인하여
        // 불러올지 지울지 확인하는 부분 필요
        result = await ProductService.postProduct(product);
        console.log("useEffect.result", result);
        // mySeq = result.seq;
      } else {
        result = await ProductService.getProduct(mySeq);
        console.log("useEffect.result", result);
      }
      setProduct(result);
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
    // console.log("값이 설정됨");
    return () => {};
  }, []);

  return (
    <div>
      <div className="Product_top_title">
        <h2>상품 등록/수정</h2>
      </div>
      <form>
        <div className="product">
          <div className="product_title_box">
            <div className="title">
              {" "}
              <strong> 노출 상품명 </strong>{" "}
            </div>
            <input
              type="text"
              name="title"
              value={product.title ?? ""}
              required
              onChange={handleChange}
              className="product_title_name"
              placeholder="노출 상품명 입력(제품명 + 브랜드명 )"
            ></input>
            <p style={{ color: "blue" }}>
              {" "}
              실제 판매 페이지에 노출되는 상품명 입니다. d-shops의 기준에 맞게
              변동될 수 있습니다.
            </p>
          </div>

          <div className="product_title_des_box">
            <div className="title">
              <strong>상세설명</strong>{" "}
            </div>
            <textarea
              className="product_des"
              placeholder="상세 내용을 적어주세요"
              type="text"
              name="description"
              value={product.description ?? ""}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="product_title_option_box">
            <div className="product_title_option">
              <div className="title">
                <strong> 옵션</strong>
              </div>
              <input
                className="product_title_name"
                placeholder="옵션명을 입력해 주세요"
                type="text"
                name="options"
                value={product.options ?? ""}
                onChange={handleChange}
              ></input>
            </div>
          </div>
          <div className="image_wrap">
            {product?.seq ? (
              <div>
                <img className="upload_img" src={product?.images[0]?.url} />
              </div>
            ) : (
              <div>
                {" "}
                <img width={300} src="/image/img.png"></img>
              </div>
            )}

            <label for="upload-file" className="product_img_btn">
              이미지 등록하기{" "}
            </label>

            <div>
              <input
                type="file"
                name="file"
                id="upload-file"
                accept="image/*"
                // onChange={handleChange}
                onChange={onNewfileupload}
                style={{ visibility: "hidden" }}
              />
            </div>
          </div>
          <div className="product_btns">
            {product.seq ? (
              <button className="productbtn" onClick={handleSubmitPut}>
                수정
              </button>
            ) : (
              <button className="productbtn" onClick={handleSubmitPost}>
                저장
              </button>
            )}
            <button className="productbtn" onClick={handleSubmitDelete}>
              삭제
            </button>
          </div>
          <div>
            <label
              className="goproduct"
              onClick={() => navigate(`/products/${product?.seq}`)}
            >
              {" "}
              등록한 상품 보러가기{" "}
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Product;
