import React, { useState, useEffect }from 'react'

import './Event.scss'

import data from '../../golf.json'



function EventDetail(props) {
    const[cousre, setCousre] = useState({})

    useEffect(() => {
    //     if(!cousre) {
        // let list = data.filter(list => list.id === +props.match.params.event_id)
        // setCousre(list)
        // const { event_id } = props.match.params
        // let list = data.filter(lists => lists.id === +event_id)
        // setCousre(list)
    //     }
    })


    return (
        <div className='event-detail'>
            <div className='event-detail-container'>
            </div>
            
        </div>
    )
}

export default EventDetail

