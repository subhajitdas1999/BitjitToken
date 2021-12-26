import BitjitToken from "./contracts/BitjitToken.json";
import { web3 } from "./web3";

const getTokenInstance = async()=>{
    const networkId = await web3.eth.net.getId();
    const networkInfo = BitjitToken.networks[networkId];

    return new web3.eth.Contract(BitjitToken.abi,networkInfo.address);
    
}

export default getTokenInstance;