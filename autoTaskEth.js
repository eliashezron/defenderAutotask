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
  },
]
const CONTRACT = "0x068726825cadC89558D8f9173b4782E6A170cEcd"
const { DefenderRelayProvider } = require('defender-relay-client/lib/web3');
const Web3 = require('web3');

/**
 * @param {string} recipient  recipient address
 * @param {web3.eth.providers} provider signer for sending transaction
 * @param {string} contract contract address
 * @param {uint256} amount amount to send
 */

async function main(recipient, amount, provider) {
  const web3 = new Web3(provider);
  const [from] = await web3.eth.getAccounts();
  const contract = new web3.eth.Contract(ABI, CONTRACT, { from });
  await contract.methods.withdrawEth(recipient, amount).send()
  .on('receipt', function(receipt){
    // receipt example
    console.log(`withdrawed ${amount} to recipient ${recipient} with transaction hash ${receipt.transactionHash} and status ${receipt.status}`);
  })  
}
// entry point for autotask

exports.handler = async function (event) {
  const provider = new DefenderRelayProvider(event, { speed: 'fast' });
  // Use web3 instance for querying or sending txs, for example...
  const recipient = event.request.body.recipient
  const amount = event.request.body.amount
  await main(recipient, amount, provider)
}
// exported for runing locally
exports.main = main
