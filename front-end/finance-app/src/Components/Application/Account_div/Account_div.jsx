import { useEffect, useState } from 'react';
import './Accounts_div.css';
import user from './user.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Accounts_div() {
    const Accounts = useSelector((x) => x.Accounts) 
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(user);
    const [receivers, setReceivers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        axios.get(`/api/data/profile`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res);
                setAvatar(res.data.payload.avatar)
                setReceivers(res.data.payload.receivers)
                setTransactions(res.data.payload.transactions)
            }).catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <div className='Accounts_div'>
            <div className='notifications'>
                <i class="fa-regular fa-bell"></i>
                <img src={`data:image/png;base64,${avatar}`} alt="user" />
            </div>
            <div className='accounts'>
                <div className='accounts_head'>
                    <h5>My accounts</h5>
                    <i class="fa-regular fa-square-plus" onClick={() => { navigate('/add_accounts') }}></i>
                </div>
                <div className='accounts_body'>
                {Accounts.map(e =>{
                    return(
                        <div className='square'>
                         <p>{e.account_name}</p>
                        </div> 
                    )
                    
                })  
                }
                </div>
            </div>
            <div className='receivers'>
                <h5>Receivers</h5>
                <div className='cercles'>
                    {receivers.map(img => {
                        return (
                            <img src={`data:image/png;base64,${img.avatar}`} alt="user" />
                        )
                    })}
                </div>
            </div>
            <div className='recent_activity'>
                <h5>Recent Activity</h5>
                {transactions.map(transaction => {
                    return (
                        <div className='activities'>
                            <div className='activity'>
                                <img src={`data:image/png;base64,${transaction.avatar}`} alt="user" />
                                <div className='descreption_activity'>
                                    <h5>{transaction.name}</h5>
                                    <p>{transaction.date}</p>
                                </div>
                            </div>
                            <span>{transaction.amount} DH</span>
                        </div>)
                })}
            </div>
        </div>
    )
}