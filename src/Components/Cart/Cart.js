/* eslint-disable no-sequences */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./Cart.css";
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { toast } from 'react-toastify'

toast.configure();

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: []
    };
  }


  componentDidMount() {
    this.setState({
      cart: this.props.cart
    });
    console.log("state cart", this.state.cart);
  }

 
 handleToken = async (token) => {
    // console.log('token, addresses',{token, addresses})

  const res = await axios.post('/api/checkout', {
      token
    })
    const { status } = res.data
    if (status === 'success') {
        toast('Success! Check email for details', 
        { type: 'success' })
    } else {
      toast('Something went wrong',
      { type: 'error' })
    }
  }

  render() {
    return (
      <div className="mainDiv">
        <div>
          <h1>{this.state.cart.manufacturer}</h1>
          <h3>{this.state.cart.model}</h3>
          <img className="phoneImage" src={this.state.cart.image} />
          <div>
            {this.state.cart.screen ? (
              <div>
                Screen Price: 
                ${this.state.cart.screen_price}
              </div>
            ) : null}

            {this.state.cart.battery ? (
              <div>
                Battery Price: 
                ${this.state.cart.battery_price}
              </div>
            ) : null}

            <h1 className="totalCost">Total Cost</h1>
            {this.state.cart.total}
          </div>
        </div>

        <StripeCheckout 
        className="stripeButton"
        stripeKey="pk_test_6LFbBm3UlXhuZoZQnc2mS6kH004CXob4ik"
        token={this.handleToken}
        billingAddress
        shippingAddress
        total={this.state.cart.total}
        name={this.state.cart.manufacturer, this.state.cart.model}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
