import React from "react";
import "./Appointment.css";

  function Appointment() {
    return (
      <div>
        <iframe
          className="appt"
          title="appointment_form"
          src="https://services.cognitoforms.com/f/bCHPQnDbSkCl5AXJv6bWMQ?id=1"
          frameborder="0"
          scrolling="yes"
          seamless="seamless"
          height="574"
          width="100%"
        ></iframe>
        <script src="https://services.cognitoforms.com/scripts/embed.js"></script>
      </div>
    );
  }

export default Appointment;
