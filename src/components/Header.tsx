import styled from "styled-components";

const HeaderStyle = styled.div`
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
      flex: 1;
      height: 1px;
      background: #f2f2f2;
    }
  }
`

const Header = () => {
  return (
    <HeaderStyle>
      <h1>나의 택배 찾기 - Delivery inquiry service </h1>
    </HeaderStyle>
  )
}

export default Header