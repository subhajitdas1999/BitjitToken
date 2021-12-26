const BitjitToken = artifacts.require("BitjitToken");

contract("BitjitToken",(accounts)=>{
    it("Checking Balance of the BitjitToken",async()=>{
        let instance =await BitjitToken.deployed();
        
        let totalSupply = await instance.totalSupply();

        let balanceOfOwner = await instance.balanceOf(accounts[0])

        assert.equal(totalSupply.toNumber(),balanceOfOwner.toNumber(),"Not matching");
        
    });
    it("Checking name and symbol",async()=>{
        let instance =await BitjitToken.deployed();
        
        let name = await instance.name();

        let symbol = await instance.symbol();

        assert.equal(name,"Bitjit Token","Not matching");
        assert.equal(symbol,"Bitjit","Not matching");
        
    });

    it("Transfer Token Owner Ship",async()=>{
        let instance =await BitjitToken.deployed();
        
        let recipt = await instance.transfer(accounts[1],1000);
        let tmp = await instance.balanceOf(accounts[1]);
        

        assert.equal(tmp.toNumber(),1000);
        
    });

    it("Create an approve",async()=>{
        let instance =await BitjitToken.deployed();
        
        let reciept = await instance.approve(accounts[2],1000);
        let allowenceToken = await instance.allowence(accounts[0],accounts[2]);
        assert.equal(allowenceToken.toNumber(),1000);
        
        
    });

    it("Create an allowence and use it",async()=>{
        const [primaryAcc,secondaryAcc,thirdAcc] = accounts;
        let instance =await BitjitToken.deployed();
        
        let reciept = await instance.approve(secondaryAcc,100);
        
        await instance.transferFrom(primaryAcc,thirdAcc,100,{from:secondaryAcc})

        let thirdAccBal = await instance.balanceOf(thirdAcc);

        assert(thirdAccBal.toNumber(),100);
        
        
    });
});