import Web3 from 'web3';

let web3;
const loadweb3 = async()=>{
    if (window.ethereum) {
        
        try {
            web3 = new Web3(window.ethereum);
          await window.ethereum.send("eth_requestAccounts");
          
        //   console.log(web3,"web3")
        } catch (err) {
          alert(err.message);
        }
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
};

// loadweb3();
// console.log(web3,"hallo");
export  {web3,loadweb3};