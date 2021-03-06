import React from "react"
import styled, { css } from "styled-components"

let ButtonS = styled.button`
  cursor: pointer;
  height: 30px;
  padding: 5px 20px;
  color: ${({ active }) => (active ? "black" : "#282c34")};
  background-color: ${({ active }) => (active ? "#61dafb" : "#7A7A7A")};
  pointer-events: ${({ active }) => !active && "none"};
  border: none;
  font-weight: 600;
  border-radius: 3px;
  font-size: 14px;
  white-space: nowrap;
  ${({ active }) =>
    active &&
    css`
      &:hover {
        background-color: #5bcdec;
      }
      &:active {
        background-color: #24b3da;
      }
      &:focus {
        outline: none;
      }
    `}
  ${({ loading }) =>
    loading &&
    css`
      pointer-events: none;
      cursor: default;
      div{
        color: "black";
      }
      
    `}
`

export default function ButtonStyled({ active, loading, children, ...params }) {
  return (
    <ButtonS {...params} loading={loading} active={active}>
      {!!loading ? <div>Loading...</div> : children}
    </ButtonS>
  )
}
