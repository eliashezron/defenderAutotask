const { main } = require("./autoTaskEth")
const RECIPIENT = "0xdB01d94217308046a792D864b16A35837aa52B86"
const { ethers } = require("ethers")
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers")
const apiKey = "BbHbDvkiXBP38JtSRXSSuerBNmuX9jb2"
const apiSecret =
  "DX88JuuiHq6TReUwQTo8yWfZ8WxQxrQHH3kfzK5mUTYi8FfCBhifY5vyVYEhVr5C"
const creds = { apiKey, apiSecret }
const provider = new DefenderRelayProvider(creds)
const signer = new DefenderRelaySigner(creds, provider, {
  speed: "fastest",
  gasLimit: 100000,
})
const recipient = RECIPIENT
const amount = ethers.utils.parseEther("0.001")

main(recipient, amount, signer)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
