import web3 from "./web3"
import poolAbi from "./abi/poolAbi.json"
import worklockAbi from "./abi/worklockAbi.json"
import escrowAbi from "./abi/escrowAbi.json"

const POOL_ADDRESS = "0xB8Ff313d33b0E841b6B83243F6e2935166de87C1"
const WL_ADDRESS = "0xe9778E69a961e64d3cdBB34CF6778281d34667c2"
const DISPATCHER_ADDRESS = "0xbbD3C0C794F40c4f993B03F65343aCC6fcfCb2e2"

function _fromWei(_value) {
  let res = web3.utils.fromWei(_value, "ether")
  return Number(res)
}

export async function getData(_account) {
  let PoolContract = new web3.eth.Contract(poolAbi, POOL_ADDRESS)
  let WLContract = new web3.eth.Contract(worklockAbi, WL_ADDRESS)
  let EscrowContract = new web3.eth.Contract(escrowAbi, DISPATCHER_ADDRESS)

  let account = (await web3.eth.getAccounts())[0]
  let data = {}

  if (_account) {
    account = _account
  }

  try {
    data.POOL_ESCROWED_ETH = 3182.0955
    data.POOL_TOKEN_ALLOCATION = 1814414.144
    data.NU_PER_ETH = data.POOL_TOKEN_ALLOCATION / data.POOL_ESCROWED_ETH
    data.TOTAL_ETH_LOCKED_WL = 353913.645

    // web3.eth.getBalance(WL_ADDRESS).then(res => {
    //   data.totalLockedInMainContractETH = _fromWei(res)
    // })

    PoolContract.methods
      .totalWorkLockETHRefunded()
      .call()
      .then(res => {
        data.poolRefundedETH = _fromWei(res)
      })
    WLContract.methods
      .getAvailableRefund(POOL_ADDRESS)
      .call()
      .then(res => {
        data.poolAvailableRefund = _fromWei(res)
      })

    // console.log("poolAvailableRefund", poolAvailableRefund)
    data.workInfo = await WLContract.methods.workInfo(POOL_ADDRESS).call()

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
      let participantData = await PoolContract.methods.delegators(account).call()
      let availableRefund = await PoolContract.methods.getAvailableRefund(account).call()
      data.participantDepositedETH = _fromWei(participantData.depositedETHWorkLock)

      data.participantAllocatedNu = data.NU_PER_ETH * data.participantDepositedETH

      data.depositedTokens = _fromWei(participantData.depositedTokens)
      data.refundedETHWorkLock = _fromWei(participantData.refundedETHWorkLock)
      // console.log("data.refundedETHWorkLock", data.refundedETHWorkLock)
      data.availableRefund = _fromWei(availableRefund)

      // console.log(participantData)
    }

    return data
  } catch (error) {
    console.error(error)
  }
}
