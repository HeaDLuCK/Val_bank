import { useNavigate } from "react-router-dom";
import './TransactionForm.css';
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

export default function TransactionForm() {
    const navigate = useNavigate();
    const [Transaction, setTransaction] = useState({
        receiver: '',
        depositor: '',
        transaction_type: '',
        amount: '',
        description: '',
    })
    const handleInput = (e) => {
        e.persist();
        setTransaction({
            ...Transaction, [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            receiver: Transaction.receiver,
            depositor:Transaction.depositor,
            transaction_type: Transaction.transaction_type,
            amount: Transaction.amount,
            description: Transaction.description,
        }
        axios.post('api/data/transaction', data, {
            headers: {
                // 'content-type': 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                swal('Success', res.data.message, 'success')
                navigate('/transaction')
            }
        }).catch(err => {
            console.log(err);
            swal('Warning', err.message, 'warning')
        }

        )
    }

    return (
        <form className='form-account' onSubmit={handleSubmit}>
            <h3>Add New Transaction</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat!</p>
            <div className='inputs-add-account'>
                <div className='inputs-two-transaction'>
                    <input type="number" placeholder='Receiver' name='receiver' onChange={handleInput} value={Transaction.receiver} />
                    <input type="number" placeholder='Depositor' name='depositor' onChange={handleInput} value={Transaction.depositor} />
                </div>
                <div className='inputs-two-transaction'>
                    <input type="text" placeholder='Transaction Type' name='transaction_type' onChange={handleInput} value={Transaction.transaction_type} />
                    <input type="number" placeholder='Amount' name='amount' onChange={handleInput} value={Transaction.amount} />
                </div>
                <div className='inputs-two-transaction'>
                    <input type="text" placeholder='Description' name='description' onChange={handleInput} value={Transaction.description} />
                </div>
            </div>
            <div className='btns-add-account'>
                <button className='btn my-accounts' onClick={() => { navigate('/transaction') }}>My Transactions</button>
                <button className='btn add-account' type='submit'>Add Transaction</button>
            </div>

        </form>
    )
}