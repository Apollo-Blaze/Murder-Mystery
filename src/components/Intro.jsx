import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import introImage from '../assets/intro.jpg'; // Background image for the intro page
import incidentReport from '../assets/report.jpg'; // Incident report image

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${introImage})` }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center justify-center space-x-44">
          {/* Left side content (story, suspects, etc.) */}
          <div className="bg-black bg-opacity-70 p-8 rounded-3xl text-center text-white min-w-[300px] max-w-2xl max-h-[70vh] overflow-y-auto custom-scrollbar">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Ravenswood Case</h1>
            <p className="text-lg mb-6 text-left">
              Investigate Ravenswood Manor, where mystery and danger lurk in every shadow. Mr. Blackwood was found dead in the grand estate, and it's up to you, the detective, to unravel the truth behind his demise. The primary suspects are Alice, his business partner; Bob, his estranged brother; and Clara, a longtime family friend.

              <br /><br />
              <span className='font-bold text-2xl'>The Storyline:</span>
              <br />
              Welcome to the Ravenswood Manor, a grand yet ominous estate enveloped in shadow and intrigue. Mr. Reginald Blackwood, a wealthy and enigmatic figure, was found dead in his study on a stormy night. He held a powerful company whose future was filled with promise—but also peril. This future was to be overseen by someone he trusted deeply, but his decision was unknown to all but a select few. You, the detective, must piece together clues from within the manor’s eerie rooms to unveil the truth behind Mr. Blackwood’s death.
              <br /><br />
              
              <span className='font-bold text-2xl'>Suspect Profiles:</span>
              <br />
              <span className='font-bold'>1. Alice - The Business Partner:</span>
              <br />
              Alice is Mr. Blackwood’s ambitious business partner, known for her ruthlessness in pursuit of power.
              <br /><br />
              <span className='font-bold'>2. Bob - The Estranged Brother:</span>
              <br />
              Bob,  Mr. Blackwood’s estranged brother, who returned with financial troubles and a desperate need for a fresh start.
              <br /><br />
              <span className='font-bold'>3. Clara - The Family Friend:</span>
              <br />
              Clara, The family’s longtime caretaker and Mr. Blackwood’s trusted confidante, who was closer to him than anyone realized.

              <br /><br />
              <span className='font-bold text-2xl'>Key Locations:</span>
              <br />
              <span className='font-bold'>Dining Room:</span>
              <br />
              The elegant dining room sets the stage for the mystery, with its luxurious decor hiding untold secrets.
              <br /><br />
              <span className='font-bold'>Kitchen:</span>
              <br />
              The kitchen, where subtle yet curious details await discovery, could hold the key to uncovering the truth.
              <br /><br />
              <span className='font-bold'>Garden:</span>
              <br />
              The tranquil garden, with its shadowy corners, may have been the site of something more sinister during the night.
              <br /><br />
              <span className='font-bold'>Study Room:</span>
              <br />
              The study, where Mr. Blackwood’s lifeless body was discovered, is filled with relics of the past. It’s a place where many secrets were kept.
              <br /><br />
              <span className='font-bold'>Basement:</span>
              <br />
              The basement, dark and eerie, adds to the house’s mystery, with its ominous presence in the background of the story.
              <br /><br />
              <span className='font-bold'>Balcony:</span>
              <br />
              The balcony offers a stunning view of the estate, but also the potential to reveal hidden truths if one knows where to look.
              <br /><br />

              <span className='font-bold text-2xl'>Your Mission:</span>
              <br />
              As the detective, it's your job to question the suspects, explore the various locations, and piece together the story of Mr. Blackwood’s demise. Use your intuition, gather all the evidence, and determine who the killer is before it's too late!
              <br /><br />

              <span className='font-bold text-2xl'>Instructions:</span>
              <br />
              There are multiple clues in the story and you have to uncover the most important three clues to choose the killer. There is a forensic button to help you find clues.
              <br /><br />
              Good Luck!!
              <br />

            </p>
            
            <motion.button
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/home')}
            >
              Let's Investigate
            </motion.button>
          </div>

          {/* Right side image (incident report) */}
          <div className="hidden lg:block">
            <img src={incidentReport} alt="Incident Report" className="w-[350px] h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 w-full text-center text-white">
        <p className="text-sm opacity-75">Developed by Apollo Blaze.</p>
      </div>
    </div>
  );
};

export default IntroPage;
