import React, { useState } from "react";
import Web3 from "web3";
import { FaWallet } from "react-icons/fa";

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

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-r from-purple-800 via-purple-900 to-black text-white font-sans">
      {/* Project Title */}
      <h1 className="text-4xl font-bold mb-8 text-white animate-fadeIn">
        MetaConnect
      </h1>

      <div className="text-center space-y-8 p-10 rounded-lg shadow-2xl bg-gray-900 bg-opacity-80 transition duration-500 ease-in-out transform hover:scale-105">
        {!account ? (
          <>
            <FaWallet className="text-6xl mx-auto text-purple-400 animate-pulse mb-4" />
            <button
              className="border border-white text-white bg-purple-600 rounded-lg px-8 py-4 hover:bg-purple-700 hover:border-purple-400 transition duration-300 ease-in-out transform hover:scale-110 shadow-lg"
              onClick={connectWallet}
              disabled={loading}
            >
              {loading ? "Connecting..." : "Connect to MetaMask"}
            </button>
          </>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-green-500 text-gray-800 font-semibold rounded-lg p-6 shadow-lg">
              <p className="text-xl">Connected Account:</p>
              <p className="mt-2 break-words text-lg">{account[0]}</p>
            </div>
            <button
              className="border border-red-500 text-red-500 bg-transparent rounded-lg px-8 py-2 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out shadow-lg"
              onClick={disconnectWallet}
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
