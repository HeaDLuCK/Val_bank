import './Login_form.css';
import logo from '../../Home_Page/Home_Components/Header/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
export default function LoginForm(){
    const navigate = useNavigate();
    const [loginInput, setLogin] = useState({
        username:'',
        password:'',
        error_list:{}
    })
    const handleInput = (e) =>{
        e.persist();
        setLogin({
            ...loginInput, [e.target.name ]: e.target.value
        })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: loginInput.username,
            password: loginInput.password
        }
        console.log(data);
        axios.post('api/login', data, {
            headers:{
            'content-type': 'multipart/form-data',
            }
          }).then(res =>{
            if(res.status === 200){
                localStorage.setItem('token', res.token)
                swal('Success', res.data.message, 'success')
                navigate('/')
            }
            else if(res.status === 401){
                swal('Warning', res.data.message, 'warning')
            }
            else{
                setLogin({
                    ...loginInput,error_list : res.data.errors
                })
            }

        });

      };
    return(
        <div className='Login'>
            <div className='divs'>
                <form className='form' onSubmit={handleSubmit}>
                    <h3>Login To Your Account</h3>
                    <div className='inputs'>
                        <input type="text" placeholder='username' name='username' onChange={handleInput} value={loginInput.username}/>
                        <span>{loginInput.error_list.username}</span>
                        <input type="password" placeholder='password' name='password' onChange={handleInput} value={loginInput.password}/>
                        <span>{loginInput.error_list.password}</span>
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