import React from "react";
import "./Store.css";
import { connect } from "react-redux";
import axios from "axios";

class Store extends React.Component {
  constructor() {
    super();
    this.state = {
      phones: [],
      manufacturer: ""
    };
  }

//   getAllPhones = async manufacturer => {
//     const res = await axios.get("/api/all_phones", { manufacturer });
    
//     this.setState({
//       phones: res.data
//     });
//     console.log("after phones", this.state.phones);
//   };

  getAllPhones = manufacturer => {
      console.log('before phones' , this.state.phones)
     axios
      .get('/api/all_phones', {manufacturer}).then(res => {
        this.setState({
            phones: res.data
        })
      })
    console.log("after phones", this.state.phones)
      
  }

  componentDidMount() {
    console.log("mounted");
    this.getAllPhones("Apple");
  }

  render() {
    console.log("store!", this.props);
    console.log("state", this.state)
    const mappedPhones = this.state.phones.map(phone => {
      return (
        <div>
          <img src={phone.image} alt="phone" />
        </div>
      );
    });
    return (
      <div>
        Store Page
        <button onClick={() => this.getAllPhones("Apple")}>
          get all iphones
        </button>
        {mappedPhones}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Store);
