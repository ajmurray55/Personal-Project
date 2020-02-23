import React from 'react';
import './Header.css'
import {connect} from 'react-redux'
import {getSession} from '../../redux/reducer'

class Header extends React.Component{
    
    componentDidMount(){
        this.props.getSession()
    }

    render(){
        console.log(this.props)
        return(
            <header>
                <h1>Phone Fixer </h1>
                {this.props.user.username}
                {/* {this.props.loading
                ?
                <h1>waiting...</h1>
                :
                <h1></h1>
                } */}
            </header>
        )
    }
}

const mapStatetoProps = state => state;

const mapDispatchToProps = {
    getSession
}

export default connect(mapStatetoProps, mapDispatchToProps)(Header);