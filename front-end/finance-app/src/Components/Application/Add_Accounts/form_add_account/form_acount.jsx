import { useNavigate } from 'react-router-dom';
import './form_account.css';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { AddAccount } from '../../../config/actions';
import swal from 'sweetalert';
import axios from 'axios';
export default function Form_account() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accounts, setAccounts] = useState({
        account_name: '',
        balance: '',
        account_type: '',
        account_status: '',
    })
    const count = useSelector(x => x.Accounts.length)
    const handleInput = (e) => {
        e.persist();
        setAccounts({
            ...accounts, [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(accounts);
        const data = {
            account_name: accounts.account_name,
            balance: parseInt(accounts.balance).toFixed(2),
            account_type: accounts.account_type,
            account_status: accounts.account_status,
        }
        axios.post('api/data/finance_account/', data, {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                dispatch(
                    AddAccount({
                        account_name: accounts.account_name,
                        balance: accounts.balance,
                        account_type: accounts.account_type,
                        account_status: accounts.account_status,
                    }))
                swal('Success', res.data.message, 'success')
                navigate('/accounts')
            }
        }).catch(err => {
            console.log(err);
            swal('Warning', err.message, 'warning')
        }

        )

    }
    return (
        <form className='form-account' onSubmit={handleSubmit}>
                <h3>Add New Account</h3>
            <div className='inputs-add-account'>
                <input type="text" placeholder='Account Name' name='account_name' onChange={handleInput} value={accounts.account_name} />
                <input type="number" placeholder='Balance' name='balance' onChange={handleInput} value={accounts.balance} />
                <input type="text" placeholder='Account Type' name='account_type' onChange={handleInput} value={accounts.account_type} />
                <input type="text" placeholder='Account status' name='account_status' onChange={handleInput} value={accounts.account_status} />
            </div>
            <div className='btns-add-account'>
                <button className='btn my-accounts' onClick={() => { navigate('/accounts') }}>My Accounts</button>
                <button className='btn add-account' type='submit'>Add</button>
            </div>
            
        </form>
    )
}