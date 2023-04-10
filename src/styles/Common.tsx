import styled, { css, keyframes } from "styled-components";

export const Wrap = styled.div`
  display: block;
  padding: 0 0 100px;
  background: #13131f;
`

export const TypingBox = styled.div`
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

export const InfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 30px 0;
  padding: 40px 300px;
  box-sizing: border-box;
  gap: 40px;
`

export const Tracking = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin: 0 0 50px;
  box-sizing: border-box;
`

const moves = keyframes`
  0% {
    background: #f53606;
  }
  50% {
    background: #13131f;
  }
  100% {
    background: #f53606;
  }
`

export const CurrentCycle = styled.li`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: 17px solid #cf7437;
  ${(props) => props.color&&
  css`
    animation: ${moves} 6s ease-out infinite;
    padding: 4px;
    border: 17px solid #f53606;
  `}
  position: relative;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
`

export const Trace = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  gap: 20px;
`

export const TraceMenu = styled.ul`
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
export const TraceInfo = styled.ul`
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