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

//   toggleGalaxyVideo = () => {
//     this.setState({
//       toggleGalaxyVideo: !this.state.toggleGalaxyVideo,
//       toggleGoogleVideo: false,
//       toggleIphoneVideo: false
//     });
//   };
//   toggleIphoneVideo = () => {
//     this.setState({
//       toggleIphoneVideo: !this.state.toggleIphoneVideo,
//       toggleGoogleVideo: false,
//       toggleGalaxyVideo: false
//     });
//   };
//   toggleGoogleVideo = () => {
//     this.setState({
//       toggleGoogleVideo: !this.state.toggleGoogleVideo,
//       toggleIphoneVideo: false,
//       toggleGalaxyVideo: false
//     });
//   };



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
      console.log('look', this.state.currentURL)
    // const mappdedIphoneVideo = this.state.Iphone.map(Iphone => {
    //     return(
    //         <iframe
    //     className="Video-show"
    //     width="560"
    //     height="315"
    //     src="https://www.youtube.com/embed/hRUlD9PsWso"
    //     frameborder="0"
    //     allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    //     allowfullscreen></iframe>
    //     )
    // })
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
              height="330"
              src={this.state.currentURL}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : null}
        </div>

            <p> My name is Ammon Murray. I have been fixing phones for over 2 years.</p>
                <p>I have fixed over thousands of phones. I am very careful with all devices because I understand the contents are very important.</p> 
            <footer>
            <p>If you ever need any help with any devices contact me at:</p>
            <p>Email at: ammonmurray1@gmail.com</p>
            <p>Text at: (480)-489-7931</p>
            </footer>
           

      </div>
    );
  }
}
export default About;
