import React, { useState } from "react";
import swal from "sweetalert";
import { web3, loadweb3 } from "./web3";
import getTokenSaleInstance from "./TokenSaleInstance";
import getTokenInstance from "./TokenInstance";
import Form from "./Form";
// import dotenv
import "./App.css";

function App() {
  const [accounts, setAccounts] = useState([]);
  const [blockchainData, setBlockchainData] = useState({
    tokenInstance: "",
    tokenSaleInstance: "",
    tokenPrice: "",
    tokenSold: "",
    currentAccountTokens: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLoggedIn = async () => {
    try {
      await loadweb3();
      const accounts = await web3.eth.getAccounts();
      const tokenInstance = await getTokenInstance();
      const tokenSaleInstance = await getTokenSaleInstance();
      const tokenPrice = await tokenSaleInstance.methods.tokenPrice().call();
      const tokenSold = await tokenSaleInstance.methods.tokenSold().call();
      const currentAccountTokens = await tokenInstance.methods
        .balanceOf(accounts[0])
        .call();

      setBlockchainData({
        tokenInstance: tokenInstance,
        tokenSaleInstance: tokenSaleInstance,
        tokenPrice: tokenPrice,
        tokenSold: tokenSold,
        currentAccountTokens: currentAccountTokens,
      });

      if (accounts.length !== 0) {
        setAccounts(accounts);
      } else {
        setAccounts([]);
      }
    } catch (err) {
      swal({
        title: "Something went wrong",
        text: "Note: The contract is deployed at Rinkeby Network .\ncheck your network and try again",
        icon: "error",
      });
      
    }
  };

  return (
    <div className="App">
      
      {accounts.length !== 0 ? (
        <div className="app__view">
          <div className="app_view__heading">
            ICO is live for Subhajit's Universe
          </div>
          <div className="app__view__ac__detail">
            Your account have {blockchainData.currentAccountTokens} Bitjit Token
          </div>
          <div className="app__view_BuyContainer">
            {/* <h3>{blockchainData.tokenSold}/750000 token already sold</h3> */}
            <div className="app__view__progress__box">
              <div className="app__view__sellPersent">
                <svg>
                  <circle cx="70" cy="70" r="70"></circle>
                  <circle
                    cx="70"
                    cy="70"
                    r="70"
                    style={{
                      strokeDashoffset:
                        440 -
                        (440 *
                          ((blockchainData.tokenSold * 100) / process.env.REACT_APP_TOKEN_FOR_CROWEDSALE).toFixed(
                            2
                          )) /
                          100,
                    }}
                  ></circle>
                  {/* applying the percentage to calculate the round */}
                </svg>
                <div className="app__view__textPersent">
                  <h2>
                    {((blockchainData.tokenSold * 100) / process.env.REACT_APP_TOKEN_FOR_CROWEDSALE).toFixed(2)}{" "}
                    <span>%</span>
                    {/* This is the formula to calculate what percentage is already sold */}
                  </h2>
                </div>
              </div>
              <h2>{blockchainData.tokenSold} / {process.env.REACT_APP_TOKEN_FOR_CROWEDSALE} Tokens sold</h2>
            </div>
            <Form
              blockchainData={blockchainData}
              setBlockchainData={setBlockchainData}
              accounts={accounts}
              setIsLoading={setIsLoading}
            />
          </div>

          <div className="app__view__ac__detail">
            You are connected with {accounts[0]}{" "}
          </div>
          <div className={isLoading ? "loader show" : "loader"}>
            <div className="spinner"></div>
            <div className="loader__text">Loading..</div>
          </div>
        </div>
      ) : (
        <div className="app__logIn">
          <h1>Welcome to Subhajit's Universe</h1>
          
          <div className="app__logIn__card">
            <p>Welcome</p>
            <button className="btn" onClick={handleLoggedIn}>
              <svg
                width="200px"
                height="60px"
                viewBox="0 0 180 60"
                className="border"
              >
                <polyline
                  points="179,1 179,59 1,59 1,1 179,1"
                  className="bg-line"
                />
                <polyline
                  points="179,1 179,59 1,59 1,1 179,1"
                  className="hl-line"
                />
              </svg>
              <span>Login To Universe</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
