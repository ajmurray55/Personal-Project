import React from "react";
import "./Header.css";
import { connect } from "react-redux";
import { getSession } from "../../redux/reducer";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleMenu: false,
      logout: false,
      navigate: false
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

  toggleMenuFunc() {
    this.setState({
      toggleMenu: !this.state.toggleMenu
    });
  }
  logout() {
    axios.get("/auth/logout").then(() => {
      // this.props.setUser(null)
      // this.props.history.push("/")
      console.log(this.props)
      this.setState({
        navigate: true
      })
    })
    // this.setState({
    //   loggedIn: false
    // })
    // axios
    //   .get("/auth/logout")
    //   .then(() => {
    //     this.props.updateUser({});
    //   }).then(res => {
    //     this.props.setUser(res.data);
        // this.props.history.push("/")
    //   })
    //   .catch(err => console.log(err));
  }

  render() {
    console.log(this.props);
    const { navigate } = this.state;

    if (navigate){
      return <Redirect to="/" push={true} />
    }

    return (
      <div className="headDiv">
        <header>
          <img
            className="phoneImg"
            alt="phoneImg"
            src="https://www.svgrepo.com/show/6099/broken-phone-in-two-parts.svg"
          />
          {/* <div className="titleContainer"> */}
          <Link className="title" to="/">
            Phone Fixer
          </Link>
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
          </nav>

          {this.props.loading ? (
            <h1>waiting...</h1>
          ) : this.props.loggedIn ? (
            <h1 className="welcome">
              Welcome {this.props.user.username}{" "}
              
                <button type="submit" onClick= {() => {
                  this.setState({
                    loggedIn: false
                  })
                  this.logout()
                }}>
                  Log Out
                </button>
              
            </h1>
          ) : null  }

          <div className="buttondiv">
            <button className="menuButton">
              <img
                className="hamburger"
                alt="hamburger"
                src="data:image/jpeg;base64,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"
                onClick={() => this.toggleMenuFunc()}
              />
            </button>
          </div>
        </header>
        <nav
          className={
            this.state.toggleMenu ? "mobile-menu-show" : "mobile-menu-hide"
          }
        >
          <Link className="title" to="/">
            Phone Fixer
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
  getSession
};

export default connect(mapStatetoProps, mapDispatchToProps)(Header);
