
import Accounts_div from '../../Account_div/Account_div';
import Middle_div from '../../Dash_Middle_Div/Dash_Middle_Div';
import Footer_Dash from '../../Footer_Dash/Footer_Dash';
import Header_Dashboard from '../../Header_Dash/Header_Dash';
import SideBar from '../../SideBar/SideBar';
import Info_User from '../Info_User/Info_User';
import Menu_Settings from '../Menu_Settings/Menu_Settings';
import './Settings_User.css';

function Settings_User() {
  return (
    <div className='ALL'>
      <div className='dashbord'>
        <SideBar />
        <div className='container'>
            <Header_Dashboard title='Settings' data=''/>
            <Menu_Settings />
            <Info_User />
        </div>
        {/* <Accounts_div /> */}
    </div>
    <Footer_Dash/> 
    
    </div>
    

  );
}

export default Settings_User;
