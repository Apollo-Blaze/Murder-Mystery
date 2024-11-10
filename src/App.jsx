import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import IntroPage from './components/Intro';
import EndPage from './components/EndPage';
import Home from './components/Home'; // If you have this as the main page
import { Analytics } from "@vercel/analytics/react"

const App = () => {
  return (
    <Router>
       <Analytics/>
      <Switch>
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/end" element={<EndPage />} />
      </Switch>
    </Router>
  );
};

export default App;
