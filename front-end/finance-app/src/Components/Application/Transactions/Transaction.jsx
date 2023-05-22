import Accounts_div from "../Account_div/Account_div";
import Activities from "../Activities/Activities";
import Footer_Dash from "../Footer_Dash/Footer_Dash";
import Header_Dashboard from "../Header_Dash/Header_Dash";
import SideBar from "../SideBar/SideBar";


function Transaction() {
  return (
    <div className='ALL'>
      <div className='dashbord'>
        <SideBar/>
        <div className='container'>
            <Header_Dashboard title='Transactions'/>
            <Activities/>
        </div>
        <Accounts_div/>
    </div>
    <Footer_Dash/> 
    </div>

  );
}

export default Transaction;
