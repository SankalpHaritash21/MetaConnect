import React, { useState } from "react";
import Web3 from "web3";

const App = () => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum.isMetaMask) {
      setLoading(true);
      const web3Provider = new Web3(window.ethereum);
      const accounts = await web3Provider.eth.requestAccounts();
      setAccount(accounts);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-purple-700 via-purple-900 to-black text-white">
      <div className="text-center space-y-6 p-8 rounded-lg shadow-lg bg-gray-800">
        {account && account.length > 0 ? (
          <div className="p-6 rounded-lg bg-green-600 text-black font-semibold text-xl">
            Connected Account:
            <div className="flex gap-x-3">
              <div className="mt-2">Address:</div>
              <p className="mt-2 break-words">{account[0]}</p>
            </div>
          </div>
        ) : (
          <button
            className="border border-white text-white bg-purple-500 rounded-lg px-8 py-4 hover:bg-purple-600 transition duration-300 shadow-lg transform hover:scale-105"
            onClick={connectWallet}
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect to MetaMask"}
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
