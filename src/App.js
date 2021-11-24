import React from 'react';
import './App.css';
import Navbar from './Components/Nvbar/Nvbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nvbar from './Components/Nvbar/Nvbar';
import OnePlayer from './Components/OnePlayer/OnePlayer';
import TwoPlayers from './Components/TwoPlayers/TwoPlayers';
import Home from './Components/Home/Home';

  
function App() {
  return (
    
    <Router>
      <Navbar/>
      <br/>
        <Routes>
          
          <Route exact path="/" element={<Home />}/>
          <Route exact path="/home" element={<Home />}/>
          <Route exact path="/Team" element={TwoPlayers}/>
          <Route exact path="/Solo" element={<OnePlayer/>}/>
        </Routes>
    </Router>
  );
}
  
export default App;