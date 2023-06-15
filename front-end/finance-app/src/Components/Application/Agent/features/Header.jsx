import logo from './logo.png';
import './Header.css'
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
const Header = () => {
    const Navigate = useNavigate()
    return (
        <header className='agent-header'>
            <div className='loT'>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <h5>AGENT PANEL</h5>
            </div>
            <div className='button'>
                <button onClick={() => { Navigate('/dashboard') }}><Icon path={mdiAccountCircle} size={1} />SWITCH</button>
            </div>
        </header>
    )
}
export default Header;