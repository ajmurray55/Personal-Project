import React, {Component} from 'react';
import Calendar from 'react-calendar'
import "./Appointment.css"

class Appointment extends Component {
    constructor(){
        super()
        this.state = {
            date: new Date()
        }
    }

    onChange = date => this.setState({ date })
   
    render() {
    return(
        <div>
            <div className="calendar">
            <Calendar
                onChange={this.onChange}
                value={this.state.date}
                />
            
            <form className="time">
                <label for="appt">Select a time:
                <input type="time" id="appt" name="appt"/>
                <input type="submit" value="Submit"/></label>
            </form>
            </div>
        </div>
     );
    }
}

export default Appointment