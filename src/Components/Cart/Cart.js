/* eslint-disable no-sequences */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./Cart.css";
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom'

toast.configure();

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartTotal: 0
    };
  }

    notify = () => {
      toast("Payment Successful!")

      toast.success("Success Notification !", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    
  componentDidMount() {
    this.getCart(this.props.user.user_id);
    
  }

    
  getCart = (user_id) => {
    axios.get(`/api/cart/${user_id}`)
    .then( res => {
      console.log("data", res.data)
      this.setState({
        cart: res.data
      })
    })
      axios.get(`/api/cart_total/${user_id}`)
      .then( res => {
        console.log('res', res)
        this.setState({
          cartTotal: res.data[0].sum
        })
      })
  }
  
  remove_cart = async cart_id => {
    console.log('hope to remove', cart_id)
    const body = {
      user_id: this.state.cart[0].user_id
    }
    const res = await axios.put(`/api/cart/${cart_id}`, body);
    console.log('RES', res)
    this.setState({
      cart: res.data
    })
  }
 
 handleToken = async () => {
  console.log('cart', this.state.cart)
  const id = this.state.cart[0].user_id
  const res = await axios.delete(`/api/all_cart/${id}`);
      this.setState({
        cart: res.data,
        cartTotal: 0
      })
      // this.getCart()
      this.props.history.push("/cart");
  }

  render() {
    console.log('under render cart', this.state.cartTotal)
    const cartList = this.state.cart.map(cart => {
      return(
        
        <div className="container">
          <img className="phone_Image" alt ="phone_image" src ={cart.image} onClick = {() => this.getCart(cart.user_id)}></img>
          
          <div className="about_phone">
            <ul className="model" onClick = {() => this.getCart(cart.phone_id)}>{cart.model}</ul>

            {
              cart.screen
              ?
              <ul onClick = {() => this.getCart(cart.phone_id)}>Screen Price: <div>${cart.screen_price}</div></ul>
              :
              null
            }

            {
              cart.battery
              ?
              <ul onClick = {() => this.getCart(cart.phone_id)}>Battery Price: <div>${cart.battery_price}</div></ul>
              :
              null
            }
            
            <ul onClick = {() => this.getCart(cart.phone_id)}>Total: ${cart.total}</ul>
          </div>
          

          <div className="stripeButton">
           <button className="delete" onClick={() => this.remove_cart(cart.cart_id)}>Delete Phone</button>
        
        
        </div>
            
          
        </div>
      )
    })
    // const {cartTotal} = this.state
    const grandTotal = this.state.cartTotal
    return (

      <div className="outerDiv">

        
        <div className="payment">

          <div className="cart_total">Cart Total: ${this.state.cartTotal}</div>
          <StripeCheckout 
          className="stripe_Button"
          stripeKey="pk_test_6LFbBm3UlXhuZoZQnc2mS6kH004CXob4ik"
          token={this.handleToken}
          billingAddress
          shippingAddress
          name='AZ Smart Repair'
          amount= {this.state.cartTotal * 100}
          onClick={this.handleToken}
        />
        <ToastContainer/>
        <Link to="/appointments">
        <button className="appointmentsButton">Book Appointment</button>
        </Link>
        
        </div>
        {cartList}

         

        </div>
       
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
