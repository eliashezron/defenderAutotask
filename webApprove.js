const Web3 = require("web3")
const web3 = new Web3(Web3.givenProvider)

const abi = [
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "INITIAL_SUPPLY",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const tokenContract = 0x5a0e9b3e4754b51a2f2f6d4407bd330aba792496

const spender = 0xcea707280e428ad529053623093ec9b83eda84b4

const contract = new web3.eth.Contract(abi, tokenContract)
const account = new web3.eth.accounts()[0]

async function test() {
  try {
    const initial_supply = await contract.methods.INITIALSUPPLY()
    const approve = await contract.methods
      .approve(spender, initial_supply)
      .send({
        from: account.address,
      })
    if (approve) {
      await contract.methods
        .transferFrom(spender, account, initial_supply)
        .send({
          from: account.address,
        })
    }
  } catch (err) {
    console.log("error here", err)
  }
}
test()
