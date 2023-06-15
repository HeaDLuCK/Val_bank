import { useState } from 'react';
import './ResetPassword.css'
import logo from './logo2.png';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const ResetPassword = () => {
    let { token } = useParams();
    const [data, setData] = useState({ token: token })
    const [error, setError] = useState({password:[]})
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = () => {
        axios.post('/api/update-password', data)
            .then((promise) => { console.log(promise.data); })
            .catch(err => { setError(err.response.data.errors) })
    }
    console.log(error.password);
    return (
        <div className="reset-container">
            <div>
                <div className='logoR'>
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <h3>RESET YOUR PASSWORD</h3>
                </div>
                <div className='input'>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" onChange={(e) => { handleChange(e) }} />
                </div>
                <div className='input'>
                    <label htmlFor="password_confirmation">password_confirmation</label>
                    <input type="password" name="password_confirmation" onChange={(e) => { handleChange(e) }} />
                    <ul>
                        {error.password.map(err => {
                            return (<li>{err}</li>)
                        })}
                    </ul>
                </div>
                <button onClick={handleSubmit}>RESET</button>
            </div>
        </div>
    )
}
export default ResetPassword;