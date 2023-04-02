import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../service/productService";
import { myInfoThunk } from "../stores/myInfoSlice";


const Product = () => {
  const { id } = useParams();
  console.log("id", id);
  const [product, setProduct] = useState({});
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const my = useSelector((state)=>state.myInfo.myInfo)
  useEffect(()=>{
    dispatch(myInfoThunk())
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setInputs((inputs) => ({ ...inputs, [name]: value }));
    setProduct((product) => ({ ...product, [name]: value }));
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

    // <div>
    //   <div><h2>상품 등록/수정</h2></div>
    //   <form>
    //     <div>
    //       <div>노출 상품명</div>
    //       <input></input>
    //     </div>
        
    //     <div>
    //       <div>상세설명</div>
    //       <textarea></textarea>
    //     </div>

    //     <div>
    //       <div>
    //         <h5>대표이미지 추가</h5>
    //         <div>
    //           {file ? <img src={URL.createObjectURL(file)} className='mainimg' name='file' alt='local file' /> : 
    //             <Image
    //             width={200}
    //             height={200}
    //             src="error"
    //             fallback="data:image/png;base64,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"
    //           /> }
            
    //           <div className='choosebox'>
    //             <label for='chooseFile' className="imgadd_btn">이미지 URL 주소로 등록 </label>
    //           </div>
    //           <input type="file" 
    //           name='file'
    //           id="chooseFile" 
    //           required accept="image/*" 
    //           style={{border: "solid 1px lightgray", borderRadius: "5px"}}
    //           onChange={handleChange}
    //           />
    //         </div>
    //         <div>
              
    //         </div>
    //       </div>
    //     </div>
    //   </form>
    //</div>
  );
};

export default Product;
