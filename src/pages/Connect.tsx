import { useState } from "react";
import { motion } from "framer-motion";
import Web3 from "web3";
import { Wallet2, Loader2 } from "lucide-react";

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
    };
  }
}

const Connect = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  const handleConnect = async () => {
    if (window.ethereum) {
      setIsConnecting(true);
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error("Connection failed:", error);
        alert("Connection failed. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    } else {
      alert("Please install MetaMask to use this wallet connector!");
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[320px] sm:max-w-[380px] md:max-w-[440px] glassmorphism rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 md:space-y-8"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center animate-glow"
        >
          MetaConnect
        </motion.h1>

        <div className="flex justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32"
          >
            <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-20" />
            <Wallet2 className="text-purple-400 relative z-10 w-full h-full" />
          </motion.div>
        </div>

        {!isConnected ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 bg-purple-600 hover:bg-purple-700 rounded-lg button-glow text-white font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center space-x-2 transition-colors"
          >
            {isConnecting ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span>Connecting...</span>
              </>
            ) : (
              <span>Connect to MetaMask</span>
            )}
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="p-3 sm:p-4 rounded-lg glassmorphism">
              <p className="text-xs sm:text-sm text-gray-300 mb-1">
                Connected Wallet
              </p>
              <p className="text-sm sm:text-base md:text-lg font-mono break-all">
                {`${address.slice(0, 6)}...${address.slice(-4)}`}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDisconnect}
              className="w-full py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 bg-red-600 hover:bg-red-700 rounded-lg button-glow text-white font-semibold text-sm sm:text-base md:text-lg transition-colors"
            >
              Disconnect
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Connect;
