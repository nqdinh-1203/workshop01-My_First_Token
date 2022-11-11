require("dotenv").config();

const Web3 = require("web3");
const tokenAbi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const tokenAddress = "0x3f5ec04aA1BD9DBABD119d767AeBb476a8EC3bf5";
const owner = process.env.PUBLIC_KEY;
let receiverAddress = "0x6eAADf156DDF029D43281CdbC30002C97276a557";

var myPrivateKey = process.env.PRIVATE_KEY;

async function interact() {
    let web3 = await new Web3("https://eth-goerli.alchemyapi.io/v2/GMGOq5IweL2FmHvrCa2v_H8ISKknDtUu");
    const tokenContract = await new web3.eth.Contract(tokenAbi, tokenAddress);

    // Call function from contract.
    // Call: mình chỉ đọc thông tin từ blockchain -> k trả phí gas
    let myBalance = await tokenContract.methods.balanceOf(owner).call();
    console.log(myBalance);
    
    // Send: tương tác với blockchain, tạo transaction -> trả phí gas
    await web3.eth.accounts.wallet.add(myPrivateKey);
    receiverBalanceBefore = await tokenContract.methods.balanceOf(receiverAddress);

    let result = await tokenContract.methods.transfer(receiverAddress, 1000).send({
        from: owner,
        gas: 3000000
    });

    receiverBalanceAfter = await tokenContract.methods.balanceOf(receiverAddress);

    console.log(result, receiverBalanceBefore, receiverBalanceAfter);
}

interact();
