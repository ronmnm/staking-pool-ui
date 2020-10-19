import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import ButtonStyled from "./Button"
import { refundForParticipant, stake } from "../service"
import { InputFieldStyled } from "./inputField"

let ControlsStyled = styled.div`
  margin-top: 30px;
  display: grid;
  column-gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
`
let InputFieldStyledModified = styled(InputFieldStyled)`
  margin-top: 25px;
  button {
    /* color: red; */
  }
  input {
    /* margin: 0 10px 10px 0; */
  }
`

export default function Controls({ data, availableRefund, account, customAccount }) {
  let [stakeButtonActive, setStakeButtonActive] = useState(false)
  let [refundLoading, setRefundLoading] = useState(0)
  let [stakeLoading, setStakeLoading] = useState(0)
  let [stakeField, setStakeField] = useState(null)
  let [emergencyStakeButtonContent, setEmergencyStakeButtonContent] = useState(null)

  async function handleRefundClick() {
    setRefundLoading(1)
    await refundForParticipant()
    setRefundLoading(0)
  }
  async function handleStakeClick() {
    setStakeLoading(1)
    await stake(stakeField)
    setStakeLoading(0)
  }
  function handleStakeFieldChange(_value){
    if(data.nuBalance < +_value){
      setEmergencyStakeButtonContent('Not enough tokens')
    } else if( _value === '' || data.nuBalance >= +_value){
      setEmergencyStakeButtonContent(null)
    }
    setStakeField(_value)
  }

  useEffect(() => {
    Number(stakeField) > 0 ? setStakeButtonActive(true) : setStakeButtonActive(false)
  }, [stakeField])

  return (
    <>
      <div>
        <InputFieldStyledModified>
          <div>Stake tokens (your balance: {data.nuBalance.toLocaleString("en-US")} NU):</div>
          <input
            placeholder="Amount"
            value={stakeField || ""}
            onChange={e => handleStakeFieldChange(e.target.value)}
            type="text"
          />
          <ButtonStyled loading={stakeLoading} onClick={handleStakeClick} active={stakeButtonActive && data.nuBalance > 0}>{emergencyStakeButtonContent || "Stake"}</ButtonStyled>
        </InputFieldStyledModified>
      </div>

      <ControlsStyled>
        <div>
          <ButtonStyled
            loading={refundLoading}
            active={Number(availableRefund) > 0}
            onClick={handleRefundClick}>
            Refund: {availableRefund.toLocaleString("en-US")} ETH
          </ButtonStyled>
        </div>
        <div>
          <ButtonStyled active={false}>Withdraw Reward: {0} NU</ButtonStyled>
        </div>
        <div>
          <ButtonStyled active={false}>Withdraw All Stake: {0} NU</ButtonStyled>
        </div>
      </ControlsStyled>
    </>
  )
}
