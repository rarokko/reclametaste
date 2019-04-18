import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Request from '../../helpers/Request/Request';
import './Header.scss';

export class Header extends Component {

  constructor() {
    super();

    let pathname = window.location.pathname;
    pathname = pathname.indexOf('/', 1) > 0 ? pathname.substring(1, pathname.indexOf('/', 1)) : pathname.substring(1, pathname.length);

    this.state = {
      activePage: pathname !== "" ? pathname : 'marvel'
    };
  };

  logout() {
    Request.logoutUser();
  }

  handlePageChange(pathname) {

    this.setState((state, props) => {
      return {
        activePage: pathname
      }
    });
  }

  render() {
    return (
      <header>
        <nav className="rt-header-nav">
          <div>
            <Link to="/marvel" onClick={() => this.handlePageChange('marvel')} >
              <button data-active={this.state.activePage === "marvel" ? 'true' : 'false'}>Marvel</button>
            </Link>
            <Link to="/beer" onClick={() => this.handlePageChange('beer')} >
              <button data-active={this.state.activePage === "beer" ? 'true' : 'false'}>Beer</button>
            </Link>
          </div>
          <button onClick={() => this.logout()}>Logout</button>
        </nav>
      </header>
    )
  }
}