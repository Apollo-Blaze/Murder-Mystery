import React from 'react';
import aliceImg from '../assets/alice.png';
import bobImg from '../assets/bob.png';
import claraImg from '../assets/clara.png';

const Suspect = ({ name, onClick }) => {
  // Map each suspect name to its corresponding image
  const suspectImages = {
    Alice: aliceImg,
    Bob: bobImg,
    Clara: claraImg,
  };

  return (
    <div 
      className="relative mt-4 mb-4 bg-gray-800 rounded-3xl overflow-hidden flex flex-col  items-center h-96 w-72 cursor-pointer pb-0 pt-9" 
      onClick={() => onClick(name)}
    >
      <p className="text-2xl font-semibold text-white mb-6 align-top">{name}</p>
      <img 
        src={suspectImages[name]} 
        alt={name} 
        className=" relative object-cover self-end" 
      />
    </div>
  );
};

export default Suspect;
