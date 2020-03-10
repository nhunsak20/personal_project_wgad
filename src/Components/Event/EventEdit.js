import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import axios from 'axios'

import delete_icon from '../../assets/delete-icon.png'

function EventEdit(props) {
    const[event, setEvent] = useState({})
  const [course, setCourse] = useState({});
  const [date, setDate] = useState("");
  const [describe, setDescribe] = useState("");

  useEffect(() => {
      axios.get(`/api/events/${props.match.params.event_id}`).then(res => {
          setEvent(res.data)
      })
  })

  const courseHandleChanged = event => {
    setCourse(event.target.value);
  };
  const dateHandleChanged = event => {
    setDate(event.target.value);
  };
  const describeHandleChanged = event => {
    setDescribe(event.target.value);
  };
  const submitClicked = event => {
    event.preventDefault();

    axios.put('/api/events', { course, date, describe }).then(() => {
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

  const deleteClicked = event => {
    axios.delete(`/api/events/${props.match.params.event_id}`)
  }
  return (
    <div className="new-event">
      <div className="new-event-container">
        <form onSubmit={submitClicked} className="new-event-form">
          <div className='new-event-form-container'>
            <h2 className="new-event-title">Edit Event</h2>
            { props.user.isAdmin ? (
            <div className="event-delete-button" type='delete' onClick={deleteClicked}>
                <img src={delete_icon} alt='' />
            </div>
            ) : null}
            <div className="new-event-input-container">
              <h3>Course:</h3>
              <select vaule={event.course} onChange={courseHandleChanged}>
                <option>Select Options</option>
                {/* {selectCourse} */}
              </select>
              <div>
                <h3>Date:</h3>
                <input type='date' value={event.date} onChange={dateHandleChanged}/>
                {/* Date... */}
              </div>
              <div>
                <h3>Describe: </h3>
                <textarea value={event.describe} onChange={describeHandleChanged}></textarea>
              </div>
            </div>

            <div className='new-event-buttons'>
              <button className='new-event-button' type='cancel' onClick={cancelClicked}>Cancel</button>
              <button className='new-event-button' type="submit">save</button>
            </div>
          </div>
        </form>
      </div>
      {/* <Error message='Whoa!!'/> */}
    </div>
    
  );
}

const mapStateToProps = reduxState => ({ user: reduxState.user})

export default connect(mapStateToProps)(EventEdit);
