const ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_withdrawerAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawEth",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]
const CONTRACT = "0x068726825cadC89558D8f9173b4782E6A170cEcd"
const { ethers } = require("ethers")
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers")

/**
 * @param {string} recipient  recipient address
 * @param {ethers.signer} signer ethers signer for sending transaction
 * @param {string} contract contract address
 * @param {uint256} amount amount to send
 */

async function main(recipient, amount, signer) {
  const contract = new ethers.Contract(CONTRACT, ABI, signer)
  const tx = await contract.withdrawEth(recipient, amount)
  await tx.wait(1)
  console.log(
    `withdrawed ${amount} of  ${recipient}, the transaction reciet is ${tx.hash}`
  )
}
// entry point for autotask

exports.handler = async function (event) {
  const provider = new DefenderRelayProvider(event)
  const signer = new DefenderRelaySigner(event, provider, { speed: "fast" })
  //   const [event] = request.params.body.matchReasons
  //   console.log(`recieved match ${JSON.stringify(event)}`)
  console.log(event)
  const recipient = event.request.body.recipient
  const amount = event.request.body.amount

  await main(recipient, amount, signer)
}
// exported for runing locally
exports.main = main
