import React from "react";
import "./Store.css";
import { connect } from "react-redux";
import axios from "axios";

class Store extends React.Component {
  constructor() {
    super();
    this.state = {
      phones: [],
      manufacturer: {},
      toggleApple: false,
      toggleSamsung: false,
      toggleGoogle: false,
      Apple: [],
      Samsung: [],
      Google: [],
      foundPhone: {},
      selectedPhone: false
    };
    this.getAllPhones = this.getAllPhones.bind(this);
    this.toggleApple = this.toggleApple.bind(this);
    this.toggleSamsung = this.toggleSamsung.bind(this);
    this.toggleGoogle = this.toggleGoogle.bind(this);
  }

  getAllPhones = async manufacturer => {
    console.log("before phones", this.state.phones);
    const res = await axios.get(
      `/api/all_phones/?manufacturer=${manufacturer}`
    );
    this.setState({
      [manufacturer]: res.data
    });
  };

  getOnePhone = async id => {
    const res = await axios.get(`/api/phone/${id}`);
    console.log("res", res.data);
    this.setState({
      foundPhone: res.data
    });
  };

  componentDidMount() {
    console.log("is mounting! :) ");
    this.getAllPhones("Apple");
    this.getAllPhones("Samsung");
    this.getAllPhones("Google");
  }

  toggleApple() {
    // this.getAllPhones("Apple");
    this.setState({
      toggleApple: !this.state.toggleApple,
      toggleSamsung: false,
      toggleGoogle: false
    });
  }
  toggleSamsung() {
    // this.getAllPhones("Samsung");
    this.setState({
      toggleSamsung: !this.state.toggleSamsung,
      toggleApple: false,
      toggleGoogle: false
    });
  }
  toggleGoogle() {
    // this.getAllPhones("Google");
    this.setState({
      toggleGoogle: !this.state.toggleGoogle,
      toggleApple: false,
      toggleSamsung: false
    });
  }

  myPhone = id => {
    // console.log('HERE IT IS',e.target.name)
    this.getOnePhone(id);
    this.setState({
      selectedPhone: true,
      toggleApple: false,
      toggleSamsung: false,
      toggleGoogle: false
    });
  };

