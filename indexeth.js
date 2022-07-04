  const { main } = require("./autoTaskEth")
  const { DefenderRelayProvider } = require('defender-relay-client/lib/web3');
  const Web3 = require('web3');
  const apiKey = "HK5c8sJGodJ5sW5MWgQqjsjyw3cJX2X5"
  const apiSecret = "3hcQxQbzMNftKWoFFRzsU815xor6NmziFjEYhWRgff9CqEG7hEjut2k7Rug5Ue4D"
  const creds = { apiKey, apiSecret }
  const provider = new DefenderRelayProvider(creds,{ speed: 'fastest',gasLimit: 100000})
  const recipient = "0xdB01d94217308046a792D864b16A35837aa52B86"
  const amount = Web3.utils.toWei("0.001", "ether")
  main(recipient, amount, provider)
  .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })