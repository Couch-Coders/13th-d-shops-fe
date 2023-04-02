import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../service/productService";
import { myInfoThunk } from "../stores/myInfoSlice";
import { Image } from 'antd';
import axios from "axios";



const Product = () => {
  const { id } = useParams();
  console.log("id", id);

  const [product, setProduct] = useState({});
  const [file,setFile] = useState();
  const [inputs, setInputs] = useState({});

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const my = useSelector((state)=>state.myInfo.myInfo)
  useEffect(()=>{
    dispatch(myInfoThunk())
  },[])

  const handleChange = (e) => {
    const { name, value ,files } = e.target;
    setProduct((product) => ({ ...product, [name]: value }));
    setFile(files &&  files[0])
  };

  const onfileupload = async (event) => {
    const formData = new FormData();
    formData.append("files", event.target.files[0]);
    try {
      const response = await axios.post(`/products/1/images`, formData, {
        headers: {
          "Contest-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response.data);
      console.log("성공");
    } catch (e) {
      console.log(e);
    }
  };

 

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    const result = await ProductService.postProduct(product,my);
    console.log("result", result);
    setProduct({});
    if(window.confirm("상품을 더 등록 하시겠습니까?"))
    {}
    else
    {
      navigate(`/products/${result.seq}`)
    }
    
  };
  const handleSubmitPut = async (e) => {
    e.preventDefault();

    const result = await ProductService.putProduct(product);
    console.log("result", result);
    alert(" 수정 되었습니다.")
  };

  const handleSubmitDelete = async (e) => {
    e.preventDefault();
    console.log("product.seq", product.seq);
    const result = await ProductService.deleteProduct(product.seq);
    console.log("result", result);
    setProduct({});
    alert("삭제 되었습니다.")
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
      <div className="Product_top_title"><h2>상품 등록/수정</h2></div>
      
      <form onSubmit={handleSubmitPost}>
        <div className="product">
        <div className="product_title_box">
          <div className="title"> <strong> 노출 상품명 </strong> </div>
          <input 
          type='text'
          name='title'
          value={product.title ??  ''}
          required
          onChange={handleChange}
          className="product_title_name" placeholder="노출 상품명 입력(제품명 + 브랜드명 )"></input>
          <p style={{color:"blue"}}> 실제 판매 페이지에 노출되는 상품명 입니다. d-shops의 기준에 맞게 변동될 수 있습니다.</p>
        </div>
        
        <div className="product_title_des_box">
          <div  className="title"><strong>상세설명</strong> </div>
          <textarea className="product_des"
          placeholder="상세 내용을 적어주세요"
          type="text"
          name="description"
          value={product.description ?? ""}
          onChange={handleChange}
          ></textarea>
        </div> 

        <div>
          <div className="product_title_img_box">
            <div className="title"><strong>대표이미지</strong> </div>
            <div className="product_img_wrap">
            {file ? 
            <div className="product_title_images"> 
            <div className="image_box">
            <img  src={URL.createObjectURL(file)} alt="local file" onChange={handleChange} className="images"/>
            </div>
            </div>
            : <Image 
                className="product_add_img"
                width={300}
                height={300}
                src="error"
                fallback="data:image/png;base64,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"
              /> }
               
            </div>
              <div className='choosebox'>
                <label for='chooseFile' className="imgadd_btn">이미지 URL 주소로 등록 </label>
              </div>
             
              <input 
              type="file" 
              name='file'
              id="chooseFile" 
              required accept="image/*" 
              style={{border: "solid 1px lightgray", borderRadius: "5px",}}
              onChange={handleChange}
              />
            <p> 크기 최대 500 x 500 사이즈를 권장 합니다.</p>
          
            <div>
              
            </div>
          </div>
        </div>
        <div className="product_title_option_box">
        <div className="product_title_option">
          <div className="title"><strong> 옵션</strong></div>
          <input 
          className="product_title_name"
          placeholder="옵션명을 입력해 주세요"
          type="text"
          name="options"
          value={product.options ?? ""}
          onChange={handleChange}></input>
        </div>
        </div>
        <div className="product_btns">
        <button className="productbtn" onClick={handleSubmitPost}>등록</button>
        <button className="productbtn" onClick={handleSubmitPut}>수정</button>
        <button className="productbtn" onClick={handleSubmitDelete}>삭제</button>
        </div>
        </div>
        
      </form>
    </div>
  );
};

export default Product;
