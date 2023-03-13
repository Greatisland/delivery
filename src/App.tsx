// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <p>택배 받아오기</p>
//       <form></form>
//     </div>
//   )
// }

// export default App
import { useEffect, useState } from 'react'

interface CompanyType {
  Code: string;
  International: string;
  Name: string;
}

interface FirstCom {
  Company: CompanyType[];
}


function App() {
  const [companyList, setCompanyList] = useState<FirstCom>()




  useEffect(() => {
    getCompanyList()
  },[])


  
  const getCompanyList = async() => {
    const data = await fetch("https://info.sweettracker.co.kr/api/v1/companylist?t_key=fwM3wePoMWuqF5k3n1f30Q")
    const json = await data.json()
    console.log(json)

    setCompanyList(json)
  }


  return (
    <div className="App">
      프로젝트임
      
      <select name="" id="">

        {companyList?.Company?.map((data, i) => (
          <option key={i}>{data.Name}</option>
        ))}
      </select>
      
    </div>
  )
}

export default App