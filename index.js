window.addEventListener('load', async () => {
  // New web3 provider
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // ask user for permission
      await ethereum.enable();
      // user approved permission
    } catch (error) {
      // user rejected permission
      console.log('user rejected permission');
    }
  }
  // Old web3 provider
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // no need to ask for permission
  }
  // No web3 provider
  else {
    console.log('No web3 provider detected');
  }
  console.log(window.web3.currentProvider)

  const SDXOContract = new web3.eth.Contract([{
      "anonymous": false,
      "inputs": [{
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [{
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [{
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }],
      "name": "balanceOf",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
      }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }],
      "stateMutability": "view",
      "type": "function"
    }
  ], '0x954A89Fcb39FB9526D3E2235f6bD443A4DcCf4b0');

  var account;

  web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
      alert("Error retrieving accounts.");
      return;
    }
    if (accounts.length == 0) {
      alert("No account found! Make sure the Ethereum client is configured properly.");
      return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    web3.eth.defaultAccount = account;
  });


  SDXOContract.methods.transfer('0x12B8411929E85fbc1b0BEc799a81c4C27493001C', // To
  web3.utils.toBN(10 * 10 ** 18)).send({
      from: '0x0a6ef45945A8E19C467b965d2E4f8ef759145B92' // From
  }).then(function(tx) {
    console.log("Transaction: ", tx);

    // API to get transactions, contract address and wallet address is parameter:
    // https://api-testnet.bscscan.com/api?module=account&action=tokentx&contractaddress=0x954a89fcb39fb9526d3e2235f6bd443a4dccf4b0&address=0x0a6ef45945A8E19C467b965d2E4f8ef759145B92&page=1&offset=100&sort=asc&apikey=QKD4NQZ6JK4MBATJNX9IFJMAVTRXCZJ585
    // Will give transaction hash after 10-15 seconds when transaction is completed
    // Till that time we can store the transaction as pending in the local storage along with timestamp, once the promise is resolved we can remove it from local storage

    });
});
