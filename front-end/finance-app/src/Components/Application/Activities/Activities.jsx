import './Activities.css';
import user from '../Account_div/user.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Activities() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([])
    const [options, setOptions] = useState({ date: '', account: '' })
    const [transaction, setTransaction] = useState([])
    const handleInput = (e) => {
        e.persist();
        setOptions({ ...options, [e.target.name]: e.target.value });

    }
    useEffect(() => {
        axios.post(`api/data/transactions`, options,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res);
                setTransaction(res.data.payload.transactions)
            }).catch(err => {
                console.log(err);
            });
    }, [options]);
    useEffect(() => {
        axios.get(`api/data/accounts`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then(res => {
                setAccounts(res.data.accounts)
            }).catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div className='ActivitiesTransaction'>

            <h3>Activity</h3>
            <div className='filterandsearch'>
                <div className='filter'>
                    <div className='filterBy'>
                        <h5>Filter by:</h5>
                        <input type="date" className='dateTransactions' name='date' onChange={handleInput} value={options.date} />
                        <label htmlFor="accounts"></label>
                        <select name="account" id="accounts" onChange={handleInput}>
                            <option value="" defaultValue>acc</option>
                            {accounts.length > 0 && accounts.map((a,index) => {
                                return <option key={index} value={a}>{a}</option>
                            })
                            }

                        </select>
                    </div>
                    <button onClick={() => { navigate('/addTransaction') }}>Add Transaction</button>
                </div>
            </div>
            <div className='activitiesdivs'>
                {transaction.map(t => {
                    return (
                        <div key={t.transaction_id} className='oneactivity'>
                            <div className='date_activity'>
                                <span>{t.date.slice(0, 10)}</span>
                            </div>
                            <div className='user_activity'>
                                <div className='user_profile'>
                                    <img src={`data:image/png;base64,${t.avatar}`} alt="avatar" />
                                    <h3>{t.name}</h3>
                                </div>

                                <p>{t.description}</p>
                                <span className={t.amount.slice(0,1)==='+'?'added':'minus'}>{t.amount}dh</span>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>)

}

export default Activities;
