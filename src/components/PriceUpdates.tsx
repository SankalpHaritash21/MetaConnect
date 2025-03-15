import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { CryptoPrice } from "../types";

const PriceUpdates = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 3,
              page: 1,
              sparkline: true,
            },
          }
        );
        setPrices(response.data);
        setLastUpdate(new Date());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prices:", error);
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatSparklineData = (sparklinePrices: number[]) => {
    return sparklinePrices.map((price, index) => ({
      time: index,
      price: price,
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-32 sm:h-40 md:h-48 space-y-3 sm:space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-4 border-purple-500 border-t-transparent"></div>
        <p className="text-purple-300 text-sm sm:text-base md:text-lg">
          Loading market data...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-300">
          Live Crypto Prices
        </h2>
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-purple-300">
          <RefreshCw size={12} className="animate-spin sm:w-4 sm:h-4" />
          <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {prices.map((crypto) => (
          <motion.div
            key={crypto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="glassmorphism rounded-xl p-3 sm:p-4 md:p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-purple-500 rounded-full filter blur-3xl opacity-10 -translate-y-12 translate-x-12"></div>

            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg md:text-xl font-bold truncate">
                {crypto.name}
              </h3>
              <span className="text-xs sm:text-sm bg-purple-500 bg-opacity-20 px-2 py-1 rounded-full uppercase ml-2">
                {crypto.symbol}
              </span>
            </div>

            <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
              <div className="space-y-1">
                <span className="text-lg sm:text-xl md:text-3xl font-bold">
                  ${crypto.current_price.toLocaleString()}
                </span>
                <div
                  className={`flex items-center text-xs sm:text-sm ${
                    crypto.price_change_percentage_24h >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {crypto.price_change_percentage_24h >= 0 ? (
                    <TrendingUp size={12} className="mr-1 sm:w-4 sm:h-4" />
                  ) : (
                    <TrendingDown size={12} className="mr-1 sm:w-4 sm:h-4" />
                  )}
                  <span>
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="h-20 sm:h-24 md:h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={formatSparklineData(crypto.sparkline_in_7d.price)}
                >
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={
                      crypto.price_change_percentage_24h >= 0
                        ? "#34D399"
                        : "#F87171"
                    }
                    strokeWidth={1.5}
                    dot={false}
                  />
                  <XAxis dataKey="time" hide />
                  <YAxis hide domain={["auto", "auto"]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.9)",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      color: "#fff",
                      padding: "8px 12px",
                    }}
                    formatter={(value: number) => [
                      `$${value.toFixed(2)}`,
                      "Price",
                    ]}
                    labelFormatter={() => ""}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PriceUpdates;
