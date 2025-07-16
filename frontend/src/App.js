import React, { useState } from 'react';
import './App.css';
import { Sidebar, MainContent, Player } from './components';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <MainContent activeTab={activeTab} />
      </div>
      <Player />
    </div>
  );
}

export default App;