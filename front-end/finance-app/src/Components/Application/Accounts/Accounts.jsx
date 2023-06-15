import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import './Accounts.css';
import { Delete, getData } from "../../config/actions";
import axios from 'axios';
import swal from 'sweetalert';
import { useEffect, useState } from "react";

// import user from './user.png';

export default function Accounts() {
    const data = useSelector((state) => state.Accounts);
    const [loading, setLoading] = useState(true)
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
                console.log(data);
                dispatch(getData(res.data.payload))
                setLoading(false)
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
        <div className='AccountsCards' >
            <h3>My Accounts :</h3>
            <div className='MyAccountsDiv'>
                {data.length > 0 && data.map(e => {
                    return (
                        <div className='MyAccount'>
                            <div className='infos'>
                                <div className="delete-edit-btn">
                                    <Link to={`/form_update_account/${e.account_id}`}><i class='far fa-edit'></i></Link>
                                    <i class="fa fa-remove" onClick={() => HandleDelete(e.account_id)}></i>
                                </div>
                                <div className="group-input-account-balance">
                                    <p className='label-account'>Solde :</p>
                                    <p className='info-account-balance'>{e.balance}<span>DH</span></p>
                                </div>
                                <div className="group-input-account">
                                    <p className="label-account">Account Type :</p>
                                    <p className='account-type'>{e.account_type}</p>
                                </div>
                                <div className="group-input-account">
                                    <p className="label-account">Account Status :</p>
                                    <p className='account-type'>{e.account_status ? 'ACTIVE' : 'INACTIVE'}</p>
                                </div>
                                <div className='dateCreation'>
                                    <p>created at: <span>{e.created_at ? e.created_at.slice(0, 10) : ''}</span></p>
                                </div>
                            </div>
                        </div>


                    )

                })

                }





                <div className='LastDivAccount'>
                    <div className='AddAccount' onClick={() => { navigate('/add_accounts') }}>
                        <i class="fa fa-plus"></i>
                    </div>
                    <div className='AjouterAccount' onClick={() => { navigate('/add_accounts') }}>
                        <p>Add Account</p>
                    </div>
                </div>
            </div>

        </div>
    )
}