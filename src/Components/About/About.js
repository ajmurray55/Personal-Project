import React, { Component } from "react";
import "./About.css";

class About extends Component {
  constructor() {
    super();
    this.state = {
      toggleIphoneVideo: false,
      toggleGoogleVideo: false,
      toggleGalaxyVideo: false,
      IphoneUrl: "https://www.youtube.com/embed/hRUlD9PsWso",
      GalaxyUrl: "https://www.youtube.com/embed/F5SgAdakDuU",
      PixelUrl: "https://www.youtube.com/embed/JJlHWsuqgUw",
      videoStatus: false,
      currentURL: ""
    };
  }

  toggle = phone => {
    let url;
    let status = true;
    switch (phone) {
      case "iphone":
        url = this.state.IphoneUrl;
        if (this.state.currentURL === this.state.IphoneUrl) {
            status = false
        }
        break
      case "pixel":
        url = this.state.PixelUrl;
        if (this.state.currentURL === this.state.PixelUrl) {
            status = false
        }
        break
      case "galaxy":
        url = this.state.GalaxyUrl;
        if (this.state.currentURL === this.state.GalaxyUrl) {
            status = false
        }
        break
      default:
        url = "";
    }
    console.log('url', url)
    this.setState({
      videoStatus: status,
      currentURL: url,


    });
  };
  render() {
  
    return (
        
      <div>
        <div className="videoList">
          <p className="Link"  onClick={() => this.toggle('iphone')}>
            Iphone Screen Replacement
          </p>

          <nav
            className={
              this.state.toggleIphoneVideo ? "Video-show" : "Video-hide"
            }
          >
            {" "}
          </nav>

          <p className="Link"  onClick={() => this.toggle('pixel')}>
            Pixel Screen Replacement
          </p>

          <nav
            className={
              this.state.toggleGoogleVideo ? "Video-show" : "Video-hide"
            }
          >
            
          </nav>

          <p className="Link" onClick={() => this.toggle('galaxy')}>
            Galaxy Screen Replacement
          </p>

          <nav
            className={
              this.state.toggleGalaxyVideo ? "Video-show" : "Video-hide"
            }
          >
           
          </nav>
        </div>

        <div>
          {" "}
          {this.state.videoStatus ? (
            // eslint-disable-next-line jsx-a11y/iframe-has-title
            <iframe
              className="Video-show"
              width="600"
              height="350"
              src={this.state.currentURL}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : null}
        </div>

            <footer>
            <p> My name is Ammon Murray. I have been fixing phones for over 2 years.</p>
            <p>I have fixed over thousands of phones. I am very careful with all devices because I understand the content inside the phone are very important to you.</p> 
            <p>If you ever need any help with any mobile devices contact me at,</p>
            <p>Email: ammonmurray1@gmail.com</p>
            <p>Text: (480)-489-7931</p>
            </footer>
           

      </div>
    );
  }
}
export default About;
