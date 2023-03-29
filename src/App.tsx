import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Modal from './components/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
	
const GlobalStyle = createGlobalStyle`
  * {margin: 0; padding: 0; color: #333;}
  a {text-decoration: none;}
  ul, ol {list-style: none;}
  html, body {font-family: 'Noto Sans KR', sans-serif;}
`

const Wrap = styled.div`
  display: block;
`

const Header = styled.div`
  width: 100%;
  height: 70px;
  position: relative;
  background: #e9dfc4;
  border-bottom: 1px solid #f6f6f6;
  padding: 0 60px;
  box-sizing: border-box;
  h1 {
    line-height: 70px;
  }
`

const MainSlide = styled.div`
  width: 600px;
  height: 387px;
  margin: 100px auto;
  overflow: hidden;
  position: relative;
  display: flex;
`

const SlideArrow = styled.div`
  position: absolute;
  top: calc(50% - 25px);
  left: ${(props)=>props.left||null};
  right: ${(props)=>props.right||null};
  width: 50px; height: 50px;
  z-index: 2;
  cursor: pointer;
  ::before,::after {
    content: '';
    display: block;
    width: 30px;
    height: 2px;
    background: #fff;
    position: absolute;
    left: calc(50% - 15px);
    }
  ::before {
    top: 13px;
    transform: ${(props)=>props.left?'rotate(135deg)':'rotate(45deg)'};
  }
  ::after {
    top: 33px;
    transform: ${(props)=>props.right?'rotate(135deg)':'rotate(45deg)'};
  }
`

const SlidePagination = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 20px;
  z-index: 2;
  span {
    width: 12px; height: 12px;
    background: #999;
    border-radius: 50%;
  }
  .swiper-pagination-bullet-active {
    background: #fff;
  }
`

const LogButton = styled.button`
  display: block;
  position: absolute;
  top: 20px;
  right: 40px;
`

const TypingBox = styled.div`
  margin: 0 auto;
  padding: 60px 60px;
  display: flex;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  span {
    font-size: 14px;
    background: #e9dfc4;
    padding: 6px 8px;
    border-radius: 12px;
  }
  div {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    select {
      border: 1px solid #ccc;
      padding: 4px;
      border-radius: 4px;
    }
  }
  form {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    input {
      flex: 1;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 4px 20px;
      font-size: 14px;
      letter-spacing: 0.04em;
    }
    button {
      font-size: 14px;
      cursor: pointer;
      border-radius: 12px;
      background: none;
      border: 1px solid #333;
      padding: 4px 24px;
      :hover {
        background: #e9dfc4;
        border-color: #fff;
      }
    }
  }
`

const InfoBox = styled.div`
  display: flex;
  width: 100%;
  margin: 30px 0;
  flex-direction: column;
  gap: 20px;
  ul {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    gap: 8px;
    font-size: 13px;
  }  
`

interface CompanyType {
  Code: string
  International: string
  Name: string
}

interface FirstCom {
  Company: CompanyType[]
}

interface TrackingType {
  kind: string
  manName: string
  telno: string
  timeString: string
  where : string
}

interface FirstDeliveryInfo {
  trackingDetails: TrackingType[]
}

function App() {
  const [companyList, setCompanyList] = useState<FirstCom>()
  const [deliveryInfo, setDeliveryInfo] = useState<FirstDeliveryInfo>()
  const [code, setCode] = useState('')
  const [delCode, setDelCode] = useState('04')
  const BaseURL = 'https://info.sweettracker.co.kr/api/v1/'
  const apiKey = 'fwM3wePoMWuqF5k3n1f30Q'


  //모달창 state
  const [isModal, setIsModal] = useState<boolean>(false)
  const toggleModal = () => setIsModal(!isModal)

  //firebase
  //참고 url
  //https://guiyomi.tistory.com/123
  //https://velog.io/@zueon/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84#%EB%A1%9C%EA%B7%B8%EC%9D%B8%EA%B3%BC-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%EA%B5%AC%ED%98%84

  useEffect(() => {
    getCompanyList()
  },[])

  
  //택배회사 받아오기
  const getCompanyList = async() => {
    const data = await fetch(`${BaseURL}companylist?t_key=${apiKey}`)
    const json = await data.json()
    setCompanyList(json)
  }

  //데이터 입력
  const getDeliveryInfo = async() => {
    if(code === ''){
      alert('운송장 번호를 입력해주세요. (- 없이 입력)')
      return
    }
    const data = await fetch(`${BaseURL}trackingInfo?t_code=${delCode}&t_invoice=${code}&t_key=${apiKey}`)
    const json = await data.json()
    setDeliveryInfo(json)
  }

  //폼 제출
  const handlerFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getDeliveryInfo()
  }

  //택배회사 셀렉트
  const handlerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setDelCode(e.target.value)

  return (
    <Wrap>
      <GlobalStyle />
      <Header>
        <h1>택배를 한눈에! [국내/국제 택배 조회 서비스]</h1>
        <LogButton onClick={toggleModal}>로그인/회원가입</LogButton>
      </Header>
      
      {isModal && <Modal toggleModal={toggleModal}/>}

      <MainSlide>
        <Swiper 
          modules={[Navigation, Pagination, Autoplay]} 
          loop={true}
          autoplay={{
            delay: 3000
          }}
          slidesPerView={1}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev'
          }}
          pagination={{ 
            el: '.pagination',
            clickable: true,
            type: 'bullets'
          }}
        >
         <SlideArrow className="prev" left='30px'/>
          <SwiperSlide>
            <img src='./img/img1.jpg' alt="slide"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src='./img/img2.png' alt="slide"></img>
          </SwiperSlide>

          <SlideArrow className="next" right='30px'/>
          <SlidePagination className="pagination" />
        </Swiper>
      </MainSlide>

      <TypingBox>
        <div>
          <span>택배사 선택</span>
          <select onChange={handlerSelect}>
            {companyList?.Company?.map((data, i) => (
              <option key={i} value={data.Code}>{data.Name}</option>
            ))}
          </select>
        </div>
        <form onSubmit={handlerFormSubmit}>
          <span>운송장 번호</span>
          <input type="text" value={code} placeholder='운송장 번호를 입력해주세요. (- 없이 입력)' onChange={(e) => setCode(e.target.value)}/>
          <button>조회</button>
        </form>
      </TypingBox>


      <InfoBox>
          {deliveryInfo?.trackingDetails?.map((data, i) => (
            <ul key={i}>
              <li>배송상태 | {data.kind}</li>
              {data.manName&&<li>배송기사 | {data.manName}</li>}
              {data.telno&&<li>전화번호 | {data.telno}</li>}
              <li>배송시간 | {data.timeString}</li>
              <li>위치  | {data.where}</li>
            </ul>
          ))}
      </InfoBox>
    </Wrap>
  )
}

export default App