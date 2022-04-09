// SPDX-License-Identifier: MIT

pragma solidity >=0.7.1 <0.9.0;


 contract BitjitToken {
    
    string public name;
    string public symbol;
    uint256 public totalSupply;


    mapping(address => uint) public balanceOf;
    mapping(address => mapping (address=>uint)) public allowence; //instead of create an allowence function we crate a public mapping 

    //events
    // Transfer
    // MUST trigger when tokens are transferred, including zero value transfers.
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    

    //approved
    //MUST trigger on any successful call to approve(address _spender, uint256 _value).
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);


    constructor (uint _initialSupply ,string memory _name,string memory _symbol) {        
        totalSupply = _initialSupply;
        balanceOf[msg.sender]= _initialSupply;
        name = _name;
        symbol = _symbol;
    }

    //transfer
    function transfer(address _to, uint256 _value) public  returns (bool success){
        //The function SHOULD throw if the message caller’s account balance does not have enough tokens to spend.
        require(balanceOf[msg.sender] >= _value ,"Not enough Tokens");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }


    //approve
    //approve to allow someone to use sender defined token
    function approve(address _spender, uint256 _value) public  returns (bool success){

        //allowence
        allowence[msg.sender][_spender] += _value;

        emit Approval(msg.sender, _spender, _value);
        return true;
    } 
    //transferfrom
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        //check for balances

        require(allowence[_from][msg.sender] >= _value,"You allowence is less");
        require(balanceOf[_from] >= _value,"Account not have enough balance");

        //update balance
        balanceOf[_from] -=_value;
        balanceOf[_to] += _value;

        //decrease allownece
        allowence[_from][msg.sender] -= _value;
        
        //emit events
        emit Transfer(_from, _to, _value);

        return true;

    }
}