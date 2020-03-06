import React from "react";
import "./Header.css";
import { connect } from "react-redux";
import { getSession, setUser, logout } from "../../redux/reducer";
import { Link, withRouter } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false
    };
    this.logout = this.logout.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.props.getSession();
  }

  updateUser(user) {
    this.setState({
      user
    });
  }

  toggleMenuFunc = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu
    });
  };
  logout() {
    this.props.logout()
    this.props.history.push('/')
  }

  render() {
    console.log(this.props);
  
    return (
      <div className="headDiv">
        <header>
          <Link to="/">
            <img
              className="phoneImg"
              alt="phoneImg"
              src="https://www.svgrepo.com/show/6099/broken-phone-in-two-parts.svg"
            />
          </Link>
          {/* <div className="titleContainer"> */}
          <h1 className="title" to="/">
           AZ Smart Repair
          </h1>
          <nav className="navigation">
            <Link className="navTitles" to="/about">
              About
            </Link>
            <Link className="navTitles" to="/store">
              Store
            </Link>
            <Link className="navTitles" to="/cart">
              Cart
            </Link>
            <Link className="navTitles" to="/appointments">
              Appointments
            </Link>
            {/* <div className="username"> */}
            {this.props.loading ? (
              <h1>waiting...</h1>
            ) : this.props.loggedIn ? (
              <h1 className="welcome">
                {" "}
                Welcome {this.props.user.username}{" "}
                
                  <button
                    className="logOut"
                    type="submit"
                    onClick={() => this.logout()}
                  >
                    Log Out
                  </button>
               
              </h1>
            ) : null}
          </nav>

          <div className="buttondiv">
            
              <img
                className="menuButton"
                alt="hamburger"
                src="https://i.ya-webdesign.com/images/3-bar-menu-png-1.png"
                onClick={() => this.toggleMenuFunc()}
              />
          
          </div>
        </header>
        <nav
          className={
            this.state.toggleMenu ? "mobile-menu-show" : "mobile-menu-hide"
          }
        >
          <Link className="navTitles" to="/">
            Home
          </Link>
          <Link className="navTitles" to="/about">
            About
          </Link>
          <Link className="navTitles" to="/store">
            Store
          </Link>
          <Link className="navTitles" to="/cart">
            Cart
          </Link>
          <Link className="navTitles" to="/appointments">
            Appointments
          </Link>
        </nav>
      </div>
    );
  }
}

const mapStatetoProps = state => state;

const mapDispatchToProps = {
  getSession,
  setUser,
  logout
};

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Header));
