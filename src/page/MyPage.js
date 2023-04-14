import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import { myInfoThunk, myInfoUpdateThunk } from "../stores/myInfoSlice";
import Table from "react-bootstrap/Table";
import { HiLocationMarker } from "react-icons/hi";
import { Row, Col } from "react-bootstrap";
import MyPageNavigate from "../component/MyPageNavigate";

export default function MyPage() {
  // 변수선언
  const [openPostcode, setOpenPostcode] = React.useState(false);
  const [address, setAddress] = useState();
  const dispatch = useDispatch();
  const [editedName, setEditedName] = useState({});
  let my = useSelector((state) => state.myInfo.myInfo);

  // 경도 위도
  const handleAddressChange = async (data) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${data.address}`,
        {
          headers: {
            Authorization: "KakaoAK bf3e3b8848f7353aa7c8ef238ddc14bb", // Replace with your Kakao Maps REST API key
          },
        }
      );

      const { x: longitude, y: latitude } = response.data.documents[0].address;
      setEditedName({
        ...editedName,
        address: data.address,
        postCode: response.data.documents[0].road_address.zone_no,
        coordinates: { latitude, longitude },
        extra: response.data.documents[0].road_address.building_name,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 주소를 위치로
  const handleConvertAddress = async (event) => {
    event.preventDefault();
  };

  // 우편번호
  const handle = {
    handleConvertAddress,
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      console.log(`
              주소: ${data.address},
              우편번호: ${data.zonecode},
              
          `);

      setAddress(data.address);
      setOpenPostcode(false);
    },
  };

  const handleNameChange = async (event) => {
    const { name, value } = event.target;
    setEditedName((editedName) => ({ ...editedName, [name]: value }));
  };

  const handleSubmitPut = async (e) => {
    e.preventDefault();
    console.log("handleSubmitPut.address", address);
    dispatch(myInfoUpdateThunk(editedName));
    console.log("handleSubmitPut.editedName", editedName);
    alert("수정완료");
  };

  useEffect(() => {
    dispatch(myInfoThunk());

    console.log("my", my);
    console.log("editedName", editedName);
    // 처음에 내정보 가져와서 보여주게 할려고
    editedName.name = my?.name;
    editedName.phone = my?.phone;
    editedName.companyName = my?.company?.name;
    editedName.companyEmail = my?.company?.email;
    editedName.companyPhone = my?.company?.phone;
    editedName.postCode = my?.company?.address.postCode;
    editedName.address = my?.company?.address.address;
    editedName.extra = my?.company?.address.extra;
    editedName.companyAdressDetail = my?.company?.address.detail;
    editedName.latitude = my?.company?.address.location_y;
    editedName.longitud = my?.company?.address.location_x;
  }, []);

  return (
    <>
      <Row>
        <Col lg={3}>
          <MyPageNavigate />
        </Col>
        <Col lg={9}>
          <form>
            <h2 className="mypage_myinfo_title">내정보</h2>
            <Table striped bordered hover className="tables">
              <thead>
                <tr>
                  <th colSpan={2}>내정보</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>이름</td>
                  <td>
                    {/* <label>{my && my.name} </label> */}
                    <input
                      className="mypage_input"
                      required
                      value={editedName?.name}
                      name="name"
                      onChange={handleNameChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>전화번호</td>
                  <td>
                    <div>
                      {/* <label>{my && my.phone} </label> */}
                      <input
                        value={editedName?.phone}
                        name="phone"
                        required
                        className="mypage_input"
                        onChange={handleNameChange}
                      ></input>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="mypage_edit">
              <h2 className="mypage_company_title">사업자 정보</h2>
            </div>
            <Table striped bordered hover className="tables">
              <thead>
                <tr>
                  <th colSpan={2}>사업자 정보</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>사업장 이름</td>
                  <td>
                    {/* <label> {my && my.company.name} </label> */}
                    <input
                      value={editedName?.companyName}
                      name="companyName"
                      required
                      className="mypage_input"
                      onChange={handleNameChange}
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td>사업장 주소 </td>
                  <td>
                    <div>
                      {/* <label>
                        {" "}
                        {my && my.company.address.address} ,{" "}
                        {my && my.company.address.detail}
                      </label> */}
                      <div className="mapage_address_wrap">
                        <label>주소 : </label>
                        <input
                          className="mypage_address_input"
                          name="address"
                          value={editedName?.address}
                          required
                          onChange={handleNameChange}
                        ></input>
                        <label>상세주소 : </label>
                        <input
                          value={editedName?.companyAdressDetail}
                          name="companyAdressDetail"
                          className="mypage_input"
                          required
                          onChange={handleNameChange}
                        ></input>
                        <p
                          onClick={handle.clickButton}
                          className="MyPage_Location_btn"
                        >
                          <HiLocationMarker />
                        </p>
                      </div>
                      {openPostcode && (
                        <DaumPostcode
                          onComplete={handleAddressChange} // 값을 선택할 경우 실행되는 이벤트
                          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                          defaultQuery="판교역로 235" // 팝업을 열때 기본적으로 입력되는 검색어
                        />
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>사업장 이메일 </td>
                  <td>
                    <div>
                      {/* <label> {my && my.company.email} </label> */}
                      <input
                        value={editedName?.companyEmail}
                        name="companyEmail"
                        className="mypage_input"
                        required
                        onChange={handleNameChange}
                      ></input>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>사업장 번호 </td>
                  <td>
                    <div>
                      {/* <label>사업장 번호 : {my && my.company.phone}</label> */}
                      <input
                        value={editedName?.companyPhone}
                        name="companyPhone"
                        className="mypage_input"
                        required
                        onChange={handleNameChange}
                      ></input>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
            <button className="mypage_edit_btn" onClick={handleSubmitPut}>
              수정하기
            </button>
          </form>
        </Col>
      </Row>
    </>
  );
}
