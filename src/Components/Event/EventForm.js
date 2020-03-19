import React, { useState, useEffect } from "react";
import axios from 'axios'

function EventForm(props) {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState({})
  const [date, setDate] = useState("");
  const [describle, setDescrible] = useState("");


  useEffect(() => {
    getData()
  },[])

  const getData = () => {
    axios.get('/api/courses').then(res => {
      console.log('got it')
      setCourses(res.data)
    })
  }

  const courseHandleChanged = event => {
    let findCourse = courses.filter(course => course.course.match(event.target.value))
    console.log(findCourse)
    setCourse(findCourse[0]);
  };
  const dateHandleChanged = event => {
    setDate(event.target.value);
  };
  const describleHandleChanged = event => {
    setDescrible(event.target.value);
  };

  const submitClicked = event => {
    const { course_id } = course
    event.preventDefault();
    axios.post('/api/events', { course_id, date, describle }).then(() => {
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

  const selectCourse = courses.map(course => {
    return (
    <option key={course.course_id} value={course.course}>{course.course}</option>
    )
  })
  return (
    <div className="new-event">
      <div className="new-event-container">
        <form onSubmit={submitClicked} className="new-event-form">
          <div className='new-event-form-container'>
            <h2 className="new-event-title">New Events</h2>
            <div className="new-event-input-container">
              <h3>New Course:</h3>
              <select value={course.course} onChange={courseHandleChanged}>
                <option value="">Select Options</option>
                {selectCourse}
              </select>
              <div>
                <h3>New Date:</h3>
                <input type='date' value={date} onChange={dateHandleChanged}/>
                {/* Date... */}
              </div>
              <div>
                <h3>Describe: </h3>
                <textarea value={describle} onChange={describleHandleChanged}></textarea>
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
