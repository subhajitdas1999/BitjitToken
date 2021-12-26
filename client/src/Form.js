import React, { useState } from "react";
import swal from "sweetalert";
import { web3 } from "./web3";
import "./Form.css";
import ethLogo from "./eth_logo.svg";
function From({ blockchainData, setBlockchainData, accounts, setIsLoading }) {
  const [tokenBuyData, setTokenBuyData] = useState({
    tokenBuyPrice: "",
    tokenBuyAmount: "",
  });

  const handleChange = async (e) => {
    if (e.target.name === "tokenBuyAmount") {
      let x = String(e.target.value * blockchainData.tokenPrice);
      if (parseInt(e.target.value) > process.env.REACT_APP_MAXIMUM_TOKEN_ACCOUNT_BUY) {
        //maximum 100 ether a user can pay , which is almost 100000 token
        console.log("tobig");
      } else {
        setTokenBuyData((prev) => {
          return {
            ...prev,
            ["tokenBuyPrice"]:
              web3.utils.fromWei(x) === "0" ? "" : web3.utils.fromWei(x),
            [e.target.name]: e.target.value,
          };
        });
      }
    } else {
      let x = String(
        web3.utils.toWei(e.target.value || "0") / blockchainData.tokenPrice
      );

      if (parseInt(e.target.value) > process.env.REACT_APP_MAXIMUM_ETHER_ACCOUNT_SPEND) {
        //seting maximum ether a user can pay is 100

        console.log("big");
      } else {
        setTokenBuyData((prev) => {
          return {
            ...prev,
            ["tokenBuyPrice"]: e.target.value,
            ["tokenBuyAmount"]: x === "0" ? "" : x,
          };
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("enter Buy");
    // console.log(accounts);
    try {
      await blockchainData.tokenSaleInstance.methods
        .buyTokens(tokenBuyData.tokenBuyAmount)
        .send({
          from: accounts[0],
          value: web3.utils.toWei(tokenBuyData.tokenBuyPrice),
        });
      // const acc = await web3.eth.getAccounts();

      const currentAccountTokens = await blockchainData.tokenInstance.methods
        .balanceOf(accounts[0])
        .call();
      const tokenSold = await blockchainData.tokenSaleInstance.methods
        .tokenSold()
        .call();
      setBlockchainData((prev) => {
        return {
          ...prev,
          ["tokenSold"]: tokenSold,
          ["currentAccountTokens"]: currentAccountTokens,
        };
      });
      swal({
        title: "Successful",
        icon: "success",
      });
    } catch (err) {
      swal({
        title: "Oops!! Transaction Error",
        icon: "error",
      });
      
    }


    setTokenBuyData((prev) => {
      return {
        ...prev,
        ["tokenBuyPrice"]: "",
        ["tokenBuyAmount"]: ""
      };
    });
    

    setIsLoading(false);
  };

  return (
    <div className="From">
      <form className="form__container" onSubmit={handleSubmit}>
        <div className="token-logo"></div>
        <div className="token-title">BITJIT</div>
        <div className="tokenPrice__InEther">
          <div>0.001 </div>
          <img src={ethLogo} alt="" width="35px" />
        </div>

        <div className="buy__info">
          <label>BUY FOR</label>
          <input
            type="number"
            name="tokenBuyPrice"
            placeholder="Ether"
            value={tokenBuyData.tokenBuyPrice}
            onChange={handleChange}
          />
          <label>QUANTITY</label>
          <input
            type="number"
            name="tokenBuyAmount"
            placeholder="Bitjit"
            value={tokenBuyData.tokenBuyAmount}
            onChange={handleChange}
            placeholder="BITJIT"
          />

          <button className="form__btn">Buy</button>
        </div>
      </form>
    </div>
  );
}

export default From;
