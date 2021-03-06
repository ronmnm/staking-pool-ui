import web3 from "./web3"
import poolAbi from "./abi/poolAbi.json"
import worklockAbi from "./abi/worklockAbi.json"
import escrowAbi from "./abi/escrowAbi.json"
import tokenAbi from "./abi/tokenAbi.json"

const POOL_ADDRESS = "0xB8Ff313d33b0E841b6B83243F6e2935166de87C1"
const WL_ADDRESS = "0xe9778E69a961e64d3cdBB34CF6778281d34667c2"
const DISPATCHER_ADDRESS = "0xbbD3C0C794F40c4f993B03F65343aCC6fcfCb2e2"
const TOKEN_ADDRESS = "0x4fe83213d56308330ec302a8bd641f1d0113a4cc"

let PoolContract = new web3.eth.Contract(poolAbi, POOL_ADDRESS)
let WLContract = new web3.eth.Contract(worklockAbi, WL_ADDRESS)
let EscrowContract = new web3.eth.Contract(escrowAbi, DISPATCHER_ADDRESS)
let Token = new web3.eth.Contract(tokenAbi, TOKEN_ADDRESS)

function _fromWei(_value) {
  let res = web3.utils.fromWei(_value, "ether")
  return Number(res)
}

export async function refundFromPool() {
  let account = (await web3.eth.getAccounts())[0]
  if (account) {
    try {
      await PoolContract.methods.refund().send({
        from: account,
      })
    } catch (error) {
      console.error("this is errrrror!", error)
    }
  } else {
    alert("Please connect metamask first")
  }
}

export async function refundForParticipant() {
  let account = (await web3.eth.getAccounts())[0]
  if (account) {
    try {
      await PoolContract.methods.withdrawRefund().send({
        from: account,
      })
    } catch (error) {
      console.error("this is errrrror!", error)
    }
  } else {
    alert("Please connect metamask first")
  }
}

export async function stake(_value) {
  let account = window.ethereum.selectedAddress
  let amountToDeposit = web3.utils.toWei(_value, "ether")

  let allowance = await Token.methods
    .allowance(account, "0xB8Ff313d33b0E841b6B83243F6e2935166de87C1")
    .call()

  if (allowance < amountToDeposit) {
    try {
      await Token.methods
        .increaseAllowance("0xB8Ff313d33b0E841b6B83243F6e2935166de87C1", amountToDeposit)
        .send({ from: account })
    } catch (error) {
      console.log("this is ERRR", error)
      return
    }
  }
  try {
    await PoolContract.methods.depositTokens(amountToDeposit).send({ from: account })
  } catch (error) {
    console.log(error)
  }
}

export async function getData(_account) {
  let account = (await web3.eth.getAccounts())[0]
  // console.log("account", account)
  let data = {}

  if (_account) {
    account = _account
  }

  try {
    data.POOL_ESCROWED_ETH = 3182.0955
    data.POOL_TOKEN_ALLOCATION = 1814414.144
    data.NU_PER_ETH = data.POOL_TOKEN_ALLOCATION / data.POOL_ESCROWED_ETH
    data.TOTAL_ETH_LOCKED_WL = 353913.645

    try {
      let poolRefundedETH = await PoolContract.methods.totalWorkLockETHRefunded().call()
      data.poolRefundedETH = _fromWei(poolRefundedETH)
    } catch (err) {
      console.log("poolRefundedETH", err)
    }

    try {
      let poolAvailableRefund = await WLContract.methods.getAvailableRefund(POOL_ADDRESS).call()
      data.poolAvailableRefund = _fromWei(poolAvailableRefund)
    } catch (err) {
      console.log("poolAvailableRefund", err)
    }

    try {
      data.workInfo = await WLContract.methods.workInfo(POOL_ADDRESS).call()
    } catch (err) {
      console.log("workInfo", err)
    }

    // const subStakesLength = await EscrowContract.methods.subStakesLength(account).call()

    // const getAllSubstakes = await (async () => {
    //   if (subStakesLength !== "0") {
    //     let substakeList = []
    //     for (let i = 0; i < subStakesLength; i++) {
    //       let list = await EscrowContract.methods.getSubStakeInfo(POOL_CONTRACT_ADDRESS, i).call()
    //       list.id = i.toString()
    //       substakeList.push(list)
    //     }
    //     return substakeList
    //   } else {
    //     let substakeList = null
    //     return substakeList
    //   }
    // })()

    // participant data
    if (account) {
      let nuBalance = await Token.methods.balanceOf(account).call()
      let participantData = await PoolContract.methods.delegators(account).call()
      let availableRefund = await PoolContract.methods.getAvailableRefund(account).call()

      data.nuBalance = _fromWei(nuBalance)

      data.participantDepositedETH = _fromWei(participantData.depositedETHWorkLock)

      data.participantAllocatedNu = data.NU_PER_ETH * data.participantDepositedETH

      data.depositedTokens = _fromWei(participantData.depositedTokens)
      data.refundedETHWorkLock = _fromWei(participantData.refundedETHWorkLock)
      // console.log("data.refundedETHWorkLock", data.refundedETHWorkLock)
      data.availableRefund = _fromWei(availableRefund)

      // console.log(participantData)
      data.isAccountPresent = true
    }

    return data
  } catch (error) {
    console.error("this is error", error)
  }
}
