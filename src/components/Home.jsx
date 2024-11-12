import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Suspect from './Suspect.jsx';
import ActionButton from './ActionButton.jsx';
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [clues, setClues] = useState({
        locket: false,
        will: false,
        frame: false,
        weapon: false,
        scent: false,
    }); // Track discovered clues
    const [isNotepadOpen, setIsNotepadOpen] = useState(false);

    const toggleNotepad = () => {
        setIsNotepadOpen(!isNotepadOpen);
    };

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

                    // Check if the response contains any clue keywords and update the state
                    if (data.response.includes("locket")) {
                        setClues(prevClues => ({ ...prevClues, locket: true }));
                    }
                    if (data.response.includes("document")) {
                        setClues(prevClues => ({ ...prevClues, will: true }));
                    }
                    if (data.response.includes("picture frame")) {
                        setClues(prevClues => ({ ...prevClues, frame: true }));
                    }
                    if (data.response.includes("letter opener")) {
                        setClues(prevClues => ({ ...prevClues, weapon: true }));
                    }
                    if (data.response.includes("perfume")) {
                        setClues(prevClues => ({ ...prevClues, scent: true }));
                    }
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
         {/* Navbar */}
         {!isLoading &&(<nav className="z-100 bg-gray-800 text-white p-4 fixed z-40 w-full ">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">Ravenswood Murder</div>

                        {/* Desktop Menu */}
                        <ul className="hidden sm:flex space-x-4">
                            {locations.map((loc) => (
                                <li key={loc}>
                                    <Link
                                        to="#"
                                        onClick={() => changeLocation(loc)}
                                        className={`px-3 py-2 rounded-md transition-all duration-200 ${
                                            location === loc ? 'text-red-700 font-bold' : 'hover:text-gray-300 '
                                        }`}
                                    >
                                        {loc.charAt(0).toUpperCase() + loc.slice(1)}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="sm:hidden text-2xl bg-transparent"
                        >
                            ☰
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="sm:hidden bg-gray-800 p-2">
                            {locations.map((loc) => (
                                <Link
                                    key={loc}
                                    to="#"
                                    onClick={() => {
                                        changeLocation(loc);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="block px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-700"
                                >
                                    {loc.charAt(0).toUpperCase() + loc.slice(1)}
                                </Link>
                            ))}
                        </div>
                    )}
                </nav>)}
                

            <div className={`relative z-0 bg-${location} bg-cover min-h-fit bg-center px-4`}>
                {isLoading && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: ['-100%', '0%', '100%'] }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                        className="fixed inset-0 bg-sky-950 z-50"
                    />
                )}

               

                

                {/* Main Content */}
                <div className={`min-h-full bg-${location} bg-hero-pattern bg-repeat bg-center flex flex-col items-center justify-start pt-10 `}>
                    {/* Character Selection and Controls */}
                    {showControls && (
                        <>
                            <div className="flex flex-col sm:flex-row gap-4 mb-6 px-8 py-4 w-fit rounded-3xl mt-12 sm:mt-0 md:mt-10 md:px-10 md:py-8"
                                style={{ backgroundColor: 'rgba(72, 72, 92, 0.8)' }}
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

                            <button
                                onClick={toggleNotepad}
                                className="px-4 py-4 bg-blue-500 bg-opacity-70 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 fixed top-36 right-4 sm:top-32 sm:right-8 z-40"
                            >
                                📒
                            </button>

                            {/* Notepad Modal */}
                            <AnimatePresence>
  {isNotepadOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ x: -150 }}
        animate={{ x: 0 }}
        exit={{ x: 150 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="bg-yellow-300 text-black p-4 w-fit mt-10 text-center pr-7"
      >
        <h2 className="text-3xl mb-4 font-bold">Clues Discovered</h2>
        <ul className="text-xl pl-5">
          <li>
            {clues.locket ? '✅ Locket' : '???'}
            <hr className="border-gray-600 my-2" />
          </li>
          <li>
            {clues.weapon ? '✅ Weapon (Fingerprint of Clara)' : '???'}
            <hr className="border-gray-600 my-2" />
          </li>
          <li>
            {clues.will ? "✅ Will (Company's Control)" : '???'}
            <hr className="border-gray-600 my-2" />
          </li>
          <li>
            {clues.scent ? '✅ Perfume (Kitchen)' : '???'}
            <hr className="border-gray-600 my-2" />
          </li>
          <li>
            {clues.frame ? '✅ Broken Frame (Clara’s Photo)' : '???'}
            <hr className="border-gray-600 my-2" />
          </li>
        </ul>
        <button
          onClick={toggleNotepad}
          className="mt-4 px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

                            {/* Input and Action Buttons */}
                            <div className="flex flex-col items-center justify-center bg-gray-800 px-6 py-6 md:px-10 md:py-10 rounded-xl max-w-full max-h-fit">
                                <div className="flex flex-wrap items-center gap-4 w-full max-w-2xl">
                                    <input
                                        type="text"
                                        value={userInput}
                                        onChange={handleUserInputChange}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSubmitInput();
                                        }}
                                        placeholder="Interrogate the suspect..."
                                        className="flex-grow px-4 py-2 border rounded-md text-white bg-gray-700 placeholder-gray-400 focus:outline-none w-full sm:w-auto"
                                    />
                                    <ActionButton onClick={handleSubmitInput} text="Interrogate" />
                                    <button
                                        onClick={openModal}
                                        disabled={!clues.weapon || !clues.will || !clues.frame}  // Disable button if any clue is missing
                                        className={`px-4 py-2 rounded-md ${
                                            killerChosen || !clues.weapon || !clues.will || !clues.frame
                                                ? 'bg-gray-500 cursor-not-allowed'
                                                : 'bg-red-500 hover:bg-red-700 text-white'
                                        }`}
                                    >
                                        Choose Killer
                                    </button>
                                </div>
                            </div>


                        </>
                    )}

                    {/* Typing Effect Response */}
                    {showControls && (<div className="flex justify-center mt-4 w-full">
                        <div
                            className="typing-response-container font-semibold text-black bg-slate-100 p-4 rounded-3xl w-full max-w-3xl border-black border-4 overflow-y-auto max-h-64 break-words whitespace-pre-wrap custom-scrollbar"
                            style={{ minHeight: '3rem', marginBottom: '4rem' }}
                        >
                            <p>{displayedResponse || 'Start interrogating the suspects...'}</p>
                        </div>
                    </div>)}
                </div>

                {/* Modal for Killer Choice */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-gray-800 p-6 rounded-md shadow-lg">
                            <h2 className="text-xl mb-4">Choose the Killer</h2>
                            <div className="flex gap-7 mb-6">
                                {['Alice', 'Bob', 'Clara'].map((suspect) => (
                                    <button
                                        key={suspect}
                                        onClick={() => handleKillerChoice(suspect)}
                                        className={`px-4 py-2 rounded-md ${chosenKiller === suspect ? 'bg-red-500 text-white' : 'hover:bg-gray-900'}`}
                                    >
                                        {suspect}
                                    </button>
                                ))}
                            </div>
                            <button onClick={submitKillerChoice} className="px-6 py-2 bg-green-500 text-white rounded-md">Submit</button>
                            <button onClick={closeModal} className="ml-4 px-6 py-2 bg-gray-300 text-black rounded-md">Cancel</button>
                        </div>
                    </div>
                )}
                {/* Toggle Button */}
                {!isMobileMenuOpen && (<div className="fixed top-24 right-4 sm:top-20 sm:right-8 z-40">
                    <button
                        onClick={() => setShowControls(!showControls)}
                        className="px-4 py-2 bg-blue-500 bg-opacity-60 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                    >
                        {showControls ? 'Hide Controls' : 'Show Controls'}
                    </button>
                </div>)}
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