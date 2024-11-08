import React, { useState } from 'react';
import Suspect from './components/Suspect';
import ActionButton from './components/ActionButton';
import './App.css';
import { BrowserRouter, Link } from 'react-router-dom';

function App() {
  const [location, setLocation] = useState('diningRoom'); // default location
  const [selectedSuspect, setSelectedSuspect] = useState(null);
  const [killerChosen, setKillerChosen] = useState(false); // Track if killer is chosen

  const locations = ['diningRoom', 'kitchen', 'garden', 'study', 'basement', 'balcony'];

  const changeLocation = (newLocation) => {
    console.log(newLocation);
    setLocation(newLocation);
  };

  const handleSuspectClick = (suspectName) => {
    setSelectedSuspect(suspectName);
  };

  const chooseKiller = () => {
    if (!killerChosen) {
      alert('You have chosen the killer!');
      setKillerChosen(true);
    }
  };

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary min-h-screen bg-hero-pattern bg-cover bg-no-repeat bg-center'>
        {/* Navbar */}
        <nav className='z-1000 bg-gray-800 text-white p-4 sticky'>
          <div className='flex justify-between items-center'>
            <div className='text-xl font-bold'>Murder Mystery</div>
            <ul className='flex space-x-4'>
              {locations.map((loc) => (
                <li key={loc}>
                  <Link
                    to='#'
                    onClick={() => changeLocation(loc)}
                    className='hover:bg-gray-600 px-3 py-2 rounded-md'
                  >
                    {loc.charAt(0).toUpperCase() + loc.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Content */}
        <div className={`min-h-full ${location} bg-hero-pattern bg-cover bg-no-repeat bg-center w-full pt-16`}>
          <div
            className='mt-0 flex gap-16 mb-6 justify-center py-8 ml-52 mr-52 rounded-3xl'
            style={{
              backgroundColor: 'rgba(72, 72, 92, 0.8)', // Violet color with 50% opacity
            }}
          >
            {['Alice', 'Bob', 'Clara'].map((suspect) => (
              <Suspect 
                key={suspect}
                name={suspect}
                onClick={handleSuspectClick}
                imagePath={`${suspect.toLowerCase()}`} // Path to images
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className='inline-flex gap-4 bg-gray-800 px-8 py-8 justify-center rounded-3xl'>
            <ActionButton onClick={() => alert(`Interrogating ${selectedSuspect}`)} text='Interrogate' />
            <button
              onClick={chooseKiller}
              disabled={killerChosen}
              className={`px-4 py-2 rounded-md ${killerChosen ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600 text-white'}`}
            >
              Choose Killer
            </button>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
