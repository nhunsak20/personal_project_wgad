import React, { Component } from 'react'

const styles = {
    paddingTop: '10vh',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
}

export class News extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.history.push('/')
          }, 3000);
    }
    render() {
        return (
            <div style={styles}>
                <h1 style={{fontSize: '3rem', textShadow:'black 0 0 5px'}}>Thank you</h1>
                <p style={{fontSize: '2.2rem', textShadow:'black 0 0 5px'}}>Have a nice day, pal!</p>
            </div>
        )
    }
}

export default News
