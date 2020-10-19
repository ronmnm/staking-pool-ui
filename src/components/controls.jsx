import React, { useState, useEffect } from "react"
import styled from "styled-components"
import ButtonStyled from "./Button"
import {refundForParticipant} from '../service'

let ControlsStyled = styled.div`
  margin-top: 30px;
  display: grid;
  column-gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
`

export default function Controls({ availableRefund, account, customAccount }) {
  let [buttonActive, setButtonActive] = useState(false)
  let [refundActive, setRefundActive] = useState(0)


  async function refund(){
    setRefundActive(1)
    await refundForParticipant()
    setRefundActive(0)
  }

  // console.log(customAccount)
  useEffect(() => {
    if (account || customAccount === account) {
      setButtonActive(true)
    }
    if (customAccount) {
      setButtonActive(false)
    }
  }, [customAccount])

  return (
    <ControlsStyled>
      <div>
        <ButtonStyled loading={refundActive} active={buttonActive && Number(availableRefund) > 0} onClick={refund}>
          Refund: {availableRefund.toLocaleString("en-US")} ETH
        </ButtonStyled>
      </div>
      <div>
        <ButtonStyled active={false}>
          Withdraw Reward: {0} NU
        </ButtonStyled>
      </div>
      <div>
        <ButtonStyled active={false}>
          Withdraw All Stake: {0} NU
        </ButtonStyled>
      </div>
    </ControlsStyled>
  )
}
