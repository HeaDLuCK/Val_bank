import { useNavigate } from 'react-router-dom';
import './Menu_Dash.css';
export default function Menu_Dash(){
    const navigate = useNavigate();
    return(
        <div className='Header_Dash_Links'>
            <ul>
                <li onClick={() => { navigate('/addTransaction') }}>
                    <i class="fa-regular fa-share-from-square"></i><a href="">Send money</a>
                </li>
                <li onClick={() => { navigate('/dashboard') }}>
                    <i class="fa-solid fa-bars"></i><a href="">Statement</a>
                </li>
                <li onClick={() => { navigate('/settings_password') }}>
                    <i class="fa-solid fa-arrow-up-from-bracket"></i><a href="">Top up</a>
                </li>
                <li onClick={() => { navigate('/settings_password') }}>
                    <i class="fa-regular fa-square-plus"></i><a href="">More</a>
                </li>
            </ul>
        </div>
    )
}