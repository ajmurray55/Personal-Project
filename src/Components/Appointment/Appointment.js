import React, {Component} from 'react';
import "./Appointment.css"



class Appointment extends Component {
    constructor(){
        super()
        this.state = {
            date: new Date(),
            inputDate: ''
        }
    }

    onChange = date => this.setState({ date })

    handleChange = (e) => {
        this.setState({
            inputDate: e.target.value
        })
    }
    

    submit = (e) => {
        e.preventDefault()
        console.log('input Date', typeof this.state.inputDate)
        this.setState({
            date: new Date(this.state.inputDate)
        })
    }

   
    render() {
    return(
        <div>
            
           
            
        
            <iframe title='appointment_form' src="https://services.cognitoforms.com/f/bCHPQnDbSkCl5AXJv6bWMQ?id=1" frameborder="0" scrolling="yes" seamless="seamless" height="574" width="100%"></iframe>
            <script src="https://services.cognitoforms.com/scripts/embed.js"></script>
        </div>
     );
    }
}

export default Appointment