import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import axios from "axios";
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
    };

    this.homeClicked = this.homeClicked.bind(this);
    this.eventClicked = this.eventClicked.bind(this);
    this.shopClicked = this.shopClicked.bind(this);
    this.newsClicked = this.newsClicked.bind(this);
    this.loginClicked = this.loginClicked.bind(this)
    this.logoutClicked = this.logoutClicked.bind(this)

    this.homeMobileClicked = this.homeMobileClicked.bind(this);
    this.eventMobileClicked = this.eventMobileClicked.bind(this);
    this.shopMobileClicked = this.shopMobileClicked.bind(this);
    this.newsMobileClicked = this.newsMobileClicked.bind(this);
    this.loginMobileClicked = this.loginMobileClicked.bind(this)
    this.logoutMobileClicked = this.logoutMobileClicked.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      this.props.checkUser();
      this.getProfile();
    }
  }

  componentDidMount() {
    this.props.checkUser();
    this.getProfile();
  }

  getProfile() {
    if (this.props.user.id) {
      // axios
      //   .get(`/api/profile/${this.props.user.id}`)
      //   .then(res => {
          // this.setState({
          //   user: res.data
          // });
        // })
        // .catch(() => {
        //   this.props.history.push("/");
        // });
    }
  }

  homeClicked(){
    this.props.history.push('/')
  }

  eventClicked() {
    this.props.history.push('/events')
  }

  shopClicked() {
    this.props.history.push('/shops')
  }
  
  newsClicked() {
    this.props.history.push('/news')
  }

  loginClicked() {
    this.props.history.push({pathname: '/login', state: {prevPath: this.props.location.pathname}})
  }

  playClicked = () => {
    this.props.history.push("/profile/play");
    this.profileToggle();
  };
  scorecardClicked = () => {
    this.props.history.push("/profile/scorecard");
    this.profileToggle();
  };

  accountClicked = () => {
    this.props.history.push(`/profile/${this.props.user.id}`);
    this.profileToggle();
  };
  
  logoutClicked() {
    this.profileToggle();
    this.props.logout();
    this.props.history.push("/");
  }

  homeMobileClicked(){
    this.toggleClicked()
    this.props.history.push('/')
  }

  eventMobileClicked() {
    this.toggleClicked()
    this.props.history.push('/events')
  }

  shopMobileClicked() {
    this.toggleClicked()
    this.props.history.push('/shops')
  }
  
  newsMobileClicked() {
    this.toggleClicked()
    this.props.history.push('/news')
  }

  loginMobileClicked() {
    this.toggleClicked()
    this.props.history.push('/login')
  }

  playMobileClicked = () => {
    this.props.history.push("/profile/play");
    this.profileMobileClicked();
  };
  scorecardMobileClicked = () => {
    this.props.history.push("/profile/scorecard");
    this.profileMobileClicked();
  };

  accountMobileClicked = () => {
    this.props.history.push(`/profile/${this.props.user.id}`);
    this.profileMobileClicked();
  };

  logoutMobileClicked() {
    this.profileMobileClicked();
    this.props.logout();
    this.props.history.goBack();
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
    });
  };

  profileToggle = () => {
    const profileMenu = document.getElementById("invisble-profile");
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
  };


  render() {
    // const { user } = this.state;
    const { user } = this.props
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
                  <li className="link-menu-item" onClick={this.homeClicked}>Home</li>
                  <li className="link-menu-item" onClick={this.eventClicked}>Events</li>
                  <li className="link-menu-item" onClick={this.shopClicked}>Shops</li>
                  {/* <li className="link-menu-item" onClick={this.newsClicked}>News</li> */}
                  {!user.id ? (
                    <li className="link-menu-item" onClick={this.loginClicked}>Login</li>
                  ) : (
                    <li className="nav-menu-item-last">
                      <div className="profile-menu">
                        <div className="desktop-profile">
                          {/* <span>{user.first_name}</span> */}
                          <div
                            className="desktop-profile-icon"
                            id="desktop-profile-icon"
                            onClick={this.profileToggle}
                          >
                            {console.log(user.profile_img)}
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
              {user.id ? (
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
                <li className="link-menu-item" onClick={this.homeMobileClicked}>Home</li>
                <li className="link-menu-item" onClick={this.eventMobileClicked}>Events</li>
                <li className="link-menu-item" onClick={this.shopMobileClicked}>Shops</li>
                {/* <li className="link-menu-item" onClick={this.newsMobileClicked}>News</li> */}
                {!user.id ? (
                  <li className="link-menu-item" onClick={this.loginMobileClicked}>Login</li>
                ) : null}
              </ul>
            </nav>
            <nav className="mobile-nav-profile" id="mobile-nav-profile">
              <ul className="mobile-profile-items" id="mobile-profile-items">
                <li onClick={this.accountMobileClicked}>account</li>
                {/* <li onClick={this.playMobileClicked}>play</li>
                <li onClick={this.scorecardMobileClicked}>scorecard</li> */}
                <li onClick={this.logoutMobileClicked}>logout</li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="invisble" id="invisble">
          <div className="desktop-wgad"></div>
          <div className="flex">
            <div className="invisble-home"></div>
            <div className="invisble-event"></div>
            <div className="invisble-shop"></div>
            <div className="invisble-news"></div>
            <div className="invisble-profile" id="invisble-profile">
              <ul className="profile-menu-items" id="profile-menu-items">
                <li onClick={this.accountClicked}>account</li>
                {/* <li onClick={this.playClicked}>play</li>
                <li onClick={this.scorecardClicked}>srocecard</li> */}
                <li onClick={this.logoutClicked}>logout</li>
                <li>
                  {/* <label>Admin
                    <input type='checkbox' />
                    <span className='checkmark'/>
                  </label> */}
                  {/* <input id="checkbox" type="checkbox" value="admin" />
                  <label for="checkbox" class="checkbox">
                    Admin
                  </label> */}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.user;
  return {
    user
  };
};

export default connect(mapStateToProps, { checkUser, logout })(withRouter(Nav));
