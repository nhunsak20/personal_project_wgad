import React, { Component } from "react";
import { connect } from "react-redux";
import edit_icon from "../../assets/edit_icon.png";
import "./Event.scss";

class Event extends Component {
  constructor() {
    super();
    this.state = {
      events: [
        {
          course: "Davis Park",
          location: "Fruits Height",
          img:
            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEBUQEhIVFhUVFRUSFhYXFRcVFxYSFRYXGBUYFRYYHykgGBsnHBUVLTEiJS0rLjAvFyAzODMsNykuLisBCgoKDg0OGhAQGzcmHSUrKzcrLS0vLS0tLTIrLy0tLystMS0tLS8rMDctMC0tLS81LTc1LS0tLSstLi0tLS01Lf/AABEIAN4A4wMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcCAf/EAEMQAAICAQIDBQQFCQYGAwAAAAECAAMRBBIFITEGEyJBUWFxgZEHFDKh0hUjQlJygpOxsiQzYnOSojQ1g7Pw8SZTY//EABoBAQADAQEBAAAAAAAAAAAAAAABAgMFBAb/xAArEQEAAgIABQMDAwUAAAAAAAAAAQIDEQQSITFhE0FRQnGxBSOBFCKRwdH/2gAMAwEAAhEDEQA/AO4xEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQETQ1HE0rvSp2x3mAn+JzuOB8EP3TfgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgfGYDmZ9ld7V8RsrTu0QjeyKtg54YkdAAefvx7Myc0f8Adrzz4QM5znl6+cyrli15pHsnTNNfiHed23dY348OTgZ9+Dj5GbEi+N8XporJtu7voAwG4qSQBywfUHn5ZPlNZQpHB9Ta/F2fVDa1CrVllqXBsJK895HMHAKgsQee3nOlKZwvU8VUcU79rq3CeE2tTlSApXJSvIZvRuhOM4E67wnifftlFsWtR1srNbWMcY2qwHh68+XPGOUzpZKYnneM4/8AOX/uepWLeIO+trqKtWEDMeviBIC5OMYyByBx05+UjLlimvMkRtZ4nwT7NUEREBERAREQEREBERAREQEREBERAREQE8u2BmepEdobxXUbSfsg+E5KuCOasB645HylL25azJCsdueLB17sbx4sDITadpGT+srA45HHXpJ7s9rWaqrcvdoR4S21TYegCoOg8/b/AD55xfiC3bcIQRkFmbc7D9HcRy+Q+Jk32O11j6jJUWEBVFh5mpOmAoI8J8yPPBM4eHi+biZnffTa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",
          date: "May 03, 2020",
          isCanceled: false
        },
        {
          course: "Valley View",
          img: "https://logos.bluegolf.com/valleyviewutah/profile.png",
          date: "June 12, 2020",
          location: "Layton, UT",
          isCanceled: false
        },
        {
          course: "Bountiful Ridge",
          location: "Bountiful, UT",
          img:
            "https://bountifulridgegolf.com/wp-content/uploads/2015/02/Screen-Shot-2015-02-03-at-11.14.56-PM.png",
          date: "July, 02, 2020",
          isCanceled: false
        },
        {
          course: "Eaglewood",
          location: "North Salt Lake, UT",
          img:
            "https://a.mktgcdn.com/p/B4n9IV6FtAazn9tKgCcospe99xR9Wd0CPwF85d4OHeY/1.0000/1932x1932.jpg",
          date: null,
          isCanceled: false
        },
        {
          course: "Logan River",
          location: "Logan, UT",
          img:
            "data:image/png;base64,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",
          date: "Sept. 20, 2020",
          isCanceled: false
        }
      ]
    };
  }

  componentDidMount() {
    
  }

  newEvents = event => {
    this.props.history.push("/events/new");
  };

  editEvent = event => {
    this.props.history.push(`/events/edit/${1}`);
  };

  detailEvent = event => {
    this.props.history.push(`/events/${3}`);
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
            {event.date ? (
              <h3 className="event-title-header">{event.date}</h3>
            ) : (
              <h3 className="event-title-header">TBS</h3>
            )}
          </div>
          <div className="event-right-side">
            <div className="event-date">
              {event.location ? (
                <span className="event-location">{event.location}</span>
              ) : null}
            </div>
            <div className="event-flex-buttons">
              {/* <button className='event-button'>leave</button> */}
              { this.props.user.id ? (
                <button className="event-button">join</button>) : null }
              <button className="event-button" onClick={this.detailEvent}>
                Details
              </button>
            </div>
          </div>
          { this.props.user.isAdmin ? (
          <div className="event-edit-button" onClick={this.editEvent}>
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
