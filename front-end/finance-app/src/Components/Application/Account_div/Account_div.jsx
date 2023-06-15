import { useEffect, useState } from 'react';
import './Accounts_div.css';
import user from './user.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { idAccount } from '../../config/actions';
import { useDispatch } from 'react-redux';
export default function Accounts_div() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [dataAccounts, setDataAccounts] = useState([]);
    const [avatar, setAvatar] = useState(user);
    const [receivers, setReceivers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [username, setUser] = useState('')
    useEffect(() => {
        axios.get(`api/data/profile/`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res);
                setUser(res.data.payload.username)
                setAvatar(res.data.payload.avatar)
                setReceivers(res.data.payload.receivers)
                setTransactions(res.data.payload.transactions)
                setDataAccounts(res.data.payload.accounts)
            }).catch(err => {
                console.log(err);
            });
    }, []);
    console.log(dataAccounts)

    const profile_div = () => {
        const div_pass = document.querySelector('.profile_div');
        console.log(div_pass);
        if (!div_pass.classList.contains('active')) {
            return div_pass.classList.add('active')
        } else {
            return div_pass.classList.remove('active')
        }
    }
    const handleLogout = () => {
        console.log(localStorage.getItem('token'));
        axios.delete(`api/logout/`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                console.log(res);
                // localStorage.removeItem('token');
                navigate('/')
            }).catch(err => {
                console.log(err);
                swal('Warning', err.message, 'warning');
            })
    }

    const handleAccount = (id) => {
        console.log(id);
        dispatch(
            idAccount(id)
        )
    }

    return (
        <div className='Accounts_div'>

            <div className='profile_div'>
                <div className='body_profile_div'>
                    <h5>{username}</h5>
                </div>
                <div className='btns_profile_div'>
                    {localStorage.getItem('role') === 'admin' && <button onClick={() => { navigate('/admin/dashboard') }}>Control panel</button>}
                    {localStorage.getItem('role') === 'agent' && <button onClick={() => { navigate('/agent/dashboard') }}>Agent panel</button>}
                    <button onClick={() => { navigate('/settings_user') }}>Settings</button>
                    <button className='logout_btn' onClick={handleLogout}>LogOut</button>
                </div>

            </div>


            <div className='notifications'>
                <i class="fa-regular fa-bell"></i>
                <img src={`data:image/png;base64,${avatar}`} alt="user" onClick={profile_div} />
            </div>
            <div className='accounts'>
                <div className='accounts_head'>
                    <h5>My accounts</h5>
                    <i class="fa-regular fa-square-plus" onClick={() => { navigate('/add_accounts') }}></i>
                </div>
                <div className='accounts_body'>
                    {dataAccounts.map(e => {
                        return (
                            <div className='square' onClick={() => handleAccount(e.account_id)}>
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
                                    <p>{transaction.date.slice(0, 10)}</p>
                                </div>
                            </div>
                            <span>{transaction.amount} DH</span>
                        </div>)
                })}

            </div>
        </div>
    )
}