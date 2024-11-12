import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroPage from './components/Intro';
import EndPage from './components/EndPage';
import Home from './components/Home'; // If you have this as the main page
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <Router
      // Enable both future flags
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,  // Enable relative splat path resolution
      }}
    >
      <Analytics />
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/end" element={<EndPage />} />
      </Routes>
    </Router>
  );
};

export default App;
