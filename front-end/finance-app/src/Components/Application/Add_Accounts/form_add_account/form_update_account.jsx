import { useNavigate, useParams } from 'react-router-dom';
import './form_account.css';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { EditAccount } from '../../../config/actions';
import swal from 'sweetalert';
import axios from 'axios';
export default function Form_Update_account() {
    const { id } = useParams();
    const account = useSelector(data => data.Accounts.find((u) => u.account_id === parseInt(id)))

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accounts, setAccounts] = useState({
        account_name: account.account_name,
        balance: account.balance,
        account_type: account.account_type,
        account_status: account.account_status,
    })
    const handleInput = (e) => {
        e.persist();
        setAccounts({
            ...accounts, [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            account_name: accounts.account_name,
            balance: parseInt(accounts.balance).toFixed(2),
            account_type: accounts.account_type,
            account_status: accounts.account_status,
        }
        axios.put(`api/data/finance_account/${id}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            if (res.status === 200) {
                console.log(res);
                dispatch(
                    EditAccount({
                        account_name: accounts.account_name,
                        balance: parseInt(account.balance).toFixed(2),
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
            <div className='header-add-account'>
                <h3>Add New Account</h3>
                <button onClick={() => { navigate('/accounts') }}>My Accounts</button>
            </div>
            <div className='inputs-add-account'>
                <input type="text" placeholder='Account Name' name='account_name' onChange={handleInput} value={accounts.account_name} />
                <input type="text" placeholder='balance' name='balance' onChange={handleInput} value={accounts.balance} />
                <input type="text" placeholder='Account Type' name='account_type' onChange={handleInput} value={accounts.account_type} />
                <input type="text" placeholder='Account status' name='account_status' onChange={handleInput} value={accounts.account_status} />
            </div>
            <button type='submit'>Add</button>
        </form>
    )
}