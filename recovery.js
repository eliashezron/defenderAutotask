const Web3 = require("web3")
const web3 = new Web3(Web3.givenProvider)
const abi = [
  {
    name: "destroy",
    type: "function",
    inputs: [
      {
        type: "address",
        name: "_to",
      },
    ],
  },
]
const account = new web3.eth.accounts()[0]
const tokenContract = "0x1cC7b9af52fE41E0551c530A4453eF3739F22639"

const privatekey = []

const contract = new web3.eth.Contract(abi, tokenContract)

const nounce = web3.eth.getTransactionCount(account)
// transaction objec t sent with the transaction
const tx = {
  chainId: 4,
  from: account,
  gas: 100000,
  nounce: nounce,
  gasPrice: 200000,
  nonce: nounce,
  data: contract.methods.destroy(account).encodeABI(),
}
// sign the tranaction with the Private key to make a state change
async function sendTransaction() {
  const signature = await web3.eth.accounts.signTransaction(tx, privatekey)
  // send the signed transaction to the blockchain
  await web3.eth
    .sendSignedTransaction(signature.rawTransaction)
    .on("receipt", () => {
      console.log(
        `transaction completed with ${receipt.transactionHash} and status ${receipt.status}`
      )
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      console.log(confirmationNumber, receipt)
    })
    .on("error", console.error)
}

sendTransaction()
