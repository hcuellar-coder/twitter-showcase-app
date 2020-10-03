import React from 'react';
import Home from './components/Home';
import UserSearch from './components/UserSearch';
import RandomTweet from './components/RandomTweet';
import Layout from './components/Layout';
import { Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/user-search' component={UserSearch} />
        <Route exact path='/random-tweet' component={RandomTweet} />
      </Layout>
    </div>
  );
}

export default App;
