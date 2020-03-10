import React, { Component } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

class Error extends Component {
  render() {
    if (this.props.userReducer.isError) {
      toast.error(`${this.props.userReducer.errorMessage}`, {
        position: toast.POSITION.TOP_CENTER,
        bodyClassName: 'error-top'
      });
    }
    if (this.props.messages) {
      toast.error(`${this.props.messages}`, {
        position: toast.POSITION.TOP_CENTER,
        bodyClassName: 'error-top'
      });
    }
    return (
      <div>
        <ToastContainer autoClose={5000} />
      </div>
    );
  }
}

const mapStateToProps = reduxState => ({ userReducer: reduxState });

export default connect(mapStateToProps)(Error);
