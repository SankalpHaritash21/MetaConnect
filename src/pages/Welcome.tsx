import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Wallet2, Sparkles, Shield, Zap } from 'lucide-react';
import PriceUpdates from '../components/PriceUpdates';

const Welcome = () => {
  const navigate = useNavigate();

  const features = [
    { icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Secure MetaMask Integration" },
    { icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Real-time Wallet Status" },
    { icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />, text: "Live Cryptocurrency Updates" },
  ];

  return (
    <div className="min-h-screen px-4 py-6 sm:p-6 md:p-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center mb-8 md:mb-12"
        >
          {/* Hero Section */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold animate-glow leading-tight"
            >
              MetaConnect
            </motion.h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-200 max-w-xl mx-auto md:mx-0">
              Your Gateway to Web3 - Seamlessly connect your wallet and track crypto prices in real-time
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/connect')}
              className="px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-purple-600 rounded-xl button-glow text-white font-semibold text-sm sm:text-base md:text-lg w-full sm:w-auto"
            >
              Get Started
            </motion.button>
          </div>

          {/* Animated Icon */}
          <motion.div
            className="flex justify-center order-first md:order-last"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
              <Wallet2 className="text-purple-400 relative z-10 w-full h-full" />
            </div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 md:mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="glassmorphism rounded-xl p-3 sm:p-4 md:p-6 flex flex-row sm:flex-row items-center space-x-3 sm:space-x-4"
            >
              <div className="p-2 sm:p-3 bg-purple-500 bg-opacity-20 rounded-lg shrink-0">
                {feature.icon}
              </div>
              <p className="text-sm sm:text-base md:text-lg font-medium">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Price Updates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="glassmorphism rounded-xl p-3 sm:p-4 md:p-6 lg:p-8"
        >
          <PriceUpdates />
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;