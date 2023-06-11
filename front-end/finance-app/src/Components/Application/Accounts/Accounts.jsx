import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import './Accounts.css';
import { Delete, getData } from "../../config/actions";
import axios from 'axios';
import swal from 'sweetalert';
import { useEffect, useState } from "react";

// import user from './user.png';

export default function Accounts() {
    const data = useSelector((state) => state.data.Accounts);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = () => {
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
                console.log(res);
                dispatch(getData(res.data))
            }).catch(err => {
                console.log(err);
            });
    }, []);
    const HandleDelete = (id) => {
        axios.delete(`api/data/finance_account/${id}`, {
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            if (res.status === 200) {
                dispatch(Delete(id))
                swal('Success', res.data.message, 'success')
                navigate('/accounts')
            }
        }).catch(err => {
            swal('Warning', err.data.message, 'warning')
        })

    }
    return (
        <div className='AccountsCards'>
            <h3>My Accounts :</h3>
            <div className='MyAccountsDiv'>
                {data.map(e => {
                    return (
                        <div className='MyAccount'>
                            <div className='infos'>
                                <div className="delete-edit-btn">
                                    <Link to={`/form_update_account/${e.account_id}`}><button>Edit</button></Link>
                                    <i class="fa fa-trash" aria-hidden="true" onClick={() => HandleDelete(e.account_id)}></i>
                                </div>
                                <p className='account-solde'>Solde :</p>
                                <p className='balance'>{e.balance}<span>DH</span></p>
                                <p className='account-type'>{e.account_type}</p>
                            </div>
                            <div className='dateCreation'>
                                <p>Status: <span>{e.account_status}</span></p>
                            </div>
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