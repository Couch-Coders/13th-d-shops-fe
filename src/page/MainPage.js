import Carousel from "../component/Carousel";
import React, { useEffect, useState } from "react";
import MainPageService from "../service/mainPageService";
import { Card, List ,Descriptions} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { myInfoThunk } from "../stores/myInfoSlice";
import ProductListService from "../service/productListService";

const { Meta } = Card;

export default function MainPage() {
  const navigate  = useNavigate()
  const user = useSelector((state) => state.user.user);
  const [productNear, setProductNear] = useState([]);
  const [userLocation, setUserLocation] = useState({
    latitude: 33.450701,
    longitude: 126.570667,
  });

  const dispatch = useDispatch()

  const [product,setProduct] = useState()

  useEffect(() => {
    // 20230327 jay 현재 위치 받아오기
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=d25f19cf0a1860dd105275f8a970b86d&libraries=services";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // // 지도
          // var mapContainer = document.getElementById("map"), // 지도를 표시할 div
          //   mapOption = {
          //     center: new window.kakao.maps.LatLng(
          //       userLocation.latitude,
          //       userLocation.longitude
          //     ), // 지도의 중심좌표
          //     level: 3, // 지도의 확대 레벨
          //   };

          // var map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

          // var iwContent = '<div style="padding:5px;">내위치</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          //   iwPosition = new window.kakao.maps.LatLng(
          //     userLocation.latitude,
          //     userLocation.longitude
          //   ), //인포윈도우 표시 위치입니다
          //   iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

          // // 인포윈도우를 생성하고 지도에 표시합니다
          // var infowindow = new window.kakao.maps.InfoWindow({
          //   map: map, // 인포윈도우가 표시될 지도
          //   position: iwPosition,
          //   content: iwContent,
          //   removable: iwRemoveable,
          // });

          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log("userLocation", userLocation);
        },
        (error) => {
          console.log(error);
        }
      );
    };
    console.log("userLocation", userLocation);
    console.log("user", user);
    // 20230327 jay 로딩시 데이터 늦게 받아오는 문제 해결
    const fetchData = async () => {
      const result = await MainPageService.getProductNear(
        userLocation.longitude,
        userLocation.latitude
      );
      console.log("result", result);
      setProductNear(result.content);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

    // console.log("product 값이 설정됨");
    return () => {
      // console.log("product 가 바뀌기 전..");
    };
  }, [user]);

  useEffect(() => {
    // 20230327 jay 로딩시 데이터 늦게 받아오는 문제 해결
  
    const fetchData = async () => {
      const result = await ProductListService.getProduct();
      // console.log("result", result);
      console.log(result.content)
      setProduct(result.content);
     
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

    console.log("값이 설정됨");
    return () => {
      console.log("가 바뀌기 전..");
    };
  }, []);


  return (
    <div>
      <div>
        <Carousel />
      </div>
      {/* {userLocation && (
        <div>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
          <div id="map" style={{ width: "500px", height: "400px" }}></div>
        </div>
      )} */}
      <div className="main_products_title">
      <Descriptions title="최신상품" ></Descriptions>
      </div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 5,
          xxl: 5,
        }}
        dataSource={product}
        renderItem={(item) => (
          <List.Item onClick={()=>{navigate(`/products/${item.seq}` )}} className="main_cardlist">
            <Card
              style={{
                width: 300,
                height: 350,
              }}
              cover={
                <img className="main_img"
                  alt="example"
                  src={`${item?.images[0]?.url}`}
                />
              }
              actions={[]}
            >
              <Meta title={item.title} />
              <p>{item.company.address.address}</p>
              <Meta description={item.options} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
