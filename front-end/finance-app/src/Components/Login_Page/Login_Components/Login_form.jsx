import './Login_form.css';
import logo from '../../Home_Page/Home_Components/Header/logo.png';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './config/Actions';
export default function LoginForm(){
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        dispatch(login(username, password));
      };
    return(
        <div className='Login'>
            <div className='divs'>
                <form className='form' onSubmit={handleSubmit}>
                    <h3>Login To Your Account</h3>
                    <div className='inputs'>
                        <input type="text" placeholder='username' value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                        <input type="text" placeholder='password' value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        <button className='btn1'>forgot password ?</button>
                        <button type="submit" className='btn2'>SIGN IN</button>
                        <i class='far fa-eye'></i>
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