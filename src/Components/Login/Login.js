import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../redux/reducer";
import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      register: false,
      registerFailed: false,
      loggedInFailed: false
    };
  }

  // componentDidMount(){
  //   console.log('login mounted')
  // }

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  login = (username, password) => {
    let body = { username, password };
    console.log("body", body);
    axios.post("/auth/login", body)
    .then(res => {
      this.props.setUser(res.data);
      this.props.history.push("/store");
    }).catch(err => {
      this.setState({
        loggedInFailed: true
      })
    })
    
   
    // console.log("res", res);
  };

  register = (username, email, password) => {
    let newUser = { username, email, password };
    axios.post("/auth/register", newUser)
    .then(res => {
      this.props.setUser(res.data);
      this.props.history.push("/store")
    }).catch(err => {
      this.setState({
        registerFailed: true
      })
    });
    
  };

  render() {
    // console.log("from login: ", this.props.user);
    return (
      <div className="body">
        {!this.state.register ? (
          <div className="loginOuterBox">
            <div className="loginInnerBox">
              <h1 className="titleText">Login</h1>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.login(this.state.username, this.state.password);
                }}
              >
                <div className="login_inputs">
                  <label>Username:</label>
                  <input
                    onChange={this.changeHandler}
                    type="text"
                    name="username"
                    value={this.state.username}
                  />
                  <label>Password:</label>
                  <input
                    onChange={this.changeHandler}
                    type="password"
                    name="password"
                    value={this.state.password}
                  />
                  <input type="submit" value="Login" />
                </div>
              </form>
              {this.state.loggedInFailed
              ?
              <p className="error">Incorrect username and/or password</p>
              :
              <p></p>
              }
              <div className="Reg_text"></div>
              <label className="Reg_text">Don't have an account? </label>
              <label className="discount">
                Register Today for a Special Discount on Screen Replacements!!
              </label>
              <button
                className="LogButton"
                onClick={() => this.setState({ register: true })}
              >
                Register
              </button>
            </div>
          </div>
        ) : (
          <div className="registerOuterBox">
            <div className="registerInnerBox">
              <h1 className="titleText">Register</h1>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.register(
                    this.state.username,
                    this.state.email,
                    this.state.password
                  );
                }}
              >
                <div className="login_inputs">
                  {" "}
                  <label>Username:</label>
                  <input
                    onChange={this.changeHandler}
                    type="text"
                    name="username"
                    value={this.state.username}
                  />
                  <label>Email:</label>
                  <input
                    onChange={this.changeHandler}
                    type="text"
                    name="email"
                    value={this.state.email}
                  />
                  <label>Password:</label>
                  <input
                    onChange={this.changeHandler}
                    type="password"
                    name="password"
                    value={this.state.password}
                  />
                  <input type="submit" value="Register" />
                  
                </div>
              </form>
              {
                this.state.registerFailed
                ?
                <p className="error">That user already exists! Please use an alternate email</p>
                :
                <p></p>
              }
              <label className="Reg_text">Already have an account?</label>
              <button
                className="LogButton"
                onClick={() => this.setState({ register: false })}
              >
                Login
              </button>
            
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
  setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
