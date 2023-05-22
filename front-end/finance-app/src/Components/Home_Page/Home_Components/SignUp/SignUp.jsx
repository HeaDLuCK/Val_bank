import './SignUp.css';
import {Link} from 'react-router-dom';
export default function SignUp(){
    return(
        <div className='SignUp'>
            <div className='title'>
                <h2>Sign up and get started</h2>
            </div>
            <div className='btn'>
                <button><Link to={'/register'}>SIGN UP</Link></button>
            </div>
        </div>
    )
}