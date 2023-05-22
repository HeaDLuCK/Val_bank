import './Header.css';
import logo from './logo.png';
import {Link} from 'react-router-dom';

export default function Header(){
    return(
        <div className="header">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
                <div className="type">
                    <ul>
                        <li><Link to={'/'}>HOME</Link></li>
                        <li><Link to={'/'}>SERVICES</Link></li>
                        <li><Link to={'/'}>NEWS</Link></li>
                        <li><Link to={'/'}>CONTACT</Link></li>
                    </ul>
                </div>
                <div className="btn">
                    <button><Link to={'/login'}>LOG IN</Link></button>
                    <button><Link to={'/register'}>SIGN UP</Link></button>
                </div>
        </div>
    )
}