import React, { useEffect, useState } from "react"
import Header from "./components/header.jsx"
import Body from "./components/Body.jsx"
import web3 from "./web3"
import { getData } from "./service.js"

function App() {
  let [account, setAccount] = useState("")
  // let [metamaskConnected, setMetamaskConnected] = useState(false)
  let [data, setData] = useState(null)
  let accounts = []

  useEffect(() => {
    ;(async function() {
      accounts = await web3.eth.getAccounts()
      if (accounts.length !== 0) {
        setAccount(accounts[0])
        // setMetamaskConnected(true)
        // console.log("connected")
      }
    })()
    getData().then(data => {
      setData(data)
    })
  }, [])

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", () => {
      // console.log("changed")
      setAccount(window.ethereum.selectedAddress)
      getData().then(data => {
        setData(data)
      })
    })
  }

  return (
    <div className="App">
      <p>
        <a className="git_link" href="https://github.com/ronmnm/staking-pool-ui">
          Github
        </a>
      </p>
      <Header account={account} />
      <Body data={data} setData={setData} account={account} />
    </div>
  )
}

export default App
