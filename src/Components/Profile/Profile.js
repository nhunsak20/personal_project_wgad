import React, { Component } from "react";
import Loading from "../Loading/Loading";
import { connect } from "react-redux";

import axios from "axios";

import "./Profile.scss";

//  Profile(props) {
//     const [profile, setProfile] = useState({})

//     useEffect(() => {
//         if(!profile){
//             axios.get(`/api/profile/${props.match.params.profile_id}`).then(res => {
//                 setProfile(res.data)
//             }).catch(err => {
//                 props.history.push('/')
//            })
//         }

//         console.log('isLoading: ' + props.userReduce.isLoading ? 'yes': 'no')

//     })

//         return (
//             <div className="profile">
//                 {console.log('isLoading: ' + props.userReduce.isLoading ? 'yes': 'no')}
//                 {props.userReduce.isLoading ? <Loading /> : null}
//                 <div className="profile-container">
//                     <div>
//                         <h1>Welcome, {profile.first_name}!!</h1>
//                     </div>
//                 </div>
//             </div>
//         )

// }

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {}
    };
  }


  componentDidMount() {
    axios
      .get(`/api/profile/${this.props.match.params.profile_id}`)
      .then(res => {
        this.setState({
            profile: (res.data)
        })
      })
      .catch(err => {
        this.props.history.push("/");
      });
  }

  render() {
    return (
      <div className="profile">
        
        {this.props.userReduce.isLoading ? <Loading /> : null}
        <div className="profile-container">
          <div>
            <h1>Welcome, {this.state.profile.first_name}!!</h1>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    userReduce: reduxState
  };
};

export default connect(mapStateToProps)(Profile);
