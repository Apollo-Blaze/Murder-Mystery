import React from 'react';
import { motion } from 'framer-motion';
import aliceImg from '../assets/alice.png';
import bobImg from '../assets/bob.png';
import claraImg from '../assets/clara.png';

const Suspect = ({ name, onClick, selected }) => {
  // Map each suspect name to its corresponding image
  const suspectImages = {
    Alice: aliceImg,
    Bob: bobImg,
    Clara: claraImg,
  };

  return (
    <motion.div
      className={`relative mt-4 mb-4 rounded-3xl overflow-hidden flex flex-col items-center min-h-96 max-w-72 max-h-96 min-w-72 cursor-pointer pb-0 pt-9 
        ${selected ? 'border-4 border-white bg-gray-800' : ''}`}
      onClick={() => onClick(name)}
      initial={{ scale: 1 }}
      animate={{ scale: selected ? 1.1 : 1 }}
      whileHover={{ scale: !selected?1.05:1.1 }}  // Enlarge on hover
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <p className="text-2xl font-semibold text-white mb-6 align-top">{name}</p>
      <img 
        src={suspectImages[name]} 
        alt={name} 
        className="relative object-cover self-end z-0" 
      />
    </motion.div>
  );
};

export default Suspect;
