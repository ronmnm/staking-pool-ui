import React, { useState } from "react"
import styled from "styled-components"

const ETHERSCAN_POOL = "https://etherscan.io/address/0xb8ff313d33b0e841b6b83243f6e2935166de87c1"
const ETHERSCAN_WL = "https://etherscan.io/address/0xe9778e69a961e64d3cdbb34cf6778281d34667c2"

let MainInfoStyled = styled.div`
  padding-bottom: 25px;
  border-bottom: 1px dashed darkgrey;
  a {
    color: #7e5ce0;
  }
`

export default function MainInfo({ data }) {
  return (
    <MainInfoStyled>
      <p>
        Total locked in WL contract
        <a target="_blank" rel="noopener noreferrer" href={ETHERSCAN_WL}>
          (etherscan)
        </a>
        : <span>{data.TOTAL_ETH_LOCKED_WL.toLocaleString("en-US")}</span> ETH{" "}
        <span style={{ color: "#969696" }}>(01-Oct-20 snapshot)</span>
      </p>
      <div>
        Total locked in WL through Pool
        <a target="_blank" rel="noopener noreferrer" href={ETHERSCAN_POOL}>
          (etherscan)
        </a>
        : <span>{data.POOL_ESCROWED_ETH.toLocaleString("en-US")}</span> ETH{" "}
        <span style={{ color: "#969696" }}>
          (Refunded: <span>{data.poolRefundedETH.toLocaleString("en-US")}</span> ETH -{" "}
          {((data.poolRefundedETH / data.POOL_ESCROWED_ETH) * 100).toFixed(2)}%)
        </span>
      </div>
      <div>
        Pool tokens allocated: <span>{data.POOL_TOKEN_ALLOCATION.toLocaleString("en-US")}</span> NU
      </div>
      <div>
        NU per 1ETH: <span>~{data.NU_PER_ETH.toFixed(0)}</span> NU
      </div>
      <div>
        Pool claimed tokens?: <span>{String(data.workInfo.claimed)}</span>
      </div>
    </MainInfoStyled>
  )
}
