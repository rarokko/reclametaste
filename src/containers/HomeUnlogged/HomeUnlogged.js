import React, { Component } from 'react';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import Request from '../../helpers/Request/Request';
import TibiaIcon from '../../assets/img/tibia-icon.png';

import './HomeUnlogged.scss';

export class HomeUnlogged extends Component {

  constructor() {
    super();

    this.scrollValue = 0;
    
    this.registerSection = React.createRef();
    this.header = React.createRef();

    this.state = {
      errorOnLogin: false,
      errorOnRegister: false,
      registerInputs: {
        email: "",
        password: ""
      },
      loginInputs: {
        email: "",
        password: ""
      }
    }
  }

  handleRegisterChange(event) {

    let inputName = event.target.type;
    let value = event.target.value;

    this.setState((state, props) => {
      return {
        registerInputs: {
          ...state.registerInputs,
          [inputName]: value
        }
      };
    });
  };

  handleLoginChange(event) {

    let inputName = event.target.type;
    let value = event.target.value;

    this.setState((state, props) => {
      return {
        loginInputs: {
          ...state.loginInputs,
          [inputName]: value
        }
      };
    });
  };

  registerUser(event) {
    event.preventDefault();

    let registerInputs = this.state.registerInputs;

    Request.registerUser(registerInputs.email, registerInputs.password)
      .catch((err) => {
        this.setState((state, props) => {
          return {
            errorOnRegister: true
          }
        })
      });
  }

  loginUser(event) {
    event.preventDefault();

    let loginInputs = this.state.loginInputs;

    Request.loginUser(loginInputs.email, loginInputs.password)
      .catch((err) => { 
        this.setState((state, props) => {
          return {
            errorOnLogin: true
          }
        })
       });
  }

  goToRegister() {
    this.registerSection.current.scrollIntoView({behavior: "smooth"});
  }

  handleScroll() {
    if (document.documentElement.scrollTop > this.scrollValue) {
      this.header.current.style.opacity = 0;
    } else {
      this.header.current.style.opacity = 1;
    }

    this.scrollValue = document.documentElement.scrollTop;
  }

  componentDidMount() {
    window.onscroll = () => this.handleScroll();
  }


  render() {
    return (
      <div className="home-unlogged-wrapper">

        <section ref={this.header} id="home-unlogged-header" className="home-unlogged-header-section">

          <header>
            <form onSubmit={(event) => this.loginUser(event)} className="rt-flex-container">
              <div className="rt-input-group">
                <Input value={this.state.loginInputs.email} onChange={(event) => this.handleLoginChange(event)} type="email" placeholder="Email" required />
                <Input value={this.state.loginInputs.password} onChange={(event) => this.handleLoginChange(event)} type="password" placeholder="Password" required />
                <Button>Login</Button>
                {this.state.errorOnLogin &&
                  <p>Invalid user or password</p>
                }
              </div>

            </form>
          </header>

        </section>

        <section id="home-unlogged-main" className="rt-flex-container">

          <div className="rt-flex-item home-unlogged-main-left">
            <h1>Reclame<span className="home-unlogged-color-secundary">Taste</span> <i><img src={TibiaIcon} alt="tibia"/></i></h1>
            <p>Organize all your favorite tastes in one place</p>
          </div>

          <div className="rt-flex-item home-unlogged-main-right">
            <Button onClick={(event) => this.goToRegister(event)}>Register now</Button>
          </div>

        </section>

        <section ref={this.registerSection} id="home-unlogged-register" className="rt-flex-container">

          <div className="rt-flex-item">
            <h2>JOIN US</h2>

            <form onSubmit={(event) => this.registerUser(event)}>
              <Input value={this.state.registerInputs.email} onChange={(event) => this.handleRegisterChange(event)} type="email" placeholder="Email" required />
              <Input value={this.state.registerInputs.password} onChange={(event) => this.handleRegisterChange(event)} type="password" placeholder="Password" required />
              <Button>Register</Button>
              {this.state.errorOnRegister &&
                  <p>Could not register. Please try with other credentials or try again later.</p>
              }
            </form>

          </div>

        </section>

      </div>
    )
  }

}