import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Suspect from "./Suspect.jsx";
import ActionButton from "./ActionButton.jsx";
import "../App.css";
import Music from "../assets/music.mp3";

const Home = () => {
  const [location, setLocation] = useState("garden"); // default location
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [killerChosen, setKillerChosen] = useState(false); // Track if killer is chosen
  const [userInput, setUserInput] = useState(""); // Store the input from the user
  const [response, setResponse] = useState(""); // Full model response
  const [displayedResponse, setDisplayedResponse] = useState(""); // Typing effect response
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if modal is open
  const [chosenKiller, setChosenKiller] = useState(""); // Store chosen killer
  const [showControls, setShowControls] = useState(true); // Track visibility of controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Loading state for location change
  const audioRef = useRef(new Audio(Music));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clues, setClues] = useState({
    locket: false,
    death: false,
    guest: false,
    kitchen: false,
    frame: false,
    glass: false,
    outside: false,
  }); // Track discovered clues
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [showForensic, setshowForensic] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const handleSpeechToText = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Change this to your preferred language
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

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

  const locations = [
    "garden",
    "diningRoom",
    "kitchen",
    "study",
    "library",
    "balcony",
  ];
  const navigate = useNavigate();

  const changeLocation = (newLocation) => {
    setTimeout(() => {
      setLocation(newLocation); // Change location after 5 ms delay
    }, 1000); // Update location immediately to change the background
    setIsLoading(true); // Start loading animation
    setTimeout(() => {
      setIsLoading(false); // Stop loading after animation completes
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
    fetch("https://srichand.pythonanywhere.com/choose_killer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chosen_killer: chosenKiller }),
    })
      .then((res) => res.json())
      .then((data) => {
        const isCorrect = data.isAlive;
        setKillerChosen(data.isAlive);
        navigate("/end", { state: { isCorrect, killerName: data.isAlive } });
        closeModal();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error choosing the killer.");
      });
  };

  const handleUserInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmitInput = () => {
    if (selectedSuspect && userInput) {
      fetch("https://srichand.pythonanywhere.com/ask_character", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          character: selectedSuspect.toLowerCase(),
          user_input: userInput,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setResponse(data.response.trim()); // Trim leading/trailing spaces
          setDisplayedResponse(""); // Reset displayed response for typing effect

          // Check if the response contains any clue keywords and update the state
          if (data.response.includes("locket")) {
            setClues((prevClues) => ({ ...prevClues, locket: true }));
          }
          if (data.response.includes("10")) {
            setClues((prevClues) => ({ ...prevClues, death: true }));
          }
          if (data.response.includes("9")) {
            setClues((prevClues) => ({ ...prevClues, guest: true }));
          }
          if (
            data.response.includes(
              "shoe" ||
                "shoes" ||
                "print" ||
                "shoeprint" ||
                "foot" ||
                "footprint",
            )
          ) {
            setClues((prevClues) => ({ ...prevClues, kitchen: true }));
          }
          if (data.response.includes("frame")) {
            setClues((prevClues) => ({ ...prevClues, frame: true }));
          }
          if (data.response.includes("glass")) {
            setClues((prevClues) => ({ ...prevClues, glass: true }));
          }
          if (data.response.includes("outside" && "kitchen")) {
            setClues((prevClues) => ({ ...prevClues, outside: true }));
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setResponse("There was an error processing your request.");
        });
    } else {
      alert("Please select a suspect and enter your question.");
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
      <motion.nav
        className="z-100 bg-neutral-900 text-white p-4 fixed z-40 w-full"
        initial={{ opacity: 0, y: -60 }} // Initial state before loading
        animate={{
          opacity: isLoading ? 0.5 : 1, // Animate opacity while loading
          y: isLoading ? -90 : 0, // Slight movement when loading
        }}
        exit={{
          opacity: 0,
          y: -50,
        }} // Exit animation
        transition={{ duration: 0.3 }} // Adjust speed of transition
      >
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Ravenswood Murder</div>

          {/* Desktop Menu */}
          <ul className="hidden sm:flex space-x-4">
            {locations.map((loc) => (
              <li key={loc}>
                <Link
                  to="#"
                  onClick={() => changeLocation(loc)}
                  className={`px-3 py-2 rounded-md transition-all duration-700 ${
                    location === loc
                      ? "text-red-700 font-bold"
                      : "hover:text-gray-300"
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

        {/* Mobile Menu with expanding/contracting animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="sm:hidden bg-neutral-900 p-2"
              initial={{ opacity: 0, height: 0 }} // Start with 0 height and hidden
              animate={{
                opacity: 1,
                height: "auto", // Expand to the content's natural height
              }}
              exit={{
                opacity: 0,
                height: 0, // Contract to 0 height
              }}
              transition={{ duration: 0.3 }} // Duration of the animation
            >
              {locations.map((loc) => (
                <Link
                  key={loc}
                  to="#"
                  onClick={() => {
                    changeLocation(loc);
                    setIsMobileMenuOpen(false); // Close the mobile menu after clicking
                  }}
                  className="block px-3 py-2 rounded-md transition-all duration-700 hover:bg-gray-700"
                >
                  {loc.charAt(0).toUpperCase() + loc.slice(1)}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div
        className={`relative z-0 ${showForensic ? `bg-${location}` : `bg-${location}-f`} bg-cover min-h-fit bg-center px-4`}
      >
        {isLoading && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: ["-100%", "0%", "100%"] }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="fixed inset-0 bg-sky-950 z-50"
          />
        )}
        {/* Main Content */}
        <div
          className={`min-h-full ${showForensic ? `bg-${location}` : `bg-${location}-f`} bg-hero-pattern bg-repeat bg-center flex flex-col items-center justify-start pt-10 `}
        >
          {/* Character Selection and Controls */}
          {showControls && (
            <>
              {/* Input and Action Buttons */}
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 mb-6 px-8 py-4 w-fit rounded-3xl mt-12 sm:mt-0 md:mt-10 md:px-10 md:py-8"
                  style={{ backgroundColor: "rgba(72, 72, 92, 0.8)" }}
                >
                  {["Alice", "Bob", "Clara"].map((suspect) => (
                    <Suspect
                      key={suspect}
                      name={suspect}
                      onClick={handleSuspectClick}
                      selected={selectedSuspect === suspect}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center bg-neutral-900 px-6 py-6 md:px-10 md:py-10 rounded-xl max-w-full max-h-fit"
                >
                  <div className="flex flex-wrap items-center gap-4 w-full max-w-2xl justify-center">
                    <input
                      type="text"
                      value={userInput}
                      onChange={handleUserInputChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmitInput();
                      }}
                      placeholder="Ask a question..."
                      className="flex-grow px-4 py-2 border-black focus:border-white rounded-full text-white bg-gray-700 placeholder-gray-400 focus:outline-offset-4 w-auto"
                    />
                    <button
                      onClick={handleSpeechToText}
                      disabled={isListening}
                      className="px-2 py-2 bg-transparent text-white rounded-2xl text-2xl -ml-2 -mr-2"
                    >
                      {isListening ? "Listening..." : "🎙️"}
                    </button>
                    <ActionButton
                      onClick={handleSubmitInput}
                      text="Interrogate"
                    />
                    <button
                      onClick={openModal}
                      disabled={!clues.death || !clues.guest || !clues.locket} // Disable button if any clue is missing
                      className={`px-4 py-2 rounded-md ${
                        killerChosen ||
                        !clues.death ||
                        !clues.guest ||
                        !clues.locket
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-700 text-white"
                      }`}
                    >
                      Choose Killer
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center mt-4 w-full"
                >
                  <div
                    className="typing-response-container font-semibold text-black bg-slate-100 p-4 rounded-3xl w-full max-w-3xl border-black border-4 overflow-y-auto max-h-64 break-words whitespace-pre-wrap custom-scrollbar"
                    style={{ minHeight: "3rem", marginBottom: "1rem" }}
                  >
                    <p>
                      {displayedResponse ||
                        "Start interrogating the suspects..."}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="sticky w-full text-center text-white mb-4">
            <p className="text-sm opacity-75">Developed by Apollo Blaze.</p>
          </div>
            </>
          )}
          
        </div>

        {/* Modal for Killer Choice */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-md shadow-lg">
              <h2 className="text-xl mb-4">Choose the Killer</h2>
              <div className="flex gap-7 mb-6">
                {["Alice", "Bob", "Clara"].map((suspect) => (
                  <button
                    key={suspect}
                    onClick={() => handleKillerChoice(suspect)}
                    className={`px-4 py-2 rounded-md ${chosenKiller === suspect ? "bg-red-500 text-white" : "hover:bg-gray-900"}`}
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
        {/* Toggle Button */}
        {!isMobileMenuOpen && (
          <div className="fixed top-24 right-4 sm:top-20 sm:right-8 z-40">
            <button
              onClick={() => setShowControls(!showControls)}
              className="px-4 py-2 bg-neutral-900 bg-opacity-60 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              {showControls ? "Hide Controls" : "Show Controls"}
            </button>
          </div>
        )}
        {!isMobileMenuOpen && (
          <div className="fixed top-36 right-4 sm:top-32 sm:right-8 z-40">
            <button
              onClick={() => {
                setshowForensic(!showForensic);
                setShowControls(!showControls);
              }}
              className="px-4 py-4 bg-neutral-900 bg-opacity-60 text-white rounded-3xl shadow-md hover:bg-blue-600 transition duration-300"
            >
              {showForensic ? "🔦" : "❌"}
            </button>
          </div>
        )}
        <AnimatePresence>
          {showControls && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={toggleNotepad}
              className="px-4 py-4 bg-neutral-900 bg-opacity-70 text-white rounded-3xl shadow-md hover:bg-red-600 transition duration-300 fixed top-52 right-4 sm:top-48 sm:right-8 z-40"
            >
              📒
            </motion.button>
          )}
        </AnimatePresence>
        <button
          onClick={togglePlayPause}
          className="fixed bottom-8 right-8 bg-neutral-900 text-white p-4 rounded-3xl shadow-md focus:outline-none opacity-70 hover:opacity-95"
        >
          {isPlaying ? "🎧" : "🔇"}
        </button>
        <AnimatePresence>
          {isNotepadOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            >
              <motion.div
                initial={{ x: -150 }}
                animate={{ x: 0 }}
                exit={{ x: 150 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-yellow-300 text-black p-4 w-fit mt-10 text-center pr-7"
              >
                <h2 className="text-3xl mb-4 font-bold">Clues Discovered</h2>
                <ul className="text-xl pl-5">
                  <li>
                    {clues.locket ? "✅ Locket" : "???"}
                    <hr className="border-gray-600 my-2" />
                  </li>
                  <li>
                    {clues.death ? "✅ Time of Death (10 PM)" : "???"}
                    <hr className="border-gray-600 my-2" />
                  </li>
                  <li>
                    {clues.guest ? "✅ Party ended at 9 PM" : "???"}
                    <hr className="border-gray-600 my-2" />
                  </li>
                  <li>
                    {clues.kitchen ? "✅ Muddy shoe print (Kitchen)" : "???"}
                    <hr className="border-gray-600 my-2" />
                  </li>
                  <li>
                    {clues.frame
                      ? "✅ Broken Frame (Clara’s and Blackwood’s Photo)"
                      : "???"}
                    <hr className="border-gray-600 my-2" />
                  </li>
                  <li>
                    {clues.outside ? "✅ Alice and Bob discussing" : "???"}
                    <hr className="border-gray-600 my-2" />
                  </li>
                  <li>
                    {clues.glass ? "✅ Broken Glass (Blood of Alice)" : "???"}
                    <hr className="border-gray-600 my-2" />
                  </li>
                </ul>
                <button
                  onClick={toggleNotepad}
                  className="mt-4 px-6 py-2 bg-neutral-900 text-white rounded-md hover:bg-red-600"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Home;
