
import Accounts_div from '../../Account_div/Account_div';
import Middle_div from '../../Dash_Middle_Div/Dash_Middle_Div';
import Footer_Dash from '../../Footer_Dash/Footer_Dash';
import Header_Dashboard from '../../Header_Dash/Header_Dash';
import SideBar from '../../SideBar/SideBar';
import Change_Password from '../Change_Password/Change_Password';
import Menu_Settings from '../Menu_Settings/Menu_Settings';
import Right_Bar from '../Right_Bar/Right_Bar';
import './Settings_password.css';

function Settings_Password() {
  return (
    <div className='ALL'>
      <div className='dashbord'>
        <SideBar />
        <div className='container'>
            <Header_Dashboard title='Settings' data=''/>
            <Menu_Settings />
            <Change_Password />
        </div>
        <Right_Bar />
    </div>
    <Footer_Dash/> 
    
    </div>
    

  );
}

export default Settings_Password;
