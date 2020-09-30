import web3 from "./web3"
import poolAbi from "./abi/poolAbi.json"
import worklockAbi from "./abi/worklockAbi.json"

function fromWei(_value) {
  let res = web3.utils.fromWei(_value, "ether")
  return Number(res)
}

export async function getData(_account) {
  let poolContractInstance
  let worklockContractInstance
  let account
  if (web3) {
    poolContractInstance = new web3.eth.Contract(
      poolAbi,
      "0xB8Ff313d33b0E841b6B83243F6e2935166de87C1"
    )

    worklockContractInstance = new web3.eth.Contract(
      worklockAbi,
      "0xe9778E69a961e64d3cdBB34CF6778281d34667c2"
    )

    account = (await web3.eth.getAccounts())[0]
  } else {
    return null
  }

  if (_account) {
    account = _account
  }

  let data = {}
  try {
    // Locked ETH in WL
    let totalLockedInMainContractWei = await web3.eth.getBalance(
      "0xe9778E69a961e64d3cdBB34CF6778281d34667c2"
    )
    data.totalLockedInMainContractETH = fromWei(totalLockedInMainContractWei)

    // Locked ETH through pool
    let totalLockedWei = await poolContractInstance.methods.totalWorkLockETHReceived().call()
    data.totalLockedETH = fromWei(totalLockedWei)

    let nuNitsAllocation = await worklockContractInstance.methods.ethToTokens(totalLockedWei).call()
    data.ethToTokens = Math.round(fromWei(nuNitsAllocation))

    let poolAvailableRefund = await worklockContractInstance.methods
      .getAvailableRefund("0xB8Ff313d33b0E841b6B83243F6e2935166de87C1")
      .call()
    data.poolAvailableRefund = fromWei(poolAvailableRefund)
    // console.log("poolAvailableRefund", poolAvailableRefund)
    data.workInfo = await worklockContractInstance.methods
      .workInfo("0xB8Ff313d33b0E841b6B83243F6e2935166de87C1")
      .call()

    // participant data
    if (account) {
      let participantData = await poolContractInstance.methods.delegators(account).call()
      let availableRefund = await poolContractInstance.methods.getAvailableRefund(account).call()
      data.participantDepositedETH = fromWei(participantData.depositedETHWorkLock)

      let participantAllocatedNuNits = (data.ethToTokens / data.totalLockedETH).toFixed(2)

      data.participantAllocatedNu = (
        participantAllocatedNuNits * data.participantDepositedETH
      ).toLocaleString("en-US")

      data.depositedTokens = fromWei(participantData.depositedTokens)
      data.refundedETHWorkLock = fromWei(participantData.refundedETHWorkLock)
      console.log("data.refundedETHWorkLock", data.refundedETHWorkLock)
      data.availableRefund = fromWei(availableRefund)

      // console.log(participantData)
    }

    return data
  } catch (error) {
    console.error(error)
  }
}
