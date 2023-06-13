import './Activities.css';
import user from '../Account_div/user.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Activities() {
    const navigate = useNavigate();
    const[accounts, setAccounts] = useState([])
    const[account, setAccount] = useState()
    const[date, setDate] = useState()
    const[transaction, setTransaction] = useState([])
    const handleInput = (e) =>{
        e.persist();
        setAccount(
            account = e.target.value
        )
        setDate(
            date = e.target.value
        )
    }
    useEffect(() => {
        axios.get(`api/data/transaction`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setTransaction(res.data.payload.transactions)
            }).catch(err => {
                console.log(err);
            });
    }, [account, date]);
    useEffect(() => {
        axios.post(`api/data/finance_account/`, account, date,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    'content-type': 'application/json',
                }
            })
            .then(res => {
                setAccounts(res.data.payload.Finance_account)
            }).catch(err => {
                console.log(err);
            });
    }, [account, date]);
return(
    <div className='ActivitiesTransaction'>
        
        <h3>Activity</h3>
        <div className='filterandsearch'>
            <div className='filter'>
                <div className='filterBy'>
                    <h5>Filter by:</h5>
                    <input type="date" className='dateTransactions'  onChange={handleInput} value={date}/>
                    <label for="accounts"></label>
                    <select name="accounts" id="accounts" onChange={handleInput}>
                    {/* {
                        accounts.map(a =>{
                            return <option value={a.account_name}>{a.account_name}</option>
                        })
                    } */}
                    <option value="Account1">Account 1</option>
                    <option value="Account2">Account 2</option>
                    </select> 
                </div>
                <button onClick={() => { navigate('/addTransaction') }}>Add Transaction</button>
            </div>
        </div>
        <div className='activitiesdivs'>
        <div className='oneactivity'>
                    <div className='date_activity'>
                        <span>12/02/2020</span>
                    </div>
                    <div className='user_activity'>
                        <div className='user_profile'>
                            <img src={user} alt="avatar" />
                            <h3>Omayma ABIDY</h3>
                        </div>
                        
                        <p>Active</p>
                        <span>2000.00dh</span>
                    </div>
                </div>
                <div className='oneactivity'>
                    <div className='date_activity'>
                        <span>12/02/2020</span>
                    </div>
                    <div className='user_activity'>
                        <div className='user_profile'>
                            <img src={user} alt="avatar" />
                            <h3>Omayma ABIDY</h3>
                        </div>
                        
                        <p>Active</p>
                        <span>2000.00dh</span>
                    </div>
                </div>
               
        {/* {transaction.map(t =>{
            return(
                <div className='oneactivity'>
                    <div className='date_activity'>
                        <span>{t.date}</span>
                    </div>
                    <div className='user_activity'>
                        <div className='user_profile'>
                            <img src={`data:image/png;base64,${t.avatar}`} alt="avatar" />
                            <h3>{t.name}</h3>
                        </div>
                        
                        <p>{t.description}</p>
                        <span>{t.amount}dh</span>
                    </div>
                </div>
            )
        })} */}
        </div> 
       
    </div>)

}

export default Activities;
