import React, { useState } from "react"
import web3 from "../web3.js"
import styled from "styled-components"
import InputField from "./inputField"
import { getData } from "../service.js"

let MainStyled = styled.div`
  color: #b5b7b6;
  .main_info {
    padding-bottom: 25px;
    border-bottom: 1px dashed darkgrey;
    a {
      color: #7e5ce0;
    }
  }
  span {
    color: #61dafb;
  }
  .participant_info {
    padding-top: 25px;
    .input_field {
      padding-bottom: 20px;
    }
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
        <div className="main_info">
          <p>
            Total ETH locked in worklock contract (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://etherscan.io/address/0xe9778e69a961e64d3cdbb34cf6778281d34667c2">
              etherscan
            </a>
            ): <span>{data.totalLockedInMainContractETH.toLocaleString("en-US")}</span> ETH
          </p>
          <div>
            Total ETH locked through pool (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://etherscan.io/address/0xb8ff313d33b0e841b6b83243f6e2935166de87c1">
              etherscan
            </a>
            ): <span>{data.totalLockedETH.toLocaleString("en-US")}</span> ETH
          </div>
          <div>
            Pool tokens allocated: <span>{data.ethToTokens.toLocaleString("en-US")}</span> NU
          </div>
          <div>
            NU per 1ETH: <span>{(data.ethToTokens / data.totalLockedETH).toFixed(2)}</span> NU
          </div>
          <div>
            Pool claimed tokens?: <span>{String(data.workInfo.claimed)}</span>
          </div>
        </div>
        <div className="participant_info">
          <p>
            Delegator info (to view your personal data connect a wallet or enter address manually):
          </p>
          <div className="input_field">
            <InputField
              getDataClick={getDataClick}
              inputAddress={inputAddress}
              setAddress={setAddress}
            />
          </div>

          <p>
            Delegator:{" "}
            {account ? (
              <span>
                {account.slice(0, 6)}...{account.slice(38, 42)}
              </span>
            ) : (
              <span>
                {customAccount.slice(0, 6)}...{customAccount.slice(38, 42)}
              </span>
            )}
          </p>
          {data.participantDepositedETH && (
            <>
              <div>
                Your WL total escrow: <span>{data.participantDepositedETH}</span> ETH
              </div>
              <div>
                Your WL NU share: <span>{data.participantAllocatedNu}</span> NU
              </div>
              <div>
                Deposited NU(WL tokens + liquid tokens): <span>{data.depositedTokens}</span> NU{" "}
                <span style={{ color: "grey" }}>(calc. after first refund claim)</span>
              </div>
              <div>
                Refunded WL ETH: <span>{data.refundedETHWorkLock.toLocaleString("en-US")}</span> ETH
              </div>
              <div>
                Your available WL refund:{" "}
                <span>{data.availableRefund.toLocaleString("en-US")}</span> ETH (Pool available
                refund: <span>{data.poolAvailableRefund.toLocaleString("en-US")}</span> ETH)
              </div>
            </>
          )}
        </div>
      </MainStyled>
    )
  } else {
    return <MainStyled>Loading...</MainStyled>
  }
}
