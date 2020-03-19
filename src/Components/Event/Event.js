import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment'
import edit_icon from "../../assets/edit_icon.png";
import axios from 'axios';
import "./Event.scss";

class Event extends Component {
  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    axios.get('/api/events').then(res => {
      this.setState({
        events: res.data
      })
    })
  }

  newEvents = event => {
    this.props.history.push("/events/new");
  };

  editEvent = event_id => {
    this.props.history.push(`/events/edit/${event_id}`);
  };

  detailEvent = event_id => {
    this.props.history.push(`/events/${event_id}`);
  };

  render() {
    const event = this.state.events.map((event, i) => {
      return (
        <div key={i} className="event-box-container">
          <div className="event-title">
            <div className="event-title-img-back">
              {event.img ? (
                <img src={event.img} alt="" />
              ) : (
                <div className="event-course-none-img"></div>
              )}
              {event.course ? <span className='event-course'>{event.course}</span> : null}
            </div>
            {event.event_date ? (
              <h3 className="event-title-header">{moment(event.event_date).format('MMM DD,YYYY')}</h3>
            ) : (
              <h3 className="event-title-header">TBS</h3>
            )}
          </div>
          <div className="event-right-side">
            <div className="event-date">
              {event.address ? (
                <span className="event-location">{event.address.city}, {event.address.state}</span>
              ) : null}
            </div>
            <div className="event-flex-buttons">
              {/* <button className='event-button'>leave</button> */}
              { this.props.user.id ? (
                <button className="event-button">join</button>) : null }
              <button className="event-button" onClick={() => this.detailEvent(event.event_id)}>
                Details
              </button>
            </div>
          </div>
          { this.props.user.isAdmin ? (
          <div className="event-edit-button" onClick={() => this.editEvent(event.event_id)}>
            <img src={edit_icon} alt="" />
          </div>
          ): null }
        </div>
      );
    });
    return (
      <div className="event" id="event">
        <div className="event-container">
          <div className="event-header">
            <h1>Events</h1>
            {this.props.user.isAdmin ? (
            <div className="event-new-buttons">
              <div className="event-new-button" onClick={this.newEvents}>
                <div></div>
                <div></div>
              </div>
            </div>
            ): null }
          </div>
          <div className="event-box">{event}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.user
  return {
    user
  }
};

export default connect(mapStateToProps)(Event);
