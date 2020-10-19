import React from "react"
import styled from "styled-components"

export const InputFieldStyled = styled.div`
  .button_styles {
    cursor: pointer;
    height: 30px;
    width: 100px;
    color: black;
    background-color: orange;
    border: 2px solid orange;
    font-weight: 600;
    border-radius: 3px;
    font-size: 14px;
    &:hover {
      background-color: #ec9900;
    }
    &:focus {
      outline: none;
    }
  }
  input {
    outline: none;
    width: 400px;
    height: 20px;
    background-color: black;
    border: 2px solid #7e5ce0;
    border-radius: 3px;
    color: orange;
    font-weight: 600;
    font-size: 14px;
    padding: 3px 10px;
    margin: 0 10px 10px 0;

    &:focus {
      outline: none;
    }
    &:focus::placeholder {
      opacity: 0;
    }
  }
`

export default function InputField({ inputAddress, getDataClick, setAddress }) {
  return (
    <InputFieldStyled>
      <input
        placeholder="0x..."
        value={inputAddress || ""}
        onChange={e => setAddress(e.target.value)}
        type="text"
      />
      <button className="button_styles" onClick={() => getDataClick(inputAddress)}>Query</button>
    </InputFieldStyled>
  )
}
