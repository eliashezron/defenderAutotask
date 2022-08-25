// importin the web3 package
const Web3 = require("web3")

const web3 = new Web3("https://rinkeby.infura.io/v3/{INFURA API KEY}")
const contractAddress = "YOUR CONTRACT ADDRESS"

const ABI = ["ABI TO THE FUNCTIONS YOU WANT TO CALL"]

const contract = new web3.eth.Contract(ABI, contractAddress)

const account = "THE ACCOUNT ADDRESS SENDING THE TRANSACTION"

const privatekey = "YOUR PRIVATE KEY TO SIGN THE TRANSACTION"

const nounce = web3.eth.getTransactionCount(account)
// transaction objec t sent with the transaction
const tx = {
  chainId: 4,
  from: account,
  gas: 100000,
  nounce: nounce,
  gasPrice: 200000,
  nonce: nounce,
  value: Web3.utils.toWei("0.15", "ether"),
  data: contract.methods.fund().encodeABI(),
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
// to make call tranmactions, use contract.methods.mymethod({params}).call
async function amountFunded() {
  try {
    const x = await contract.methods.amountFunded().call()

    console.log("this is x", x)
  } catch (err) {
    console.log("this is an err", err)
  }
}
// amountFunded()
sendTransaction()
amountFunded()
