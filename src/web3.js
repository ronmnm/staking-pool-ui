import Web3 from "web3"
import { INFURA_TOKEN } from "./secrets.json"
let link = `https://mainnet.infura.io/v3/${INFURA_TOKEN}`

let web3
if (window.ethereum) {
  web3 = new Web3(window.ethereum)
  // if (window.ethereum.chainId != "0x1") {
  //   alert("Please switch to mainnet.")
  //   web3 = new Web3(link)
  // }
} else {
  console.log("metamask is not installed")
  web3 = new Web3(link)
}

export default web3

// let Web3 = require("web3")
// let web3 = new Web3("https://mainnet.infura.io/v3/388474bfcd7f44508aefa5b952227ddb")
// let poolAbi = require("./abi/poolAbi.json")

// poolContractInstance = new web3.eth.Contract(poolAbi, "0xB8Ff313d33b0E841b6B83243F6e2935166de87C1")

// poolContractInstance.getPastEvents("Bid", { fromBlock: 0 }, (err, events) => {
//   let addresses = events.map(item => item.returnValues.sender)
//   console.log("old length: ", addresses.length)

//   function onlyUnique(value, index, self) {
//     return self.indexOf(value) === index
//   }
//   var res = addresses.filter(onlyUnique)
//   console.log("new length: ", res.length)
// })
