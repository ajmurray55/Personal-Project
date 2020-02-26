import React from "react";
import "./Store.css";
import { connect } from "react-redux";
import axios from "axios";

class Store extends React.Component {
  constructor() {
    super();
    this.state = {
      phones: [],
      manufacturer: {}
    };
  }

  getAllPhones = async manufacturer => {
    console.log('before phones', this.state.phones)
    const res = await axios.get(`/api/all_phones/?manufacturer=${manufacturer}`);
    
    this.setState({
      phones: res.data
    });
  };

  // getAllPhones = () => {
  //     console.log('before phones' , this.state.phones)
  //    axios
  //     .post('/api/all_phones').then(res => {
  //       this.setState({
  //           phones: res.data
  //       })
  //     })
  //   // console.log("after phones", this.state.phones)
      
  // }

  componentDidMount() {
    console.log('is mounting! :) ')
    this.getAllPhones("Apple");
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.phones !== this.state.phones)
    console.log("after phones", this.state.phones);

  }
  render() {
    // window.alert("store!", this.props);
    console.log("state", this.state)
    const mappedPhones = this.state.phones.map(phone => {
      return (
        <div className="outerContainer">
          <div>{phone.manufacturer}</div>
          <div>{phone.model}</div>
          <img className="phoneImage" src={phone.image} alt="phone" />
          {/* <div>{phone.color}</div> */}
          </div>
        
      );
    });
    return (
      <div>
        <div className="manuButtons">
        <button onClick={() => this.getAllPhones("Apple")}>
          Apple
        </button>
        <button onClick={() => this.getAllPhones("Samsung")}>
          Samsung
          </button>
          <button onClick={() => this.getAllPhones("Google")}>
            Google
          </button>
          </div>

        {mappedPhones}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Store);
