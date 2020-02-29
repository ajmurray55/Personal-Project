import React from "react";
import "./Store.css";
import { connect } from "react-redux";
import axios from "axios";
import AppleLogo from './AppleLogo.png'
import SamsungLogo from './SamsungLogo.png'
import GoogleLogo from './GoogleLogo.png'

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
    // console.log("before phones", this.state.phones);
    const res = await axios.get(
      `/api/all_phones/?manufacturer=${manufacturer}`
    );
    this.setState({
      [manufacturer]: res.data
    });
  };

  getOnePhone = async id => {
    const res = await axios.get(`/api/phone/${id}`);
    // console.log("res", res.data);
    this.setState({
      foundPhone: res.data
    });
  };

  componentDidMount() {
    // console.log("is mounting! :) ");
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
   
    // console.log("found phone", this.state.foundPhone);
    const appleDisplay = this.state.Apple.map(phone => {
      return (
        <div className="outerContainer">
          <div onClick={() => this.myPhone(phone.phone_id)}>{phone.manufacturer}</div>
          <div onClick={() => this.myPhone(phone.phone_id)}>{phone.model}</div>
          <div onClick={() => this.myPhone(phone.phone_id)}>{phone.color}</div>
          <img onClick={() => this.myPhone(phone.phone_id)} className="phoneImage" src={phone.image} alt="phone" />
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
          <div onClick={() => this.myPhone(phone.phone_id)}>{phone.manufacturer}</div>
          <div onClick={() => this.myPhone(phone.phone_id)}>{phone.model}</div>
          <div onClick={() => this.myPhone(phone.phone_id)}>{phone.color}</div>
          <img onClick={() => this.myPhone(phone.phone_id)} className="phoneImage" src={phone.image} alt="phone" />
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
          <div onClick={() => this.myPhone(phone.phone_id)}>{phone.manufacturer}</div>
          <div onClick={() => this.myPhone(phone.phone_id)}>{phone.model}</div>
          {/* <div onClick={() => this.myPhone(phone.phone_id)}>{phone.color}</div> */}
          <img onClick={() => this.myPhone(phone.phone_id)} className="phoneImage" src={phone.image} alt="phone" />
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
          {phone.model} 
          {/* {phone.color} */}
        </p>
      );
    });

    const { image, model, manufacturer, color } = this.state.foundPhone;
    const mappedMyPhone = (
      <div className="chosenPhone">
        <p className="myPhone"
        onClick={this.myPhone}
        > {manufacturer} {model} 
        {/* {color} */}
          
          </p>
        <img className="phoneImage" 
          src={image} 
          alt="phone" 
          />

        
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
      <div className="dahParent">
        <div className="manufactButtons">
            <img
              className="PhoneLogo"
              alt="AppleLogo"
              src={AppleLogo}
              onClick={this.toggleApple}/>
          
            <img
              className="PhoneLogo"
              alt="SamsungLogo"
              src={SamsungLogo}
              onClick={this.toggleSamsung}/>
          {/* <button className="logoButtons" onClick={this.toggleGoogle}> */}
            <img
              className="PhoneLogo"
              alt="GoogleLogo"
              src={GoogleLogo}
              onClick={this.toggleGoogle}/>
          {/* </button> */}
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
        
            {
            this.state.toggleApple
          ? 
          <div className="sideScroll">{appleDisplay}</div>
          : 
          this.state.toggleSamsung
          ? 
          <div className="sideScroll">{samsungDisplay}</div>
          : 
          this.state.toggleGoogle
          ? 
          <div className="sideScroll">{googleDisplay}</div>
          : 
          this.state.selectedPhone
          ? 
          <div className="fix">
          <div>{mappedMyPhone} </div>
          <h1 className="screenOrBattery"> What will you like done on your phone?
          
          <label className="products">Screen<input className="productBox" type="checkbox" value= "screen"/></label>
          <label className="products">Battery<input className="productBox" type="checkbox" value= "battery"/></label>
          
          <label className="totalCost">Total Cost</label>
          
          </h1>
          </div>

          
          : null}
        
      
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Store);
