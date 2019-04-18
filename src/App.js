import React, { Component } from 'react';
import { HomeUnlogged } from './containers/HomeUnlogged/HomeUnlogged';
import { HomeMarvel } from './containers/HomeMarvel/HomeMarvel';
import { HomeBeer } from './containers/HomeBeer/HomeBeer';
import { Header } from './components/Header/Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import logo from './logo.svg';
import fire from './helpers/Firebase/Firebase';
import Request from './helpers/Request/Request';
import './App.css';

library.add(faHeart, farHeart, faSearch);

class App extends Component {

  constructor() {
    super();

    this.state = {
      auth: false
    }
  };

  render() {

    if (this.state.auth === false) {
      return (
        <div />
      )
    } else {

      const userSession = Request.checkUserSession();

      return (
        <Router>
          {userSession &&
            <Header />
          }
          <Route exact path="/" component={!userSession ? HomeUnlogged : HomeMarvel} />
          <Route exact path="/marvel" component={!userSession ? HomeUnlogged : HomeMarvel} />
          <Route exact path="/beer" component={!userSession ? HomeUnlogged : HomeBeer} />
        </Router>
      );
    }
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {
      this.setState({ auth: true })
    })
  }
}

export default App;
