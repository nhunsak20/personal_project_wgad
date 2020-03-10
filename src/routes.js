import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Dash from './Components/Dashboard/Dashboard'
import Event from './Components/Event/Event'
import EventForm from './Components/Event/EventForm'
import Shops from './Components/Shops/Shops'
import Profile from './Components/Profile/Profile'
import Login from './Components/Auth/Login'
import News from './Components/News/News'
import EventEdit from './Components/Event/EventEdit'
import Checkout from './Components/Shops/Checkout'
import EventDetail from './Components/Event/EventDetail'

export default (
    <Switch>
        <Route exact path='/' component={Dash} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/events' component={Event} />
        <Route exact path='/events/edit/:event_id' component={EventEdit} />
        <Route exact path='/shops' component={Shops} />
        <Route path='/shops/checkout' component={Checkout} />
        <Route path='/profile/:profile_id' component = {Profile} />
        {/* <Route path='/profile/scorecard' component = {Scorecard} />
        <Route path='/profile/play' component = {Play} /> */}
        <Route path='/events/new' component={EventForm} />
        {/* <Route path='/events/:event_id' component={EventDetail} /> */}
        <Route path='/login' component = {Login} />
        <Route path='/news' component = {News} />
    </Switch>
)