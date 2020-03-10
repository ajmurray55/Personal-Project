import React from "react";
import "./Store.css";
import { connect } from "react-redux";
import axios from "axios";
import AppleLogo from './AppleLogo.png'
import SamsungLogo from './SamsungLogo.png'
import GoogleLogo from './GoogleLogo.png'
import {Link} from 'react-router-dom'
import { myCart } from '../../redux/reducer';

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
      selectedPhone: false,
      screen: false,
      battery: false,
      total: 0,
      cartMessage: false
    };
    this.getAllPhones = this.getAllPhones.bind(this);
    this.toggleApple = this.toggleApple.bind(this);
    this.toggleSamsung = this.toggleSamsung.bind(this);
    this.toggleGoogle = this.toggleGoogle.bind(this);
    this.screen = this.screen.bind(this);
    this.battery = this.battery.bind(this);
  }

  cartMessage = (phone_id) => {
    this.setState({
      cartMessage: true
    })
    this.addToCart(phone_id)

    setTimeout(
      function() {
        this.setState({cartMessage: false})
      }
      .bind(this),
      2000
    );
  }

  addToCart  = async (phone_id) => {
    const {screen, battery} = this.state
    console.log('screen and battery', screen, battery)
   axios.post(`/api/cart/${phone_id}`, {screen, battery})
    .then(res => {
      this.setState({
        total: res.data.total
      })
    })
    // .catch(alert('Please Log In to place something into the cart.'))
    // this.setState({
    //   cartMessage: false
    // })
       const cart = {
      manufacturer: this.state.foundPhone.manufacturer,
      model: this.state.foundPhone.model,
      color: this.state.foundPhone.color,
      image: this.state.foundPhone.image,
      screen_price: this.state.foundPhone.screen_price,
      battery_price: this.state.foundPhone.battery_price,
      screen: this.state.screen,
      battery: this.state.battery,
      total: this.state.total
    }
    console.log('cart function', cart)
    this.props.myCart(cart)
       
  }

  screen() {
    this.setState({
      screen: !this.state.screen
    })
  }

  battery() {
    this.setState({
      battery: !this.state.battery
    })
  }

  total = () => {
    this.setState({
      screen: true, 
      battery: true
    })
    console.log('screen_price, battery_price', this.screen_price, this.battery_price)
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

 getTotal = (id) => {
   console.log('phone_id', id)
   const body = {
     screen: this.state.screen, 
     battery: this.state.battery
    }
   axios.put(`/api/total/${id}`, body)
   .then(res => {
     let newTotal = '$' + res.data + '.00'
    this.setState({
      total: newTotal
    })} 
   ).catch(err => console.log(err))
 }
  

  render() {
   
    // console.log("found phone", this.state.foundPhone);
    const appleDisplay = this.state.Apple.map(phone => {
      return (
        <div className="outerContainer">
          <div onClick={() => this.myPhone(phone.phone_id)}>{phone.manufacturer}</div>
          <div onClick={() => this.myPhone(phone.phone_id)}>{phone.model}</div>
          {/* <div onClick={() => this.myPhone(phone.phone_id)}>{phone.color}</div> */}
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
          {/* <div onClick={() => this.myPhone(phone.phone_id)}>{phone.color}</div> */}
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

    const { phone_id, image, model, manufacturer} = this.state.foundPhone;
    console.log('found phone', this.state.foundPhone)
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
            <img
              className="PhoneLogo"
              alt="GoogleLogo"
              src={GoogleLogo}
              onClick={this.toggleGoogle}/>

            </div>
            <h1 className={
              this.state.toggleApple || this.state.toggleSamsung || this.state.toggleGoogle || this.state.selectedPhone ? "message-hide" : "message-show"
            }
            >Select a Phone that you need Fixing!</h1>           
             
        <nav
          className={
            this.state.toggleApple ? "toggle-Apple-show" : "toggle-Apple-hide"
          }
        >
          
          {appleMenu}
        </nav>

        <nav
          className={
            this.state.toggleSamsung ? "toggle-Samsung-show" : "toggle-Samsung-hide"
          }
        >
          {samsungMenu}
        </nav>
        <nav
          className={
            this.state.toggleGoogle ? "toggle-Google-show" : "toggle-Google-hide"
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
          
            <div className="S_B_Container">
            <label className="products">Screen<input className="productBox" type="checkbox" value= "screen" onClick={this.screen}/></label>
            <label className="products">Battery<input className="productBox" type="checkbox" value= "battery" onClick={this.battery}/></label>
            <button className="totalButton" onClick={() => this.getTotal(this.state.foundPhone.phone_id)}>Total</button>

            </div>
            
          
              <section className="total">
            <label className="totalCost">Total Cost</label>
              {
                !this.state.total
              ?
              null
              :
              <p className='money'>{this.state.total}</p>
              
              }
              <div className="bottomButtons">
             
             {
               this.state.cartMessage
                ?
                <div className="messageContainer"> 
                  <img 
                 className="addToCart"
                  src="data:image/png;base64,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"
                  alt="cart Logo"
                  onClick={() => this.cartMessage(phone_id)}
                  />
                  <p className="cartMessage">Added to Cart!</p>
                </div>
                :
                <img 
                className="addToCart"
                src="data:image/png;base64,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"
                alt="cart Logo"
                onClick={() => this.cartMessage(phone_id)}
                />

             }
               
              <Link to="/cart">
                
                <img 
                className="nextButton" 
                src="data:image/png;base64,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"
                name='cart'
                />
              </Link>
              </div>
            </section>
            
            
            
           
          
          
          </h1>
          </div>

          
          : null}

         
        
      
      </div>
    );
  }
}

const mapDispatchToProps = {
  myCart
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Store);
