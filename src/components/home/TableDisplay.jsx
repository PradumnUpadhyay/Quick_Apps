import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import {NavigateNext,NavigateBefore, Search} from '@material-ui/icons'
import { ButtonDisplay } from '../../Button'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Home.css'

export class TableDisplay extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            counter:1,
            perPage:{
                i: 1,
                n: 5 
            },
            endpoint: "http://127.0.0.1:4001"
        }
        this.HandleNext=this.HandleNext.bind(this)
        this.HandleBefore=this.HandleBefore.bind(this)
    }

    componentDidMount() {
        const {endpoint}=this.state
      if(this.props.home) {
        const socket=socketIOClient(endpoint,{secure: true, reconnection: true, rejectUnauthorized: false })
        socket.on("APIdata", data=> this.setState({data: data}))
        
        socket.on('connect_error',err=> console.log(err))
      
     }
     if(this.props.view) {
        this.sendRequest(endpoint)
     }
    }

    sendRequest(ep) {       
        axios.get(ep+'/view')
        .then(res => this.setState({data:[...res.data]}))
        .catch(err=>console.log(err))
    } 

    HandleNext() {
        const {endpoint}=this.state
        const socket=socketIOClient(endpoint,{secure: true, reconnection: true, rejectUnauthorized: false })
       this.setState({data: []})
        if(this.state.counter < 100) {
            socket.emit("pageChange", (this.state.counter+1).toString())
            this.setState({counter: this.state.counter+1, perPage: {i:this.state.perPage.i+5,n:this.state.perPage.n+5}})
           
    }}

    HandleBefore() {
        const {endpoint}=this.state
        if(this.state.counter >1) { 
           
        const socket=socketIOClient(endpoint,{secure: true, reconnection: true, rejectUnauthorized: false })
        this.setState({data: []})
        socket.emit("pageChange", (this.state.counter-1).toString())
            this.setState({counter: this.state.counter-1, perPage: {i:this.state.perPage.i-5,n:this.state.perPage.n-5}}) 
           
    }}

    render() {

        const tableHeading=["CRYPTO NAME","SYMBOL","MARKET CAP","","CURRENT PRICE"]

        return (
                       
              <div className="container border rounded shadow-sm" style={{'width':'56%','height':'fit-content'}}>
            {
            this.props.home ? 
                
           <>
         
               <div className="d-flex align-items-center p-3 justify-content-between">
                   Crypto Details Table 
                    <input className="form-control w-50" placeholder="Serach by Crypto Name" />   
                </div>                  
                   
                <table className="table">
                    <thead>
                        <tr style={{'background-color':'rgb(244,242,255)'}} className="w-100">
                            {
                                tableHeading.map((e,i)=>
                                <th key={i} scope="col">{e}</th>
                                )
                            }
                         
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((e,i)=>
                            <tr key={i} >
                                <th scope='row'>{e.name}</th>
                                <td style={{'background-color':'rgb(244,242,255)'}} className="badge rounded-pill">{e.symbol}</td>
                                <td>${(e.market_cap/Math.pow(10,9)).toFixed(1)}B</td>
                                <td><ButtonDisplay val={i} data={{'symbol': e.symbol,'name':e.name,'marketCap':e.market_cap,'currentPrice':e.price}}/></td>
                                <td>
                                    <div className="price">
                                    ${(e.price > Math.pow(10,3)) ? (e.price/1000).toFixed(2)+'K' : (e.price/1).toFixed(2)}
                                
                                <p className="fs-6">USD</p>
                                    </div>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
                <div style={{'background-color':'rgb(244,242,255)'}} className="d-flex flex-row-reverse justify-content-evenly align-text-bottom border-top">
                    
                    <NavigateNext onClick={this.HandleNext} /> 
                    
                
                    <NavigateBefore onClick={this.HandleBefore} />
                    <p>{(this.state.perPage).i}-{this.state.perPage.n} of 100</p>
                </div>
                    </>
         
            :
            this.props.view && 
           
               <>
            <p className="d-flex p-3 justify-content-center" style={{'background-color':'rgb(244,242,255)'}}>SAVED DATA TABLE</p>                  
                
             <table className="table">
                
                 <tbody>
                     { 
                         this.state.data.map((e,i)=>
                         <tr key={i} className="align-middle">
                             <th scope='row'>{e.name}</th>
                             <td style={{'background-color':'rgb(230,230,242)'}} className="badge rounded-pill">{e.symbol}</td>
                             <td>{e.market_cap}</td>
                             <td><button className="btn btn-default" style={{'background-color':'rgb(108,91,207)','color':'white'}} onClick={()=>{

                                 axios.delete(`${this.state.endpoint}/view/${e._id}`)
                                 .then(_=>{
                                
                                   const d=this.state.data.filter(val=>e._id !== val._id)
                                   this.setState({data:d})
                                 })
                             }}
                             >
                                 Delete
                                 </button>
                            </td>
                            <td>{e.currentPrice}</td>
                         </tr>
                         )
                     }
                 </tbody>
             </table>
             <div className="p-3 border-top d-flex justify-content-center" style={{'background-color':'rgb(244,242,255)'}}>
             <Link className='btn btn-defaul' style={{'background-color':'rgb(108,91,207)','color':'white'}} to='/home'
                 >
                     Back
                 </Link>
             </div>
                </>
    }         
      </div>
        )
    }
}

export default TableDisplay
