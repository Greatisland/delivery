import React, { useEffect, useState } from 'react'

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


  useEffect(() => {
    getCompanyList()
  },[])
  
  const getCompanyList = async() => {
    const data = await fetch(`${BaseURL}companylist?t_key=${apiKey}`)
    const json = await data.json()

    setCompanyList(json)
  }

  const getDeliveryInfo = async() => {
    if(code === ''){
      alert('운송장 번호를 입력해주세요.')
      return
    }
    
    const data = await fetch(`${BaseURL}trackingInfo?t_code=${delCode}&t_invoice=${code}&t_key=${apiKey}`)
    const json = await data.json()

    setDeliveryInfo(json)
  }

  const handlerFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getDeliveryInfo()
  }

  const handlerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => setDelCode(e.target.value)



  return (
    <>
      <span>택배사 선택: </span>
      <select onChange={handlerSelect}>
        {companyList?.Company?.map((data, i) => (
          <option key={i} value={data.Code}>{data.Name}</option>
        ))}
      </select>

      <form onSubmit={handlerFormSubmit}>
        <input type="text" value={code} placeholder='송장번호를 입력해주세요.' onChange={(e) => setCode(e.target.value)}/>
      </form>

      <div className="infoBox">
          {deliveryInfo?.trackingDetails?.map((data, i) => (
            <ul key={i}>
              <li>{data.kind}</li>
              <li>{data.manName}</li>
              <li>{data.telno}</li>
              <li>{data.timeString}</li>
              <li>{data.where}</li>
            </ul>
          ))}
      </div>
    </>
  )
}

export default App