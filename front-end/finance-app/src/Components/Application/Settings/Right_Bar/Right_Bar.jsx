import './Right_Bar.css';
import user from '../../Account_div/user.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Right_Bar(){
    return(
        <div className='Accounts_div'>
            <div className='notifications'>
                <i class="fa-regular fa-bell"></i>
                <img src={user} alt="user" />
            </div>
            <div className='accounts'>
                <div className='accounts_head'>
                    <h5>My accounts</h5>
                    <i class="fa-regular fa-square-plus"></i>
                </div>
                <div className='accounts_body'>
                    <div className='square'></div>
                    <div className='square'></div>
                    <div className='square'></div>
                </div>
            </div>
            
        </div>
    )
}