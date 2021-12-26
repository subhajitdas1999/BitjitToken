const BitjitToken = artifacts.require("BitjitToken");
const BitjitTokenSale = artifacts.require("BitjitTokenSale");
require("dotenv").config({path:'../client/.env'});



module.exports = async (deployer) => {
  // console.log(process.env.REACT_APP_VAL,"yrryeiryyreryer")
  await deployer.deploy(BitjitToken,process.env.REACT_APP_INITIAL_TOKENS,"Bitjit Token","Bitjit");
  await deployer.deploy(BitjitTokenSale,BitjitToken.address,process.env.REACT_APP_PRICE_OF_A_TOKEN_IN_WEI);
    

};
