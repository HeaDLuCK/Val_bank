import './Activities.css';
import user from '../Account_div/user.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Activities() {
    const[accounts, setAccounts] = useState([])
    const[account, setAccount] = useState()
    const[date, setDate] = useState()
    const[transaction, setTransaction] = useState()
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
        axios.get(`api/data/finance_account/`,
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
        axios.post(`api/data/transaction`, account, date,
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

    <div className='ActivitiesTransaction'>
        <h3>Activity</h3>
        <div className='filterandsearch'>
            <div className='filter'>
                <h5>Filter by:</h5>
                <input type="date"  onChange={handleInput} value={date}/>
                <label for="accounts">Accounts :</label>
                <select name="accounts" id="accounts" onChange={handleInput}>
                {
                    accounts.map(a =>{
                        return <option value={a.account_name}>{a.account_name}</option>
                    })
                }
                </select>
            </div>
        </div>
        <div className='activitiesdivs'>
        {transaction.map(t =>{
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
                        <span>{t.amount}</span>
                    </div>
                </div>
            )
        })}
        </div>
    </div>

}

export default Activities;
