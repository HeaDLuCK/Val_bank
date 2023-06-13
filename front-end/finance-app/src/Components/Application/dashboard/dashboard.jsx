
import Accounts_div from '../Account_div/Account_div';
import Middle_div from '../Dash_Middle_Div/Dash_Middle_Div';
import MenuDashboard from '../Dash_Middle_Div/menu_dash/MenuDashboard';
import Footer_Dash from '../Footer_Dash/Footer_Dash';
import Header_Dashboard from '../Header_Dash/Header_Dash';
import Menu_Dash from '../Menu_Dash/Menu_Dash';
import SideBar from '../SideBar/SideBar';
import './dashboard.css';


function Dashbord() {
  return (
    <div className='ALL'>
      <div className='dashbord'>
        <SideBar />
        <div className='container'>
          <Header_Dashboard title='Dashboard' />
          <Menu_Dash />
          <Middle_div />
        </div>
        <MenuDashboard />
      </div>
      <Footer_Dash />

    </div>


  );
}

export default Dashbord;
