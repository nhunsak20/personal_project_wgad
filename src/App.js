import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import routes from "./routes";

import Nav from "./Components/Nav/Nav";

import back_img from "./assets/WGADLogo_A1a.png";

import "./App.css";

class App extends Component {
  constructor() {
    super()
    this.state = {
      background_img: [
        "https://www.redledges.com/wp-content/uploads/2017/10/golf-gallery4.jpg",
        "https://img1.10bestmedia.com/Images/Photos/253409/p-Sandia1_54_990x660_201404251613.jpg",
        "https://files.tripstodiscover.com/files/2017/09/TPC-Sawgrass-Ponte-Vedra.jpg",
        "https://i.pinimg.com/originals/2c/58/fe/2c58fee282ea90d55d952a37c6832200.jpg"
      ]
    }
  }

  componentDidMount() {
    const background = document.getElementById("App");
    background.style.backgroundImage = `url(${this.state.background_img[3]})`;
    background.style.transition = "0.5s";
    setInterval(() => {
      background.style.backgroundImage = `url(${
        this.state.background_img[
          Math.ceil(Math.random() * this.state.background_img.length - 1)
        ]
      })`;
    }, 8000);
  }

  render() {
    return (
      <div className="App" id="App">
        {routes}
        <Nav props={this.props}/>
        
        <div className="App-back">
          <img className="back-img" src={back_img} alt="" />
        </div>
        
        
      </div>
    );
  }
}

export default withRouter(App);
