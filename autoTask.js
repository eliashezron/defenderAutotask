const ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_withdrawerAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]
const CONTRACT = "0xE81B360050221377AFbb980c828792146Dc81612"
const { ethers } = require("ethers")
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers")

/**
 * @param {string} recipient  recipient address
 * @param {string} token  token address
 * @param {ethers.signer} signer ethers signer for sending transaction
 * @param {string} contract contract address
 * @param {uint256} amount amount to send
 */

async function main(recipient, amount, token, signer) {
  const contract = new ethers.Contract(CONTRACT, ABI, signer)
  const tx = await contract.withdraw(recipient, token, amount)
  await tx.wait(1)
  console.log(
    `withdrawed ${amount} of ${token} to ${recipient}, the transaction reciet is ${tx.hash}`
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
  const token = event.request.body.token
  await main(recipient, amount, token, signer)
}
// exported for runing locally
exports.main = main
