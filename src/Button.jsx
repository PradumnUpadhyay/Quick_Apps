import React, { Component } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

export class ButtonDisplay extends Component {

  constructor(props) {
    super(props)
    this.state={
      val:false,
      text: 'Save Data',
      endpoint: 'http://127.0.0.1:4001/home'
    }

    this.handleClick=this.handleClick.bind(this)
  }
  
  handleClick(val) {
    
    const {endpoint}=this.state
    const {data}=this.props 

    axios.post(endpoint,{
        ...data
    }).then(
      res=> {
      
        if(res.status === 200) this.setState({text:val,val:true})
      }
    )
    .catch(err => console.log(err))
   
  }

  render() {
    return (
      <>
      {
        (this.state.val) ? 
        (<Link to="/view" className="btn btn-default" style={{'background-color':'rgb(108,91,207)','color':'white'}}>{this.state.text}</Link>) :
        ( <button className="btn btn-default" style={{'background-color':'rgb(24,160,251)','color':'white'}} onClick={()=> this.handleClick('view')}>
         {this.state.text}
       </button>)
      }
      </>
    )
  }
}

export default ButtonDisplay
