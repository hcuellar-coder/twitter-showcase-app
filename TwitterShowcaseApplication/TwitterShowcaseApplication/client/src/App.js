import React from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import UserSearch from './components/UserSearch';
import RandomTweet from './components/RandomTweet';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Home />
      <UserSearch />
      <RandomTweet />
    </div>
  );
}

export default App;
