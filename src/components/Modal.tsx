import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

interface ModalType {
  isModal: boolean
}


const ModalBox = styled.div`
  width: 1050px;
  height: 1000px;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid #f2f2f2;
  background: #333;
`


export default function Modal(props : ModalType){

  const closeModal = () => {
    setIsModal(false)
  }

  return (
    <>
      <ModalBox></ModalBox>
    </>
  )
}