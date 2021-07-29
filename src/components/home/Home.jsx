import React, { Component } from 'react'
import {TableDisplay} from './TableDisplay'

export class Home extends Component {
    render() {
        return (
               <TableDisplay home='true'/>
        )
    }
}

export default Home
