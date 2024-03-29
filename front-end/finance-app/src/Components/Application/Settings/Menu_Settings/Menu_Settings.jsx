import './Menu_Settings.css';
import { Link, useNavigate } from 'react-router-dom'
export default function Menu_Settings() {
    const navigate = useNavigate()

    return (
        <div className='Header_Settings_Links'>
            <ul>
                <li onClick={() => { navigate('/settings_password') }}>
                    <i className="fa-regular fa-share-from-square"></i>Change Password
                </li>
                <li onClick={() => { navigate('/settings_user') }}>
                    <i className="fa-solid fa-bars"></i>Infos Personnel
                </li>
                <li>
                    <i className="fa-regular fa-square-plus"></i><a href="">More</a>
                </li>
            </ul>
        </div>
    )
}