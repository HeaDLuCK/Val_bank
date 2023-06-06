import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import './Accounts.css';
import { Delete } from "../../config/actions";
import axios from 'axios';
import swal from 'sweetalert';
import { useEffect, useState } from "react";
// import user from './user.png';

export default function Accounts(){
    const dispatch = useDispatch()
    const [dataAccounts, setDataAccounts] = useState([]);
    const navigate = useNavigate()
    const handleClick = () =>{
        navigate('/add_accounts')
    }
    useEffect(() => {
        axios.get(`api/data/finance_account/`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setDataAccounts(res.data.payload ) 
            }).catch(err => {
                console.log(err);
            });
    }, []);
    const HandleDelete = (id) =>{
        axios.delete('api/data/finance_account/', id, {
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            if (res.status === 200) {
                dispatch(Delete(id))
                swal('Success', res.message, 'success')
                navigate('/accounts')}
        }).catch(err => {
                swal('Warning', err.message, 'warning')
        })
        
    }
    return(
        <div className='AccountsCards'>
            <h3>My Accounts :</h3>
            <div className='MyAccountsDiv'>
                {dataAccounts.map(e =>{
                    return(
                        <div className='MyAccount'>
                            <div className='infos'>
                                <h3>Balance</h3>
                                <p className='balance'>{e.balance} <span>DH</span></p>
                                <p className='balance'>{e.account_name}</p>
                                <p className='balance'>{e.account_type} </p>
                                <p className='balance'>{e.account_status} </p>
                            </div>
                            <div className='dateCreation'>
                                <p>Crée le : <span>20 Nov 2020</span></p> 
                            </div>
                            <td><Link to={`/update/:${e.id}`}><button>Edit</button></Link><button onClick={() =>HandleDelete(e.id)}>Delete</button></td>
                        </div> 
                    )
                   
                })
                
                }
                <div className='LastDivAccount'>
                    <div className='AddAccount' onClick={handleClick}>
                        <i class="fa fa-plus"> </i>
                    </div>
                    <div className='AjouterAccount'>
                        <p>Add Account</p>
                    </div>
                </div>
            </div>
             
        </div>
    )
}