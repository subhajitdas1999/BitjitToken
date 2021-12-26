// SPDX-License-Identifier: MIT

pragma solidity >=0.7.1 <0.9.0;

import "./BitjitToken.sol";

contract BitjitTokenSale{
    address admin;
    BitjitToken public tokenContract;
    uint public tokenPrice;
    uint public tokenSold;

    //events

    event Sell(address buyer,uint amount);

    constructor(BitjitToken _tokenContract,uint _tokenPrice){
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice ;
    }

    function multiply(uint256 a, uint256 b) internal pure returns (uint256 c) {
        require(b==0 || (c = a*b )/b ==a);
    }

    function buyTokens(uint _numberOfTokens) public payable{
        //need correct amount of money
        require (msg.value == multiply(_numberOfTokens,tokenPrice),"You need to send correct amount");
        //this sale contract should have tokens left
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens ,"tokens number exceeded");

        //transfering the token to msg sender
        require(tokenContract.transfer(msg.sender, _numberOfTokens), "Sorry something went wrong on transfering");

        tokenSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public{
        //only admin can end 
        require(msg.sender == admin ,"Only admin can call this function");

        //transfer remaining tokens to the admin
        require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))),"Something went wrong when tranfering remaining tokens to the admin");

        //destroy the contract
        selfdestruct(payable(admin));
    }
}