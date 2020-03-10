import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { checkUser, logout } from "../../Redux/userReducer";
import WGAD_logo from "../../assets/WGAD_Iogo.png";

import "./Nav.scss";

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isNavToggle: true,
      isProfile: true,
      isProfileMobile: true,
      user: {}
    };

    this.logoutClicked = this.logoutClicked.bind(this)
    this.logoutMobileClicked = this.logoutMobileClicked.bind(this)
  }

  componentDidUpdate(prevProps) {
    if(this.props.user.id !== prevProps.user.id) {
      this.props.checkUser()
      this.getProfile()
    }
  }

  componentDidMount() {
      this.props.checkUser()
      this.getProfile()
  }

  getProfile() {
    if(this.props.user.id){
    axios.get(`/api/profile/${this.props.user.id}`).then(res => {
      this.setState({
        user: res.data
      })
    }).catch(() => {
      this.props.history.push('/')
    })
  } 
  }

  logoutClicked() {
    this.profileToggle();
    this.props.logout();
    this.props.history.push('/')
  };

  logoutMobileClicked() {
    this.profileMobileClicked()
    this.props.logout()
    this.props.history.push('/')
  }

  navToggleDropdown = () => {
    this.setState({
      isNavToggle: !this.state.isNavToggle
    });
  };

  profileToggleDropdown = () => {
    this.setState({
      isProfile: !this.state.isProfile
    });
  };

  profileMobileToggleDropdown = () => {
    this.setState({
      isProfileMobile: !this.state.isProfileMobile
    })
  }

  profileToggle = () => {
    const profileMenu = document.getElementById(
      "invisble-profile"
    );
    const profileItems = document.querySelectorAll("#profile-menu-items li");

    if (this.state.isProfile) {
      profileMenu.classList.remove("profile-non-active");
      profileMenu.classList.add("profile-active");
      profileItems.forEach((item, i) => {
        item.style.animation = `dropdownItem 0.3s ease-out forwards ${i / 9}s`;
      });
    } else {
      profileMenu.classList.remove("profile-active");
      profileMenu.classList.add("profile-non-active");
      profileItems.forEach((item, i) => {
        item.style.animation = `dropupItem 0.3s ease-out backwards`;
      });
    }
    this.profileToggleDropdown();
  };

  toggleClicked = () => {
    const navIcon = document.getElementById("mobile-nav-icon");
    const navMenu = document.getElementById("mobile-nav-menu");
    const navItems = document.querySelectorAll("#mobile-menu-items li");

    navIcon.classList.remove("nav-active");
    navIcon.classList.remove("nav-non-active");
    navMenu.classList.remove("dropdown");
    navMenu.classList.remove("dropup");

    this.navToggleDropdown();

    if (this.state.isNavToggle) {
      navIcon.classList.add("nav-active");
      navMenu.classList.add("dropdown");
      navItems.forEach((item, i) => {
        item.style.display = "block";
        item.style.animation = `dropdownItem 0.2s ease-out forwards ${i / 9}s`;
      });
      document.body.style.overflow = "hidden";
    } else {
      navIcon.classList.add("nav-non-active");
      navMenu.classList.add("dropup");
      navItems.forEach((_, i) => {
        navItems[
          navItems.length - 1 - i
        ].style.animation = `dropupItem 0.2s ease-out backwards ${i / 9}s`;
        navItems[navItems.length - 1 - i].style.display = "none";
      });
      document.body.style.overflow = "initial";
    }
  };

  profileMobileClicked = () => {
    const navMenu = document.getElementById("mobile-nav-profile");
    const navItems = document.querySelectorAll("#mobile-profile-items li");

    navMenu.classList.remove("dropdown");
    navMenu.classList.remove("dropup");

    this.profileMobileToggleDropdown();

    if (this.state.isProfileMobile) {
      navMenu.classList.add("dropdown");
      navItems.forEach((item, i) => {
        item.style.display = "block";
        item.style.animation = `dropdownItem 0.2s ease-out forwards ${i / 9}s`;
      });
      document.body.style.overflow = "hidden";
    } else {
      navMenu.classList.add("dropup");
      navItems.forEach((_, i) => {
        navItems[
          navItems.length - 1 - i
        ].style.animation = `dropupItem 0.2s ease-out backwards ${i / 9}s`;
        navItems[navItems.length - 1 - i].style.display = "none";
      });
      document.body.style.overflow = "initial";
    }
    console.log('profile done')
  };

  render() {
    const { user } = this.state
    return (
      <div>
        <header className="nav-header">
          <div className="desktop-header-nav">
            <div className="desktop-wgad">
              <img src={WGAD_logo} alt="" />
            </div>
            <nav>
              <div className="desktop-menu">
                <ul className="desktop-menu-items">
                  <li>
                    <Link className="link-menu-item" to="/">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="link-menu-item" to="/events">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link className="link-menu-item" to="/shops">
                      Shops
                    </Link>
                  </li>
                  <li>
                    <Link className="link-menu-item" to="/news">
                      News
                    </Link>
                  </li>
                  {!this.props.user.id ? (
                    <li className="nav-menu-item-last">
                      <Link className="link-menu-item" to={{pathname: "/login", state: {prevPath: this.props.location.pathname}}}>
                        Login
                      </Link>
                    </li>
                  ) : (
                    <li className="nav-menu-item-last">
                      <div className="profile-menu">
                        <div className="desktop-profile">
                          <span>{user.first_name}</span>
                          <div
                            className="desktop-profile-icon"
                            id="desktop-profile-icon"
                            onClick={this.profileToggle}
                          >
                            <img
                              className="profile-img"
                              src={user.profile_img}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </nav>
          </div>
          <div className="mobile-header-nav">
            <div className="mobile-profile">
              {this.props.user.id ? (
                <img
                  className="mobile-profile-img"
                  src={user.profile_img}
                  alt=""
                  onClick={this.profileMobileClicked}
                />
              ) : (
                <div className="mobile-profile-noimg" />
              )}
            </div>
            <div className="mobile-nav-wgad">
              <img src={WGAD_logo} alt="" />
              {/* <div className="mobile-nav-wgad-img" /> */}
            </div>
            <div
              className="mobile-nav-icon"
              id="mobile-nav-icon"
              onClick={this.toggleClicked}
            >
              <div className="line-1"></div>
              <div className="line-2"></div>
              <div className="line-3"></div>
            </div>
            {/* {!this.props.userReducer.user.email ? ( */}
            <nav className="mobile-nav-menu" id="mobile-nav-menu">
              <ul className="mobile-menu-items" id="mobile-menu-items">
                <li>
                  <Link
                    className="link-menu-item"
                    to="/"
                    onClick={this.toggleClicked}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="link-menu-item"
                    to="/events"
                    onClick={this.toggleClicked}
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link to="/shops">Shops</Link>
                </li>
                <li>News</li>
                {!this.props.user.id ? (
                  <li>
                    <Link
                      className="link-menu-item"
                      to="/login"
                      onClick={this.toggleClicked}
                    >
                      Login
                    </Link>
                  </li>
                ) : null}
              </ul>
            </nav>
            <nav className="mobile-nav-profile" id="mobile-nav-profile">
              <ul className="mobile-profile-items" id="mobile-profile-items">
                <li><Link to={`/profile/${this.props.user.id}`} onClick={this.profileMobileClicked}>
                    account
                  </Link></li>
                <li onClick={this.profileMobileClicked}>play</li>
                <li onClick={this.profileMobileClicked}>scorecard</li>
                <li onClick={this.logoutMobileClicked}>logout</li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="invisble" id='invisble'>
          <div className="desktop-wgad"></div>
          <div className="flex">
            <div className="invisble-home"></div>
            <div className="invisble-event"></div>
            <div className="invisble-shop"></div>
            <div className="invisble-news"></div>
            <div className="invisble-profile" id='invisble-profile'>
              <ul className="profile-menu-items" id="profile-menu-items">
                <li>
                  <Link to={`/profile/${this.props.user.id}`} onClick={this.profileToggle}>
                    account
                  </Link>
                </li>
                <li>play</li>
                <li>srocecard</li>
                <li onClick={this.logoutClicked}>logout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.user
  return {
    user
  };
};

export default connect(mapStateToProps, { checkUser, logout })(withRouter(Nav));
