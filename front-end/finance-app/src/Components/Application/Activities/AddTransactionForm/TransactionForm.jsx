import { useNavigate } from "react-router-dom";
import './TransactionForm.css';

export default function TransactionForm() {
    const navigate = useNavigate();
    return (
        <form className='form-account'>
                <h3>Add New Transaction</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat!</p>
            <div className='inputs-add-account'>
                <div className='inputs-two-transaction'>
                    <input type="number" placeholder='Receiver' name='receiver' />
                    <input type="number" placeholder='Depositor' name='depositor' />
                </div>
                <div className='inputs-two-transaction'>
                    <input type="text" placeholder='Transaction Type' name='transaction_type' />
                    <input type="number" placeholder='Amount' name='amount'  />  
                </div>
                <div className='inputs-two-transaction'>
                    <input type="text" placeholder='Description' name='description' />
                </div>
            </div>
            <div className='btns-add-account'>
                <button className='btn my-accounts' onClick={() => { navigate('/transaction') }}>My Transactions</button>
                <button className='btn add-account' type='submit'>Add Transaction</button>
            </div>
            
        </form>
    )
}