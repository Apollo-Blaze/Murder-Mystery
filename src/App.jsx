import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './components/Intro';
import EndPage from './components/EndPage';
import Home from './components/Home'; // If you have this as the main page
import { useState } from 'react';

const App = () => {
  const [killerGuess, setKillerGuess] = useState('');

  const handleSubmitGuess = (guess) => {
    // Assume 'Alice' is the correct killer
    const correctKiller = 'Alice';
    const isCorrect = guess === correctKiller;

    // Navigate to EndPage with the result and guessed killer
    navigate('/end', { state: { result: isCorrect, killer: correctKiller } });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/end" element={<EndPage />} />
      </Routes>
    </Router>
  );
};

export default App;
