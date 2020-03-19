import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import axios from "axios";

import delete_icon from "../../assets/delete-icon.png";

function EventEdit(props) {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({});
  const [date, setDate] = useState("");
  const [describle, setDescrible] = useState("");

  useEffect(() => {
    if (props.match.params.event_id) getData();
  });

  const getData = () => {
    axios
      .get(`/api/events/${+props.match.params.event_id}`)
      .then(res => {
        setCourse(res.data[0])
        setDate(res.data[0].event_date);
        setDescrible(res.data[0].describle);
      })
      .catch(err => console.log(err));

    axios.get('/api/courses').then(res => {
      setCourses(res.data)
    })

    if(!props.user.isAdmin) props.history.goBack()
  };

  const courseHandleChanged = event => {
    let findCourse = courses.filter(course => course.course.match(event.target.value))
    console.log(findCourse)
    setCourse(findCourse[0]);
  };
  const dateHandleChanged = event => {
    setDate(event.target.value);
  };
  const describeHandleChanged = event => {
    setDescrible(event.target.value);
  };
  const submitClicked = event => {
    event.preventDefault();
    const { course_id } = course
    axios.put(`/api/events/${props.match.params.event_id}`, { course_id, date, describle }).then(() => {
      props.history.push("/events");
    });
  };

  const cancelClicked = event => {
    //   if(!course && !date && !describe) {
    props.history.push("/events");
    //   }
    //   else {
    //       alert("Whoa!!")
    //   }
  };

  const selectCourses = courses.map(course => {
    return (
      <option key={course.course_id} value={course.course}>{course.course}</option>
    )
  })

  const deleteClicked = event => {
    axios.delete(`/api/events/${props.match.params.event_id}`);
  };

  return (
    <div className="new-event">
      <div className="new-event-container">
        <form onSubmit={submitClicked} className="new-event-form">
          <div className="new-event-form-container">
            <h2 className="new-event-title">Edit Event</h2>
            {props.user.isAdmin ? (
              <div
                className="event-delete-button"
                type="delete"
                onClick={deleteClicked}
              >
                <img src={delete_icon} alt="" />
              </div>
            ) : null}
            <div className="new-event-input-container">
              <h3>Course:</h3>
              <select value={course.course} onChange={courseHandleChanged}>
                <option value=''>Select Options</option>
                {selectCourses}
              </select>
              
              <div>
                <h3>Date:</h3>
                <input
                  type="date"
                  value={moment(date).format("YYYY-MM-DD")}
                  onChange={dateHandleChanged}
                />
                {/* Date... */}
              </div>
              <div>
                <h3>Describle: </h3>
                <textarea
                  value={describle}
                  onChange={describeHandleChanged}
                ></textarea>
              </div>
            </div>

            <div className="new-event-buttons">
              <button
                className="new-event-button"
                type="cancel"
                onClick={cancelClicked}
              >
                Cancel
              </button>
              <button className="new-event-button" type="submit">
                save
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* <Error message='Whoa!!'/> */}
    </div>
  );
}

const mapStateToProps = reduxState => {
  const { user } = reduxState.user
  return {
    user
  }
};

export default connect(mapStateToProps)(EventEdit);
