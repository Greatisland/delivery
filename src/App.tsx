import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Modal from './components/Modal';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAXg2XR-U7NJXL2-WoGklp3lTL9o4pbFoI",
  authDomain: "delivery-app-1eaea.firebaseapp.com",
  projectId: "delivery-app-1eaea",
  storageBucket: "delivery-app-1eaea.appspot.com",
  messagingSenderId: "726174120186",
  appId: "1:726174120186:web:0a86e8bf3a53a4fd9cf143",
  measurementId: "G-YH4BN75XTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
	
const GlobalStyle = createGlobalStyle`
  * {margin: 0; padding: 0; color: #333;}
  a {text-decoration: none;}
  ul, ol {list-style: none;}
  html, body {font-family: 'Noto Sans KR', sans-serif;}
`

const Wrap = styled.div`
  display: block;
  width: 40vw;
  min-height: 400px;
  border: 2px solid #333;
  border-radius: 20px;
  margin: 40px auto;
  padding: 60px;
`

const TypingBox = styled.div`
  margin: 0 auto;
  padding: 0 0 10px 0;
  border-bottom: 1px solid #333;
  display: flex;
  flex-wrap: wrap;
  span {
    font-size: 12px;
    margin: 0 20px 0 0;
  }
  form {
    margin: 20px 0 0;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    input {
      flex: 1;
      border: none;
      padding: 4px 20px;
      font-size: 20px;
      letter-spacing: 0.04em;
    }
    button {
      background: none;
      border: 1px solid #333;
      border-radius: 4px;
      padding: 4px 24px;
      :hover {
        background: #f2f2f2;
        border-color: #f2f2f2;
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
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user)

  // console.log(user.photoURL);  // 프로필 사진 URL
  // console.log(user.phoneNumber);  // 휴대폰 번호
  // console.log(user.metadata);  // 사용자 메타데이터(createdAt, creationTime, lastLoginAt, lastSignInTime)
  // console.log(user.email);  // 이메일
  // console.log(user.displayName);  // 표시 이름
  // console.log(user.emailVerified);  // 이메일 인증 여부(boolean)
  // console.log(user.isAnonymous);  // 익명 여부(boolean)
  


  useEffect(() => {
    getCompanyList()
  },[])

  
  //회원가입
//   const join = async (email, password) => {
//   try {
//     const auth = getAuth();
//     const { user } = await createUserWithEmailAndPassword(auth, email, password);
//     const { stsTokenManager, uid } = user;
//     setAuthInfo({ uid, email, authToken: stsTokenManager });
//     navigate('/');
//   } catch ({ code, message }) {
//     alert(errorMessage[code]);
//   }
// };
/*
  const join = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create new Account
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // log in
        data = signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  */
  
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
      <button onClick={toggleModal}>로그인/회원가입</button>
      {isModal && <Modal toggleModal={toggleModal}/>}
      <TypingBox>
        <span>택배사 선택: </span>
        <select onChange={handlerSelect}>
          {companyList?.Company?.map((data, i) => (
            <option key={i} value={data.Code}>{data.Name}</option>
          ))}
        </select>

        <form onSubmit={handlerFormSubmit}>
          <input type="text" value={code} placeholder='운송장 번호를 입력해주세요. (- 없이 입력)' onChange={(e) => setCode(e.target.value)}/>
          <button>조회</button>
        </form>
      </TypingBox>


      <InfoBox>
          {deliveryInfo?.trackingDetails?.map((data, i) => (
            <ul key={i}>
              <li>배송상태 | {data.kind}</li>
              {data.manName?<li>배송기사 | {data.manName}</li> : null}
              {data.telno?<li>전화번호 | {data.telno}</li> : null}
              <li>배송시간 | {data.timeString}</li>
              <li>위치  | {data.where}</li>
            </ul>
          ))}
      </InfoBox>
    </Wrap>
  )
}

export default App