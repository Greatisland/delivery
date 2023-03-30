import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Modal from './components/Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
	
const GlobalStyle = createGlobalStyle`
  * {margin: 0; padding: 0; color: #f2f2f2;}
  a {text-decoration: none;}
  ul, ol {list-style: none;}
  html, body {font-family: 'Noto Sans KR', sans-serif;}
`

const Wrap = styled.div`
  display: block;
  background: #13131f;

`

const Header = styled.div`
  width: 100%;
  height: 90px;
  position: relative;
  padding: 0 300px;
  box-sizing: border-box;
  h1 {
    display: flex;
    align-items: center;
    gap: 30px;
    line-height: 90px;
    font-size: 18px;
    letter-spacing: -0.06em;
    ::after {
      content: "";
      display: block;
      width: 50%;
      height: 1px;
      background: #f2f2f2;
    }
  }
`

const MainSlide = styled.div`
  width: 100%;
  padding: 0 300px;
  margin: 0 auto;
  box-sizing: border-box;
  height: 700px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  img { 
    width: 100%;
  }
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

const LogButton = styled.button`
  display: block;
  position: absolute;
  top: 20px;
  right: 340px;
`

const TypingBox = styled.div`
  margin: 0 auto;
  padding: 20px 300px;
  box-sizing: border-box;
  display: flex;
  span {
    font-size: 14px;
    padding: 6px 8px;
  }
  div {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: baseline;
    gap: 20px;
    select {
      border: none;
      padding: 8px;
      border-radius: 12px;
      background: #282833;
      ::-webkit-scrollbar {
          width: 15px;
      }
      ::-webkit-scrollbar-thumb {
        background: #fff;
        border-radius: 50px;
      }
      ::-webkit-scrollbar-track {
        background: #13131f;
      }
      option {
        background: #13131f;
        color: #f2f2f2;
      }
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
      border-radius: 12px;
      padding: 10px 20px;
      font-size: 14px;
      letter-spacing: 0.04em;
      background: #282833;
      color: #f2f2f2;
      border: none;
      outline: none;
    }
    button {
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      border-radius: 12px;
      background: #cf7437;
      border: 1px solid #333;
      padding: 10px 36px;
      :hover {
        background: #b11717;
      }
    }
  }
`

const InfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 30px 0;
  padding: 40px 300px;
  box-sizing: border-box;
  gap: 40px;
`

const Tracking = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 0 0 50px;
  box-sizing: border-box;
  li {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    border: 17px solid #cf7437;
    position: relative;
    span {
      display: block;
      width: 100%;
      text-align: center;
      line-height: 65px;
      color: #fff;
      font-size: 12px;
      letter-spacing: 0.04em;
    }
    img {
      position: absolute;
      top: 50%;
      right: -10vw;
      transform: translateY(-50%);
    }
  }
`

const Trace = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 20px;
`

const TraceMenu = styled.ul`
  width: 100%;
  display: flex;
  padding: 0 0 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #666;
  li {
    width: 20%;
    text-align: center;
    font-weight: 700;
  }
`
const TraceInfo = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  ul {
    display: flex;
    width: 100%;
    li {
      width: 20%;
      text-align: center;
    }
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

const App = () => {
  const [companyList, setCompanyList] = useState<FirstCom>()
  const [deliveryInfo, setDeliveryInfo] = useState<FirstDeliveryInfo>()
  const [code, setCode] = useState('')
  const [delCode, setDelCode] = useState('04')
  const BaseURL = 'https://info.sweettracker.co.kr/api/v1/'
  const apiKey = 'fwM3wePoMWuqF5k3n1f30Q'

  const [trace, setTrace] = useState(false)

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
        <h1>나의 택배 찾기 - Delivery inquiry service </h1>
        <LogButton onClick={toggleModal}>로그인/회원가입</LogButton>
      </Header>
      {isModal && <Modal toggleModal={toggleModal}/>}

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
          <input type="text" value={code} placeholder='운송장 번호를 입력해주세요.' onChange={(e) => setCode(e.target.value)}/>
          <button>조회하기</button>
        </form>
      </TypingBox>

      {deliveryInfo&&<InfoBox>
        <Tracking>
          <li>
            <span>출발전</span>
            <img src="./public/img/arrow.png"></img>
          </li>
          <li>
            <span>배송중</span>
            <img src="./public/img/arrow.png"></img>
          </li>
          <li>
            <span>도착완료</span>
          </li>
        </Tracking>
        <Trace>
          <TraceMenu>
            <li>배송상태</li>
            <li>배송기사</li>
            <li>전화번호</li>
            <li>배송시간</li>
            <li>위치</li>
          </TraceMenu>
          <TraceInfo>
          {deliveryInfo?.trackingDetails?.map((data, i) => (
            <ul key={i}>
              <li>{data.kind}</li>
              <li>{data.manName}</li>
              <li>{data.telno}</li>
              <li>{data.timeString}</li>
              <li>{data.where}</li>
            </ul>
          ))}
          </TraceInfo>
        </Trace>
      </InfoBox>}
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
              <img src={'./img/img01.png'} alt="slide"></img>
            </SwiperSlide>
            <SwiperSlide>
              <img src={'./img/img02.png'} alt="slide"></img>
            </SwiperSlide>
            <SlideArrow className="next" right='30px'/>
          </Swiper>
        </MainSlide>
    </Wrap>
  )
}
export default App