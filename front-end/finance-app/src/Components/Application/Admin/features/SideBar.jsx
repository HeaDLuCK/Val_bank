import Icon from '@mdi/react';
import './SideBar.css'
import {
    mdiAccountBoxMultipleOutline,
    mdiSwapVerticalCircle,
    mdiViewDashboardOutline
} from '@mdi/js';
import { Link, NavLink } from 'react-router-dom';
const SideBar = () => {

    return (<>
        <ul className="menu">
            <li><NavLink to={'/admin/dashboard'} className={({ isActive }) => (isActive ? 'active' : '')}><Icon path={mdiViewDashboardOutline} size={1} />Dashboard</NavLink ></li>
            <li><NavLink to={'/admin/val-users'} className={({ isActive }) => (isActive ? 'active' : '')}><Icon path={mdiAccountBoxMultipleOutline} size={1} />Users</NavLink ></li>
            <li><NavLink to={'/admin/val-transactions'} className={({ isActive }) => (isActive ? 'active' : '')}><Icon path={mdiSwapVerticalCircle} size={1} />Transactions</NavLink ></li>
        </ul>
    </>)
}
export default SideBar;