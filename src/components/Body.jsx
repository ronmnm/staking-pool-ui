import React, { useState } from "react"
import web3 from "../web3.js"
import styled from "styled-components"
import { getData } from "../service.js"

import ParticipantInfo from "./ParticipantInfo.jsx"
import MainInfo from "./MainInfo.jsx"

let MainStyled = styled.div`
  color: #bec0bf;

  span {
    color: #61dafb;
  }
`

export default function Main({ data, setData, account }) {
  let [inputAddress, setAddress] = useState(null)
  let [customAccount, setCustomAccount] = useState("")
  function getDataClick(_account) {
    if (web3.utils.isAddress(_account)) {
      setCustomAccount(_account)
      getData(_account).then(data => setData(data))
    } else {
      alert("Please enter correct address")
    }
  }

  if (data) {
    return (
      <MainStyled>
        <MainInfo data={data} />
        <ParticipantInfo
          data={data}
          setAddress={setAddress}
          inputAddress={inputAddress}
          customAccount={customAccount}
          account={account}
        />
      </MainStyled>
    )
  } else {
    return <MainStyled>Loading...</MainStyled>
  }
}
