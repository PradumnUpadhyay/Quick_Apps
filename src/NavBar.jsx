import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'

export class NavBar extends Component {
    render() {
        return (
            
            <Navbar style={{'background-color': 'rgb(53,73,107)'}}>
                <Navbar.Brand href="#home">
                        <img
                        className="d-inline"
                            src="Assets/logo.png"
                            height='37'
                            width='80'                        
                        />
                </Navbar.Brand>
            </Navbar> 
           
        )
    }
}

export default NavBar
