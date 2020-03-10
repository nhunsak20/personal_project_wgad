import React, { Component } from 'react'

export class Loading extends Component {

    componentDidMount() {
        const loading = document.getElementById('loading')
        loading.style.position = 'absolute'
        loading.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'
        loading.style.width = '100vw'
        loading.style.height = '100vh'
        loading.style.display = 'flex'
        loading.style.justifyContent = 'center'
        loading.style.alignItems = 'center'
    }


    render() {
        return (
            <div className='loading' id='loading'>>
                <h1 style={{fontSize: '3rem'}}>Loading</h1>
            </div>
        )
    }
}

export default Loading
