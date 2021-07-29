import React, { Component } from 'react'
import './Home.css'

export class CardDisplay extends Component {
    
    render() {
        const cardData=[{'name':'GOOGL','value':'1515 USD', 'src':'Assets/GOOGL.png'},
              {'name':'FB','value':'266 USD','src':'Assets/FB.png'},
              {'name':'AMZ','value':'3116 USD','src':'Assets/AMZN.svg'}]

        return (
           <div className="d-flex justify-content-around">
               {
                   cardData.map((e,i)=> 
                   <div key={i} className="card m-3 bg-light">
                    <div className="card-body">
                        <h6 className="card-subtitle d-inline">{e.name}</h6>
                        <img
                        src={e.src}
                        height='50'
                        width='50'
                        className='d-inline'
                        />
                        <h4 className="fs-3 text-center">{e.value}</h4>
                       
                    </div>
                    </div>
                   )
               }
           </div>
        )
    }
}

export default CardDisplay
