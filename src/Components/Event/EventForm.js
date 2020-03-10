import React, { useState } from "react";
import axios from 'axios'

function EventForm(props) {
  const [course, setCourse] = useState({});
  const [date, setDate] = useState("");
  const [describe, setDescribe] = useState("");

  const courseHandleChanged = event => {
    setCourse(event.target.value);
  };
  const dateHandleChanged = event => {
    setDate(event.target.value);
  };
  const describeHandleChanged = event => {
    setDescribe(event.target.value);
  };
  const selectCourse = {};

  const submitClicked = event => {
    event.preventDefault();

    axios.post('/api/events', { course, date, describe }).then(() => {
        props.history.push('/events')
    })
  };

  const cancelClicked = event => {
    //   if(!course && !date && !describe) {
        props.history.push('/events')
    //   }
    //   else {
    //       alert("Whoa!!")
    //   }
  }
  return (
    <div className="new-event">
      <div className="new-event-container">
        <form onSubmit={submitClicked} className="new-event-form">
          <div className='new-event-form-container'>
            <h2 className="new-event-title">New Events</h2>
            <div className="new-event-input-container">
              <h3>New Course:</h3>
              <select vaule={course} onChange={courseHandleChanged}>
                <option>Select Options</option>
                {/* {selectCourse} */}
              </select>
              <div>
                <h3>New Date:</h3>
                <input type='date' value={date} onChange={dateHandleChanged}/>
                {/* Date... */}
              </div>
              <div>
                <h3>Describe: </h3>
                <textarea value={describe} onChange={describeHandleChanged}></textarea>
              </div>
            </div>

            <div className='new-event-buttons'>
              <button className='new-event-button' type='cancel' onClick={cancelClicked}>Cancel</button>
              <button className='new-event-button' type="submit">submit</button>
            </div>
          </div>
        </form>
      </div>
      {/* <Error message='Whoa!!'/> */}
    </div>
    
  );
}

export default EventForm;
