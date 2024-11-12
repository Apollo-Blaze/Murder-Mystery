import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import end from '../assets/end.jpg';

const EndPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { result, killerName } = location.state || {};

  // Story reveal content, dynamically changes based on whether the user guessed correctly
  const message = killerName
    ? `Congratulations! You guessed the killer correctly.`
    : `Oops! The Murderer was Clara. Better luck next time!`;

  const storyReveal = [
    {
      title: "The Motive",
      content: `Mr. Blackwood planned to entrust his company and estate to Clara, his loyal caretaker. This decision, revealed in a confidential document, left Alice and Bob—his business partner and brother—out of his will. Clara, sensing Alice and Bob might interfere with Blackwood's plans, decided to act to secure her control.`,
    },
    {
      title: "The Missing Document",
      content: `A document in the study outlined Mr. Blackwood's plans to give Clara control over the estate, bypassing Alice and Bob. Clara found and hid this document to ensure no one else could learn of her favored position.`,
    },
    {
      title: "The Suspicious Clues",
      content: `1. Locket: Clara's locket was found near the crime scene, hinting at her involvement.
      \n2. Broken Picture: The broken picture on the wall in the study hinted at a struggle, possibly between Clara and Mr. Blackwood.
      \n3. Perfume in the Kitchen: Witnesses noticed an unfamiliar perfume scent in the kitchen—later linked to Clara, who wore that same scent.
      \n4. Garden Whispering: Clara overheard Alice and Bob conspiring in the garden, prompting her urgency to act.
      \n5. Footsteps on the Balcony: Bob spotted Clara retreating from the balcony after the murder, casting suspicion on her, though he initially pointed to Alice.`,
    },
    {
      title: "The Final Reveal",
      content: `Clara, fearing she'd lose her place and Mr. Blackwood's legacy would be betrayed, planned and executed his murder. She left misleading clues, framing Alice and Bob to cover her own tracks. Her deep loyalty to Mr. Blackwood's vision, mixed with jealousy and fear, drove her to the ultimate crime.`,
    },
  ];

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${end})` }} // Corrected line
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black bg-opacity-90 p-8 rounded-3xl text-center text-white min-w-[300px] max-w-2xl max-h-[70vh] overflow-y-auto custom-scrollbar">
          <h1 className="text-4xl font-bold mb-4">Game Over</h1>
          <p className="text-lg mb-6">{message}</p>

          {/* Story Reveal Section */}
          <div className="text-left text-white mt-6 space-y-4">
            {storyReveal.map((section, index) => (
              <div key={index} className="mb-4">
                <h2 className="text-2xl font-semibold">{section.title}</h2>
                <p className="text-sm opacity-80 mt-2 whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>

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
        <p className="text-sm opacity-75">Developed by Apollo Blaze.</p>
      </div>
    </div>
  );
};

export default EndPage;
