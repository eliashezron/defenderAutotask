const { main } = require("./autoTask")
const RECIPIENT = "0xdB01d94217308046a792D864b16A35837aa52B86"
const TOKEN = "0xBCC84aB2ab1f84dC002EE2e6d5DE521c981453F3"
const { ethers } = require("ethers")
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers")
const apiKey = "your api key from openzeppelin defender-relay-client"
const apiSecret = "your api secret from openzeppelin defender-relay-client"
const creds = { apiKey, apiSecret }
const provider = new DefenderRelayProvider(creds)
const signer = new DefenderRelaySigner(creds, provider, {
  speed: "fastest",
  gasLimit: 100000,
})
const recipient = RECIPIENT
const token = TOKEN
const amount = ethers.utils.parseEther("0.001")

main(recipient, amount, token, signer)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
