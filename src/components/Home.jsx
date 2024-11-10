import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Suspect from './Suspect';
import ActionButton from './ActionButton';
import '../App.css';
import Music from '../assets/music.mp3';

const Home = () => {
    const [location, setLocation] = useState('garden'); // default location
    const [selectedSuspect, setSelectedSuspect] = useState(null);
    const [killerChosen, setKillerChosen] = useState(false); // Track if killer is chosen
    const [userInput, setUserInput] = useState(''); // Store the input from the user
    const [response, setResponse] = useState(''); // Full model response
    const [displayedResponse, setDisplayedResponse] = useState(''); // Typing effect response
    const [isModalOpen, setIsModalOpen] = useState(false); // Track if modal is open
    const [chosenKiller, setChosenKiller] = useState(''); // Store chosen killer
    const [showControls, setShowControls] = useState(true); // Track visibility of controls
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // Loading state for location change
    const audioRef = useRef(new Audio(Music));

    useEffect(() => {
        audioRef.current.play();
        audioRef.current.loop = true; 
        setIsPlaying(true);
    }, []);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const locations = ['garden', 'diningRoom', 'kitchen', 'study', 'basement', 'balcony'];
    const navigate = useNavigate();

    const changeLocation = (newLocation) => {
      setTimeout(() => {
        setLocation(newLocation);  // Change location after 5 ms delay
    }, 1000);  // Update location immediately to change the background
      setIsLoading(true);        // Start loading animation
      setTimeout(() => {
          setIsLoading(false);   // Stop loading after animation completes
      }, 2000); // Match this duration with the animation duration
  };

    const handleSuspectClick = (suspectName) => {
        setSelectedSuspect(selectedSuspect === suspectName ? null : suspectName); // Toggle selection
    };
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleKillerChoice = (killer) => {
        setChosenKiller(killer);
    };

    const submitKillerChoice = () => {
        fetch('https://murder-mystery-qnnb.onrender.com/choose_killer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chosen_killer: chosenKiller }),
        })
            .then((res) => res.json())
            .then((data) => {
                const isCorrect = data.isAlive;
                setKillerChosen(data.isAlive);
                navigate('/end', { state: { isCorrect, killerName: data.isAlive } });
                closeModal();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('There was an error choosing the killer.');
            });
    };

    const handleUserInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const handleSubmitInput = () => {
        if (selectedSuspect && userInput) {
            fetch('https://murder-mystery-qnnb.onrender.com/ask_character', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ character: selectedSuspect.toLowerCase(), user_input: userInput }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setResponse(data.response.trim()); // Trim leading/trailing spaces
                    setDisplayedResponse(''); // Reset displayed response for typing effect
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setResponse('There was an error processing your request.');
                });
        } else {
            alert('Please select a suspect and enter your question.');
        }
        setUserInput("");
    };

    // Typing effect
    useEffect(() => {
        if (response) {
            let index = -1;
            const typingInterval = setInterval(() => {
                setDisplayedResponse((prev) => prev + response.charAt(index));
                index++;

                if (index >= response.length) {
                    clearInterval(typingInterval);
                }
            }, 50); // Adjust speed by changing the interval time

            // Cleanup on unmount
            return () => clearInterval(typingInterval);
        }
    }, [response]);

    return (
      <>
          <div className={`relative z-0 bg-${location} bg-cover min-h-fit bg-center`}>
          {/* Loading Overlay */}
          {isLoading && (
            <motion.div
              initial={{ x: '-100%' }}     // Start off-screen on the left
              animate={{ x: ['-100%','0%','100%'] }}        // Slide in to fully cover the screen
              exit={{ x: '-100%' }}        // Slide back out to the left
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="fixed inset-0 bg-sky-950 z-50"
            />
          )}
              {/* Navbar */}
              <nav className="z-100 bg-gray-800 text-white p-4 sticky">
                  <div className="flex justify-between items-center">
                      <div className="text-xl font-bold">Murder Mystery</div>
                      <ul className="flex space-x-4">
                          {locations.map((loc) => (
                              <li key={loc}>
                                  <Link
                                      to="#"
                                      onClick={() => changeLocation(loc)}
                                      className={`px-3 py-2 rounded-md ${location === loc ? 'text-red-700 font-bold' : 'hover:bg-gray-600'}`}
                                  >
                                      {loc.charAt(0).toUpperCase() + loc.slice(1)}
                                  </Link>
                              </li>
                          ))}
                      </ul>
                  </div>
              </nav>
                {/* Toggle Button */}
                <div className="fixed top-20 right-8">
                    <button
                        onClick={() => setShowControls(!showControls)}
                        className="px-4 py-2 bg-blue-500 bg-opacity-60 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        {showControls ? 'Hide Controls' : 'Show Controls'}
                    </button>
                </div>

{/* Main Content */}
<div className={`min-h-full ${location} bg-hero-pattern bg-repeat bg-center flex flex-col items-center justify-start pt-10`}>
    {/* Character Selection and Controls */}
    {showControls && (
        <>
            <div
                className="flex gap-16 mb-6 justify-center px-10 py-8 w-fit rounded-3xl"
                style={{
                    backgroundColor: 'rgba(72, 72, 92, 0.8)',
                }}
            >
                {['Alice', 'Bob', 'Clara'].map((suspect) => (
                    <Suspect
                        key={suspect}
                        name={suspect}
                        onClick={handleSuspectClick}
                        selected={selectedSuspect === suspect}
                    />
                ))}
            </div>

            {/* Input and Action Buttons */}
            <div className="inline-flex gap-4 bg-gray-800 px-8 py-8 justify-center rounded-3xl">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleUserInputChange}
                    placeholder="Interrogate the suspect..."
                    className="px-4 py-2 border rounded-md text-white min-w-96"
                />
                <ActionButton onClick={handleSubmitInput} text="Interrogate" />
                <button
                    onClick={openModal}
                    disabled={killerChosen}
                    className={`px-4 py-2 rounded-md ${killerChosen ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                >
                    Choose Killer
                </button>
            </div>
        </>
    )}

    {/* Typing Effect Response, Positioned Below */}
    {showControls && (
    <div className="flex justify-center mt-4 w-full">
        <div className="typing-response-container font-semibold text-black bg-slate-100 p-4 rounded-3xl w-full max-w-3xl border-black border-4 overflow-y-auto max-h-64 break-words whitespace-pre-wrap custom-scrollbar"
        style={{ minHeight: '3rem', marginBottom: '4rem' }}>
            <p >{displayedResponse? displayedResponse:'Start interrogating the suspects by choosing them and asking them questions'}</p>
        </div>
    </div>
)}


</div>


                {/* Modal for Killer Choice */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-gray-800 p-6 rounded-md shadow-lg">
                            <h2 className="text-xl mb-4">Choose the Killer</h2>
                            <div className="flex gap-4 mb-6">
                                {['Alice', 'Bob', 'Clara'].map((suspect) => (
                                    <button
                                        key={suspect}
                                        onClick={() => handleKillerChoice(suspect)}
                                        className={`px-4 py-2 rounded-lg ${chosenKiller === suspect ? 'bg-red-500 text-white' : 'bg-blue-300'}`}
                                    >
                                        {suspect}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={submitKillerChoice}
                                className="px-6 py-2 bg-green-500 text-white rounded-md"
                            >
                                Submit
                            </button>
                            <button
                                onClick={closeModal}
                                className="ml-4 px-6 py-2 bg-gray-300 text-black rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                        
                    </div>
                )}

                {/* Footer */}


                {/* Play Music Button */}
                <button
                    onClick={togglePlayPause}
                    className="fixed bottom-8 right-8 bg-gray-800 text-white p-4 rounded-xl shadow-md focus:outline-none opacity-70 hover:opacity-95"
                >
                    {isPlaying ? '🎧' : '🔇'}
                </button>
            </div>
        </>
    );
};

export default Home;
