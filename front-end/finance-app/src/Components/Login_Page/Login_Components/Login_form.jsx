import './Login_form.css';
import logo from '../../Home_Page/Home_Components/Header/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
export default function LoginForm() {
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        username: '',
        password: ''
    })
    const handleInput = (e) => {
        e.persist();
        setLogin({
            ...loginInput, [e.target.name]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: loginInput.username,
            password: loginInput.password
        }
        axios.post('/api/login', data, {
            headers: {
                'content-type': 'application/json',
            }
        }).then(res => {
            if (res.status === 202) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('role', res.data.user_role)
                localStorage.setItem('accounts', res.data.accounts)
                swal('Success', res.data.message, 'success')
                navigate('/dashboard')
            }

        }).catch(err => {
            if (err.response.status === 404) {
                swal('Warning', err.response.data.message, 'warning')
            }
            else if (err.response.status === 401) {
                swal('Warning', err.response.data.message, 'warning')
            }
        })
    };
    return (
        <div className='Login'>
            <div className='divs'>
                <form className='form' onSubmit={handleSubmit}>
                    <h3>Login To Your Account</h3>
                    <div className='inputs'>
                        <input type="text" placeholder='username' name='username' onChange={handleInput} value={loginInput.username} />
                        <input type="password" placeholder='password' name='password' onChange={handleInput} value={loginInput.password} />
                        <button className='btn1'>forgot password ?</button>
                        <button type="submit" className='btn2'>SIGN IN</button>
                        <i className='far fa-eye'></i>
                    </div>
                </form>
                <div className='signup'>
                    <img src={logo} alt="logo" />
                    <h4>New Here</h4>
                    <p>Sign up and disover a great amount of new opportunities ! </p>
                    <button> <Link to={'/register'}>SIGN UP</Link></button>
                </div>
            </div>
        </div>
    )
}