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
const addr = "0xdB01d94217308046a792D864b16A35837aa52B86"
const tokenContract = "0x1cC7b9af52fE41E0551c530A4453eF3739F22639"

async function test() {
  if (typeof Web3 !== "undefined") {
    const web3 = new Web3(currentProvider)
    await window.ethereum.enable()

    const contract = new web3.eth.Contract(abi, tokenContract)
    const account = new web3.eth.accounts()[0]
    try {
      await contract.methods.destroy(addr).send({
        from: account.address,
      })
    } catch (err) {
      console.log("error here", err)
    }
  }
}
test()
