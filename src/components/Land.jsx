import {React,useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import introImage from '../assets/intro.jpg'; // Background image for the intro page
import incidentReport from '../assets/report.jpg'; // Incident report image

const LandPage = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    function calculateTimeLeft() {
      const now = new Date();
      let nextSunday = new Date();
      nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7)); // Set to next Sunday
      nextSunday.setHours(18, 0, 0, 0); // Set to 6:00 PM
  
      const difference = nextSunday - now;
      if (difference < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
  
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
      return () => clearInterval(timer);
    }, []);

  return (
    <div className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${introImage})` }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center space-x-44">
          {/* Left side content (story, suspects, etc.) */}
          <div className="bg-black bg-opacity-70 p-8 rounded-3xl text-center text-white min-w-[300px] max-w-2xl max-h-[70vh] overflow-y-auto custom-scrollbar">
            <h1 className="text-3xl font-bold mb-4">Congratulations on reaching here!!</h1>
            <p className="text-lg mb-6 text-center">
             The case will be revealed after:
            </p>
            
            <motion.div 
            className="bg-gradient-to-r from-violet-600 to-violet-950 text-white px-10 py-6 rounded-lg shadow-xl text-2xl font-bold mt-6 text-center flex justify-center items-center space-x-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            >
            <div className="flex flex-col items-center">
                <span className="text-5xl font-extrabold">{timeLeft.days}</span>
                <span className="text-sm uppercase tracking-widest opacity-80">Days</span>
            </div>
            <span className="text-4xl font-extrabold">:</span>
            <div className="flex flex-col items-center">
                <span className="text-5xl font-extrabold">{timeLeft.hours}</span>
                <span className="text-sm uppercase tracking-widest opacity-80">Hours</span>
            </div>
            <span className="text-4xl font-extrabold">:</span>
            <div className="flex flex-col items-center">
                <span className="text-5xl font-extrabold">{timeLeft.minutes}</span>
                <span className="text-sm uppercase tracking-widest opacity-80">Minutes</span>
            </div>
            <span className="text-4xl font-extrabold">:</span>
            <div className="flex flex-col items-center">
                <span className="text-5xl font-extrabold">{timeLeft.seconds}</span>
                <span className="text-sm uppercase tracking-widest opacity-80">Seconds</span>
            </div>
            </motion.div>

          </div>
        </div>
      </div>
      <div className="absolute bottom-4 w-full text-center text-white">
        <p className="text-sm opacity-75">Developed by Apollo Blaze.</p>
      </div>
    </div>
  );
};

export default LandPage;