  render() {
    console.log("found phone", this.state.foundPhone);
    const appleDisplay = this.state.Apple.map(phone => {
      return (
        <div className="outerContainer">
          <div>{phone.manufacturer}</div>
          <div>{phone.model}</div>
          <div>{phone.color}</div>
          <img className="phoneImage" src={phone.image} alt="phone" />
        </div>
      );
    });
    const appleMenu = this.state.Apple.map(phone => {
      return (
        <p
          className="seperatePhone"
          onClick={() => this.myPhone(phone.phone_id)}
          key={phone.phone_id}
        >
          {phone.model} {phone.color}
        </p>
      );
    });
    const samsungDisplay = this.state.Samsung.map(phone => {
      return (
        <div className="outerContainer">
          <div>{phone.manufacturer}</div>
          <div>{phone.model}</div>
          <div>{phone.color}</div>
          <img className="phoneImage" src={phone.image} alt="phone" />
        </div>
      );
    });
    const samsungMenu = this.state.Samsung.map(phone => {
      return (
        <p
          className="seperatePhone"
          onClick={() => this.myPhone(phone.phone_id)}
          key={phone.phone_id}
        >
          {phone.model} {phone.color}
        </p>
      );
    });
    const googleDisplay = this.state.Google.map(phone => {
      return (
        <div className="outerContainer">
          <div>{phone.manufacturer}</div>
          <div>{phone.model}</div>
          <div>{phone.color}</div>
          <img className="phoneImage" src={phone.image} alt="phone" />
        </div>
      );
    });
    const googleMenu = this.state.Google.map(phone => {
      return (
        <p
          className="seperatePhone"
          onClick={() => this.myPhone(phone.phone_id)}
          key={phone.phone_id}
        >
          {phone.model} {phone.color}
        </p>
      );
    });

    const { image, model, manufacturer, color } = this.state.foundPhone;
    const mappedMyPhone = (
      <div>
        <div>{manufacturer}</div>
        <div>{model}</div>
        <div>{color}</div>
        <img className="phoneImage" src={image} alt="phone" />
      </div>
    );
    
    const mappedPhones = this.state.phones.map(phone => {
      return (
        <div className="outerContainer">
          {phone.manufacturer}
          {phone.model}
          {phone.color}
          <img className="phoneImage" src={phone.image} alt="phone" />
        </div>
      );
    });
    return (
      <div>
        <div className="manufactButtons">
          <button onClick={this.toggleApple}>
            <img
              className="PhoneLogo"
              alt="AppleLogo"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAh1BMVEX///8jHyAAAAAgHB0bFhfx8fESCw35+fkXEhMaFRYGAAARCgz29vYfGhsYEhStrKzAv7+Fg4RUUlJubG3q6uqjoqIuKyzf39/Ozs57enrW1tZHREUMAAU/PD2XlpaysbGPjo67u7tlZGRfXV5TUVGKiYk4NjaAfn8qJifIyMhzcXFFQkNjYWG6Qv/JAAAEp0lEQVR4nO3c2XaiQBAGYClaZBGjoBgV9yVOJu//fANJTIRxOWLFOhX+7zoXXZXeq7HRAAAAAAAAAAAAAAAAAAAAAAAAAACoh7Z0A4R1e1OypRshaTgickK7xjkYR+RaGTuUbomU5oqM9c5OpNsiZP7RB3Imkm6MjJisL52RdGtETNLvFFjpQLo5EqbOUQosepZuj4CokAKLpNsjYEuFFHRi6QY93p9iCiz6I92ih2uldiEFYQ13iSOn1A2epFv0cMPSSKhjN1i5pW5Qv9mgX+oG7kq6RY83CwopsJ2WdIseLykuCjSWbtDjlYYCzaUbJGBZyAHV8rBUmA7qmYLG6HtlNNSVbo2MtXdYEGjal26MkPXHFWJINdwhH0SB6QRE0/pmIJsTN1G8WNZ1FJzXbP7SWtt4vnhdT6J41r3wT28utxuHcslq1m0+rnUPsFwR+YFrQuNmgz9ZnNwQD2c7Isd87J1tL58lBr9lkPR7RJ3iuYjsWSm65mBHQVg8QlphQNFvOEm3Xqh0T/SehoA28+8T4nJNaTkBh43TX/WnqPmpDHxE59PbPOsN7WVM5J35o/cs6K46tdZkn4/O8nwyCZF74U9ywV7xtDD0roVn2ZdydBDqLTyN6fQYv52t9ZJxfHEc3Ejn/dKQMwVZT1C4Y2p1OFOQLQ8K36ZEnetx3cCmnroL5ye6HtcNOq6++aDJm4Jgoq4TNBox60jwNdaexqzdwFf5JmN9Yf9/M1flS71yOf0u4V46nEpezp0Vq6ChdDiVcHaDdCYdTSVdxhzYRjqaal4ZF0atpRef76Rg+9LBVMO5Kjhb6Wiqmft8OdB5bdBo9PhWRjuVDqaijWHLgdqXyynflBgofZjSYpwStb5MKT+6vCsHSqdEzqWRlBZXOO8ONF4m556RA94cKB0LrDnQeXfAmwO1ZUa+HPhKT86ca6P7Ih1NNZzllXAnHU1FnLeJWhfHkLHg7Cv9piPiOztbZiMdTTWoLjQaT4x3aZb7Kh1OJZybJK0doc2aAzORjqeSPetLJJ0feo2uvsy8LQkaRwNngcHK33cr3Chx3ijmTKLwNVLC+zTR8hJ9PWHBuUvKGVfdnMC7Q8iF+mrwAfNgyFCk7G6Rsez6xaOtqk/+eN8nHgSkKgl7rq83jin7ScFBej2kmyn7kQzmN9ufOZCO6kYx75kh52r7xu8HZkV9hfi/3LNiqO8iofyDgHfT+CZlx9sRQoXfdHF3BFpKB1TFhLHOoLXqxro0aK3Cv/KdnDxd2+Rvbb6vfbU+ysl/AIIpBb7Oj1nerXm+5lC5Lh4wjQaVFYYvLJ82keKRkBvdf5Hg6TsolNy9ZVb56w9FdxedtO6Ojt15bqCFdAAcZvckIVhLN5/HqHoS3Kl047nE55Jge06Qpo57bhfhaqw4n3GyJ3R8Mm/bwWCwiJPSL+t9Cn5NL8jNyhtGQxQf/YRouzsiKt830Jtgi3/Ac3C0WbIDmvx/LdSN6LhW6+grNV+1Jd/LQgw7KZnF6QNAf5aQ75jQNg5RT/3W6ITW01s2AvarwaUTUH/ei3a7zYvK20MAAAAAAAAAAAAAAAAAAAAAAAAAAPj0D0fdPqy0Dq1YAAAAAElFTkSuQmCC"
            />
          </button>
          <button className="logoButtons" onClick={this.toggleSamsung}>
            <img
              className="PhoneLogo"
              alt="SamsungLogo"
              src="data:image/png;base64,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"
            />
          </button>
          <button className="logoButtons" onClick={this.toggleGoogle}>
            <img
              className="PhoneLogo"
              alt="GoogleLogo"
              src="data:image/png;base64,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"
            />
          </button>
        </div>

        <nav
          className={
            this.state.toggleApple ? "toggle-Phone-show" : "toggle-Phone-hide"
          }
        >
          {appleMenu}
        </nav>

        <nav
          className={
            this.state.toggleSamsung ? "toggle-Phone-show" : "toggle-Phone-hide"
          }
        >
          {samsungMenu}
        </nav>
        <nav
          className={
            this.state.toggleGoogle ? "toggle-Phone-show" : "toggle-Phone-hide"
          }
        >
          {googleMenu}
        </nav>

        {this.state.toggleApple
          ? appleDisplay
          : this.state.toggleSamsung
          ? samsungDisplay
          : this.state.toggleGoogle
          ? googleDisplay
          : this.state.selectedPhone
          ? mappedMyPhone
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Store);
