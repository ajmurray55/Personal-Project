import React, {Component} from 'react';
import Calendar from 'react-calendar'
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
            <div className="calendar">
            <Calendar
                onChange={this.onChange}
                value={this.state.date}
                />
            
            <form className="time" onSubmit={this.submit}>
                
               <label for="appt">Select a day:<input type="date" id="appt" name="appt" value={this.state.inputDate} onChange={this.handleChange}/></label> 
                
                
                <label for="appt">Select a time:<input type="time" id="appt" name="appt"/></label>
                <input type="submit" value="Submit"/>
            </form>
            </div>
        </div>
     );
    }
}

export default Appointment