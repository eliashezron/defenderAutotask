const { main } = require("./autoTaskbnb")
const RECIPIENT = "0xdB01d94217308046a792D864b16A35837aa52B86"
const { ethers } = require("ethers")
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers")
const apiKey = "2yJdiD9qMCKpE9uqU76QQAvkqmBE3f51"
const apiSecret = "2mLrmqm7FLQr2VQyutJewmSyvTDg5PDuZKc85Y2Sr6ZW7FJibSmqdDMMoFG64sTY"
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
