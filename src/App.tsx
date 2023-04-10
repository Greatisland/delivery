import React, { useEffect, useState } from 'react';
import 'swiper/css';
import * as Common from './styles/Common';
import GlobalStyle from './styles/GlobalStyle';
import Slide from './components/Slide';
import Header from './components/Header';

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
  lastDetail: TrackingType
}

const App = () => {
  const [companyList, setCompanyList] = useState<FirstCom>()
  const [deliveryInfo, setDeliveryInfo] = useState<FirstDeliveryInfo>()
  const [code, setCode] = useState('')
  const [delCode, setDelCode] = useState('04')
  const [curDetail, setCurDetail] = useState('')
  const BaseURL = 'https://info.sweettracker.co.kr/api/v1/'
  const apiKey = 'fwM3wePoMWuqF5k3n1f30Q'

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
    if(!json.status && json.complete) {
      setDeliveryInfo(json)
      const lastDetail = await getLastDetail(json)
      switch (lastDetail?.kind){
        case '집하' : setCurDetail('출발전')
        break
        case '배달완료' : setCurDetail('도착완료')
        break
        default : setCurDetail('배송중')
      }
    }else{
      alert('유효하지 않은 송장번호입니다.')
    }
  }
  
  const getLastDetail = (json: FirstDeliveryInfo) => {
    const lastDetail = json?.lastDetail
    return lastDetail
  }
  

  //폼 제출
  const handlerFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getDeliveryInfo()
  }

  //택배회사 셀렉트
  const handlerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setDelCode(e.target.value)

  return (
    <Common.Wrap>
      <GlobalStyle />
      <Header />
      <Common.TypingBox>
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
      </Common.TypingBox>

      {deliveryInfo&&<Common.InfoBox>
        <Common.Tracking>
          {curDetail==='출발전'?          
          <Common.CurrentCycle color={curDetail}>
            <span>출발전</span>
            <img src={process.env.PUBLIC_URL + '/img/arrow.png'}></img>
          </Common.CurrentCycle>:
          <Common.CurrentCycle>
            <span>출발전</span>
            <img src={process.env.PUBLIC_URL + '/img/arrow.png'}></img>
          </Common.CurrentCycle>
          }
          {curDetail==='배송중'?          
          <Common.CurrentCycle color={curDetail}>
            <span>배송중</span>
            <img src={process.env.PUBLIC_URL + '/img/arrow.png'}></img>
          </Common.CurrentCycle>:
          <Common.CurrentCycle>
            <span>배송중</span>
            <img src={process.env.PUBLIC_URL + '/img/arrow.png'}></img>
          </Common.CurrentCycle>
          }
          {curDetail==='도착완료'?          
          <Common.CurrentCycle color={curDetail}>
            <span>도착완료</span>
          </Common.CurrentCycle>:
          <Common.CurrentCycle>
            <span>도착완료</span>
          </Common.CurrentCycle>
          }
        </Common.Tracking>
        <Common.Trace>
          <Common.TraceMenu>
            <li>배송상태</li>
            <li>배송기사</li>
            <li>전화번호</li>
            <li>배송시간</li>
            <li>위치</li>
          </Common.TraceMenu>
          <Common.TraceInfo>
          {deliveryInfo?.trackingDetails?.map((data, i) => (
            <ul key={i}>
              <li>{data.kind}</li>
              <li>{data.manName}</li>
              <li>{data.telno}</li>
              <li>{data.timeString}</li>
              <li>{data.where}</li>
            </ul>
          ))}
          </Common.TraceInfo>
        </Common.Trace>
      </Common.InfoBox>}
      <Slide />
    </Common.Wrap>
  )
}
export default App