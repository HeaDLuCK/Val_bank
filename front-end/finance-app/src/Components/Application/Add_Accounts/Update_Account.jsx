import Accounts_div from '../Account_div/Account_div';
import Accounts from '../Accounts/Accounts';
import Footer_Dash from '../Footer_Dash/Footer_Dash';
import Header_Dashboard from '../Header_Dash/Header_Dash';
import SideBar from '../SideBar/SideBar';
import './Add_Accounts.css';
import Form_Update_account from './form_add_account/form_update_account';

function Add_Accounts() {
  return (
      <div className='ALL'>
        <div className='dashbord'>
          <SideBar/>
          <div className='container'>
              <Header_Dashboard title="Finance Accounts"/>
              <Form_Update_account />
          </div>
          <Accounts_div/>
      </div>
      <Footer_Dash/>
      </div>
      
  );
}
export default Add_Accounts;
