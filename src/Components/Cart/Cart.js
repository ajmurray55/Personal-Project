import React, { Component } from "react";
import { connect } from "react-redux";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      cart: []
    };
  }

  enableButton = () => {
    this.setState({
      canSubmit: true
    });
  };
  disapbleButton = () => {
    this.setState({
      canSubmit: false
    });
  };

  componentDidMount() {
    this.setState({
      cart: this.props.cart
    });
    console.log("state cart", this.state.cart);
  }

  // onSubmit = (card) => {
  //     const { number, exp_month, exp_year, cvc, name, zip } = card
  //     Stripe.card.createToken({
  //         number,
  //         exp_month,
  //         exp_year,
  //         cvc,
  //         name,
  //         address_zip:zip
  //     }, (status, respose) => {
  //         if(response.err) {
  //             alert('Adding Card failed with error: ' + response.err.message);
  //         } else {
  //             const cardToken = response.id
  //         }
  //     });
  // }

  render() {
   

    return (
      <div>
        {/* <CardForm
            onSubmit={this.onSubmit}
            getName={true}
            getZip={true}
            /> */}

          <div>{this.state.cart.manufacturer}</div>
          <div>{this.state.cart.model}</div>
          <img src={this.state.cart.image}/>
          <div>
              
            {
                this.state.cart.screen
                ?
                <div>Screen Price
                    {this.state.cart.screen_price}
                </div>
                :
                null
            }
            
            {
                this.state.cart.battery
                ?
            <div>Battery Price 
                {this.state.cart.battery_price}</div>
                :
                null
            }


              Total Cost{this.state.cart.total}
              
              </div>
      </div>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
