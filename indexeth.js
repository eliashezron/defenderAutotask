const { main } = require("./autoTaskEth")
const RECIPIENT = "0xdB01d94217308046a792D864b16A35837aa52B86"
const { ethers } = require("ethers")
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers")
const apiKey = "Gwwi1bCcNcPcWD4TgLGNc8mQkngYLF2t"
const apiSecret =
  "fpc2Z1Uppk8aEr77sDakCoZ4H5uw3FrL9fNGxEjFn4UEUd4JFvqatxRZ749vyaHV"
const creds = { apiKey, apiSecret }
const provider = new DefenderRelayProvider(creds)
const signer = new DefenderRelaySigner(creds, provider, {
  speed: "fastest",
  gasLimit: 100000,
})
const recipient = RECIPIENT
const amount = ethers.utils.parseUnits("0.001", 18)


main(recipient, amount, signer)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
