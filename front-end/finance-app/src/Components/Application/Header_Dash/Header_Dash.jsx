import { useState } from 'react';
import './Header_Dash.css';
export default function Header_Dashboard(props){
    
    return(
        <div className='Header_Dashboard'>
            <h1>{props.title}</h1>
            <button className="btnBars"><i className="fa fa-bars"></i></button>
        </div>
    )
}