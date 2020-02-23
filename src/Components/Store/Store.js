import React from 'react';
// import axios from 'axios';
import './Store.css'
import {connect} from 'react-redux'


class Store extends React.Component{
    constructor(){
        super()
        this.state = {
            phones: []
        }
    }
   

    render(){
        console.log(this.props)
        return(
            <div>Store Page</div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Store)