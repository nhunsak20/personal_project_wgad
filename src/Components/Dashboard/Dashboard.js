import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkUser } from '../../Redux/userReducer'

class Dashboard extends Component {

    constructor() {
        super()
        this.state = {
            email: ''
        }
    }

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
            <div style={{paddingTop:"75px"}}>
                <h1>Dashboard</h1>
                {this.props.userReducer.user.email}
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        userReducer: reduxState
    }
}

export default connect(mapStateToProps, { checkUser })(Dashboard)