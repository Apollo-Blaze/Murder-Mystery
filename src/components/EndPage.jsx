import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const EndPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const { result, killerName } = location.state || {};  // Use killerName instead of killer
  
    const message = killerName
      ? `Congratulations! You guessed the killer correctly.`
      : `Oops! The Murderer was Alice. Better luck next time!`;
  
    return (
      <div className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url('/path/to/your/background.jpg')` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-70 p-8 rounded-3xl text-center text-white min-w-[300px] max-w-2xl max-h-[70vh] overflow-y-auto custom-scrollbar">
            <h1 className="text-4xl font-bold mb-4">Game Over</h1>
            <p className="text-lg mb-6">{message}</p>
  
            <motion.button
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
            >
              Play Again
            </motion.button>
          </div>
        </div>
        <div className="absolute bottom-4 w-full text-center text-white">
        <p className="text-sm opacity-75">Developed by Apollo Blaze</p>
      </div>
      </div>
    );
  };
  
  export default EndPage;
  