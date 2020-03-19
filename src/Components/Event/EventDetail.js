import React, { useState, useEffect } from "react";
import moment from 'moment'
import axios from "axios";
import GoogleMapReact from "google-map-react";
import golf_tee from "../../assets/golf-tee-waypoint.png";

import "./Event.scss";

const Marker = () => (
  <div className="google-map-marker">
    <div></div>
    <img src={golf_tee} alt="" />
  </div>
);

function EventDetail(props) {
  const [event, setEvent] = useState({});
  const [join, setJoin] = useState(false);
  const { location, slopes, address } = event;

  useEffect(() => {
    if (props.match.params.event_id) getData();
  });

  const getData = () => {
    axios
      .get(`/api/events/${+props.match.params.event_id}`)
      .then(res => {
        setEvent(res.data[0]);
      })
      .catch(err => console.log(err));
  };

  const goBackClicked = () => {
      props.history.goBack();
  }
  

  const slopeMenList = slopes
    ? slopes.men.map((slope, i) => {
        let color = slope.color.match("champ") ? "black" : slope.color;
        return (
          <div key={i} className="course-slopes-box">
            <div
              className="course-slopes"
              style={{
                border: `${color.match("white") ? "black" : "white"} solid 2px`,
                background: `linear-gradient(120deg, ${color},rgb(255, 255, 255, 0.2) 10%, ${color})`
              }}
            ></div>
            <div className="yard-slopes">
              <span>{slope.yards}</span>
              <span>
                {slope.rating}/{slope.slope}
              </span>
            </div>
          </div>
        );
      })
    : null;

  const slopeWomenList = slopes
    ? slopes.women.map((slope, i) => {
        let color = slope.color.match("champ") ? "black" : slope.color;
        return (
          <div key={i} className="course-slopes-box">
            <div
              className="course-slopes"
              style={{
                border: `${color.match("white") ? "black" : "white"} solid 2px`,
                background: `linear-gradient(120deg, ${color},rgb(255, 255, 255, 0.2) 10%, ${color})`
              }}
            ></div>
            <div>
              <div className="yard-slopes">
                <span>{slope.yards}</span>
                <span>
                  {slope.rating}/{slope.slope}
                </span>
              </div>
            </div>
          </div>
        );
      })
    : null;

  return (
    <div className="event-detail">
      <div className="event-detail-container">
        <div className="event-detail-header">
          <div className="event-detail-header-left">
            <div className="event-detail-div-img">
              <img src={event.img} alt="" />
            </div>
            <div className="event-detail-div-date">
              <span className="event-detail-date">{moment(event.event_date).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <div className="event-detail-header-right">
            <h2 className="event-detail-course-title">{event.course}</h2>
            <div className="event-detail-address">
              {address ? (
                <p>
                  {address.address} <br />
                  {address.city}, {address.state} {address.zip}
                </p>
              ) : (
                <p>No address...</p>
              )}
            </div>

            <div className="event-detail-buttons">
              {join ? 
                <button className="event-detail-button" onClick={() => setJoin(!join)}>Leave</button>
                : 
                <button className="event-detail-button" onClick={() => setJoin(!join)}>Join</button>
              }
              <button className="event-detail-button" onClick={() => {goBackClicked()}}>back</button>
            </div>
          </div>
        </div>
        <div className="event-detail-middle">
            {event.describle ? 
            <div className="event-detail-desr">{event.describle}</div>
            : null }
          <div className="event-detail-slopes">
            <div className="event-detail-slope-men">
              <label>Men:</label>
              <div className="event-detail-slope">{slopeMenList}</div>
            </div>
            <div className="event-detail-slope-women">
              <label>Women:</label>
              <div className="event-detail-slope">{slopeWomenList}</div>
            </div>
          </div>
        </div>

        <div className="event-detail-map">
          <div className="google-map-box">
            {location ? (
              <GoogleMapReact
                className="google-map"
                bootstrapURLKeys={{
                  key: "AIzaSyDFBZ2JpltaA8-FRtOyFL7aX0PHpHzynok"
                }}
                defaultCenter={location}
                defaultZoom={15}
              >
                <Marker lat={location.lat} lng={location.lng} />
              </GoogleMapReact>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
