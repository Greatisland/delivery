import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

interface ToggleModal {
  toggleModal: () => void
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


export default function Modal(toggleModal : ToggleModal){

  return (
    <>
      <ModalBox onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        toggleModal&&toggleModal.toggleModal()
      }}></ModalBox>
    </>
  )
}