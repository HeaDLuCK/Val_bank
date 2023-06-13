import './SideBar.css';
import {Link} from 'react-router-dom';
import logo from '../../Home_Page/Home_Components/Header/logo2.png';
import Icon from '@mdi/react';
import { mdiViewDashboard } from '@mdi/js';
export default function SideBar(){
    return(
        <div className='SideBar'>
                <div className='LogoSideBar'>
                    <img src={logo} alt="logo" />
                </div>
                <div className='LinksDashBoard'>
                    <ul>
                        <li className='icon'>
                            <Icon  path={mdiViewDashboard} size={0.7} /><Link to={'/dashboard'}>Dashboard</Link>
                        </li>
                        <li>
                            <i class="fa fa-arrow-right-arrow-left"></i><Link to={'/transaction'}>Transactions</Link>
                        </li>
                        <li>
                            <i class="fa fa-building-columns"></i><Link to={'/accounts'}>Finance Accounts</Link>
                        </li>
                        {/* <li>
                            <i class="fa fa-file"></i><a href="">Reports</a>
                        </li> */}
                        <li>
                            <i class="fa-regular fa-calendar-days"></i><Link to={'/calendar'}>Calendar</Link>
                        </li>
                        <li>
                            <i class="fa-solid fa-gear"></i><Link to={'/settings_user'}>Settings</Link>
                        </li>
                        <li>
                            <i class="fa-solid fa-comment-dots"></i><Link to={'/contact'}>Contact Us</Link>
                        </li>
                    </ul>
                    <a href=""></a>
                </div>
        </div>
    )
}