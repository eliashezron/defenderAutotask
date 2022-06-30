const { main } = require("./autoTaskbnb")
const RECIPIENT = "0xdB01d94217308046a792D864b16A35837aa52B86"
const { ethers } = require("ethers")
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers")
const apiKey = "6AvrFvWYPExrV8cr3af1h1sMxoFrZpoe"
const apiSecret = "cRKPC1Ad3D4nPW7oCBZ1rJBySsrufJqSQX4u26DgbXspLNujyyEcewEa6ArVFkMk"
const creds = { apiKey, apiSecret }
const provider = new DefenderRelayProvider(creds)
const signer = new DefenderRelaySigner(creds, provider, {
  speed: "fastest",
  gasLimit: 100000,
})
const recipient = RECIPIENT
const amount = ethers.utils.parseEther("0.05")

main(recipient, amount, signer)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
