import BitjitTokenSale from "./contracts/BitjitTokenSale.json";
import { web3 } from "./web3";

const getTokenSaleInstance = async () => {
  const networkId = await web3.eth.net.getId();

  const networkInfo = BitjitTokenSale.networks[networkId];

  return new web3.eth.Contract(BitjitTokenSale.abi, networkInfo.address);
};

export default getTokenSaleInstance;
