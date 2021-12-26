const BitjitTokenSale = artifacts.require("BitjitTokenSale");
require("dotenv").config({path:'../.env'});
const BitjitToken = artifacts.require("BitjitToken");
const tokenPrice = process.env.PRICE_OF_A_TOKEN_IN_WEI ;

contract("Checking the price of the token",(accounts)=>{
    
    it("TokenSale is deployed and price is ok",async()=>{
        let instance = await BitjitTokenSale.deployed();

        let tokenPrice = await instance.tokenPrice();

        assert.equal(tokenPrice.toNumber(),tokenPrice);

    });

    

    it("Initial token send and transfer to a account",async()=>{
        const [admin,buyer,another] = accounts;
        const initialToken = 750000;
        let buyToken = 10;
        let tokenInstance = await BitjitToken.deployed();
        let tokenSaleInstance = await BitjitTokenSale.deployed();
        // console.log(tokenSaleInstance.address,BitjitTokenSale.address);
        let reciptTransfer = await tokenInstance.transfer(BitjitTokenSale.address,initialToken,{from:admin});

        let balanceOfTokenSale = await tokenInstance.balanceOf(BitjitTokenSale.address);
        let buyRecipt = await tokenSaleInstance.buyTokens(buyToken,{from:buyer,value:buyToken*tokenPrice})
        let balanceOfBuyer = await tokenInstance.balanceOf(buyer);

        assert.equal(balanceOfTokenSale.toNumber(),initialToken);
        assert.equal(balanceOfBuyer.toNumber(),buyToken);

        
    });
        /* these two test simultaneously cause error cause of same deployed contract if you want try to deploy fresh contract */ 
    // it("end sale working properly",async()=>{
    //     const [admin,buyer,another] = accounts;
    //     const initialToken = 750000;
    //     let buyToken = 7000;
        
    //     let tokenInstance = await BitjitToken.deployed();
    //     let tokenSaleInstance = await BitjitTokenSale.deployed();
    //     console.log(await tokenInstance.balanceOf(admin));
    //     // console.log(tokenSaleInstance.address,BitjitTokenSale.address);
    //     let reciptTransfer = await tokenInstance.transfer(BitjitTokenSale.address,initialToken,{from:admin});

    //     let balanceOfTokenSale = await tokenInstance.balanceOf(BitjitTokenSale.address);
    //     let buyRecipt = await tokenSaleInstance.buyTokens(buyToken,{from:buyer,value:buyToken*tokenPrice})
    //     let balanceOfBuyer = await tokenInstance.balanceOf(buyer);

        
    //     let adminEther = await web3.eth.getBalance(admin);
    //     await tokenSaleInstance.endSale();
    //     let adminEtherAfterEndsale = await web3.eth.getBalance(admin);

    //     // console.log(parseInt(adminEther)+(buyToken*tokenPrice) , parseInt(adminEtherAfterEndsale))
        
    // });
});
