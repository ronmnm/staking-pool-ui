import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import ButtonStyled from "./Button.jsx"
import Controls from "./controls.jsx"
import InputField from "./inputField"

let ParticipantInfoStyled = styled.div`
  padding-top: 25px;
  .input_field {
    padding-bottom: 20px;
  }
`

export default function ParticipantInfo({
  data,
  getDataClick,
  inputAddress,
  setAddress,
  customAccount,
  account,
}) {
  let poolRefund = data.poolAvailableRefund.toLocaleString("en-US")
  return (
    <ParticipantInfoStyled>
      <p>Delegator info (to view your personal data connect a wallet or enter address manually):</p>
      <div className="input_field">
        <InputField
          getDataClick={getDataClick}
          inputAddress={inputAddress}
          setAddress={setAddress}
        />
      </div>
      {data.participantDepositedETH && (
        <>
          <p>
            Delegator:{" "}
            {customAccount ? (
              <span>
                {customAccount && customAccount.slice(0, 6)}...{customAccount.slice(38, 42)}
              </span>
            ) : (
              <span>{account ? `${account.slice(0, 6)}...${account.slice(38, 42)}` : null}</span>
            )}
          </p>

          <div>
            Your WL escrow: <span>{data.participantDepositedETH}</span> ETH{" "}
            <span style={{ color: "#969696" }}>
              (Refunded: <span>{data.refundedETHWorkLock.toLocaleString("en-US")}</span> ETH)
            </span>
          </div>

          <div>
            Your available WL refund: <span>{data.availableRefund.toLocaleString("en-US")}</span>{" "}
            ETH{" "}
            <span style={{ color: "#969696" }}>
              (Pool available refund: <span>{poolRefund}</span> ETH, Withdraw to pool{" "}
              <ButtonStyled active={true}>Refund: {poolRefund} ETH</ButtonStyled>)
            </span>
          </div>
          <br />
          <div>
            Your WL NU share: <span>{data.participantAllocatedNu.toLocaleString("en-US")}</span> NU
          </div>
          <div>
            Deposited NU(WL tokens + liquid tokens): <span>{data.depositedTokens}</span> NU{" "}
            <span style={{ color: "#969696" }}>(calc. after first refund claim)</span>
          </div>

          <Controls
            availableRefund={data.availableRefund}
            account={account}
            customAccount={customAccount}
          />
        </>
      )}
    </ParticipantInfoStyled>
  )
}
