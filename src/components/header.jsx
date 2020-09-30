import React from "react"
// import web3 from "../web3.js"
import styled from "styled-components"

let HeaderStyled = styled.div`
  padding-bottom: 30px;
  
  .connect_wallet {
    color: orange;
    cursor: pointer;
  }
  .connected_account {
    color: orange;
  }
`

export default function Header({ account }) {
  async function connectWallet() {
    console.log("connect click")
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" })
    } catch (error) {
      alert("Metamask is not installed")
      console.error(error)
    }
  }

  if (account) {
    return (
      <HeaderStyled>
        Connected account: <span className="connected_account">{account}</span>
      </HeaderStyled>
    )
  } else {
    return (
      <HeaderStyled>
        <span>Connect your metamask: </span>
        <span className="connect_wallet" onClick={connectWallet}>
          Connect
        </span>
      </HeaderStyled>
    )
  }
}
