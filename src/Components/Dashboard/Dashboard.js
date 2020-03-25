import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkUser } from '../../Redux/userReducer'

import groupImg from '../../assets/groupGolf.jpg'
import golfImg from '../../assets/golf.jpg'

import './Dashboard.css'

class Dashboard extends Component {

    // componentDidUpdate(prevProps, prevState) {
    //     if(this.state.email !== prevState.email) {
    //         this.setState({
    //             email: this.props.userReducer.user.email
    //         })
    //     }
    // }

    // componentDidMount() {
    //     this.props.getUser()

    //     this.setState({
    //         email: this.props.userReducer.user.email
    //     })
    // }

    render() {
        return (
            <div className="dashboard">
                <div className='dash-container'>
                    <h1 style={{textAlign: 'center'}}>Welcome to <span style={{fontSize: '4rem'}}>WGAD</span></h1>
                    <h3 style={{textAlign: 'center'}}>Wasatch Golf Association of the Deaf</h3>
                    <div className='background-img'>
                        <img src={golfImg} alt=''/>
                    </div>
                    <div className='background-img-1'>
                        <img src={groupImg} alt=''/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const { user } = reduxState
    return {
        user
    }
}

export default connect(mapStateToProps, { checkUser })(Dashboard)