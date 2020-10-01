import React, { useState, useEffect } from "react"
import styled from "styled-components"
import ButtonStyled from "./Button"

let ControlsStyled = styled.div`
  margin-top: 30px;
  display: grid;
  column-gap: 20px;
  grid-auto-flow: column;
  grid-auto-columns: min-content;
`

export default function Controls({ availableRefund, account, customAccount }) {
  let [buttonActive, setButtonActive] = useState(false)

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
        <ButtonStyled active={buttonActive && Number(availableRefund) > 0}>
          Refund: {availableRefund.toLocaleString("en-US")} ETH
        </ButtonStyled>
      </div>
      <div>
        <ButtonStyled active={buttonActive && Number(availableRefund) > 0}>
          Withdraw Reward: {availableRefund.toLocaleString("en-US")} NU
        </ButtonStyled>
      </div>
      <div>
        <ButtonStyled active={false}>
          Withdraw All Stake: {availableRefund.toLocaleString("en-US")} NU
        </ButtonStyled>
      </div>
    </ControlsStyled>
  )
}
