import React from 'react';
import Home from './components/Home';
import UserSearch from './components/UserSearch';
import RandomTweet from './components/RandomTweet';
import { Route } from 'react-router';
import './App.css';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/user-search' component={UserSearch} />
        <Route path='/random-tweet' component={RandomTweet} />
      </Layout>
    </div>
  );
}

export default App;
