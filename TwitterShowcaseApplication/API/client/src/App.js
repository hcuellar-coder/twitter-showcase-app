import React from 'react';
import Home from './components/Home';
import Search from './components/Search';
import RandomTweet from './components/RandomTweet';
import { Route } from 'react-router';
import './App.css';
import Layout from './components/Layout';

function App() {
  return (
    <div className="app-div">
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/search' component={Search} />
        <Route path='/random-tweet' component={RandomTweet} />
      </Layout>
    </div>
  );
}

export default App;
