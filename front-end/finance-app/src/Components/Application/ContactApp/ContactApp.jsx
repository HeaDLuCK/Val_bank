
import Contact_Form from '../Contact_Form/Contact_Form';
import Footer_Dash from '../Footer_Dash/Footer_Dash';
import Header_Dashboard from '../Header_Dash/Header_Dash';
import SideBar from '../SideBar/SideBar';
import './ContactApp.css';

function ContactApp() {
  return (
    <div className='ALL'>
      <div className='dashbord'>
        <SideBar/>
        <div className='container'>
            <Header_Dashboard title="Contact"/>
            <Contact_Form />
        </div>
    </div>
    <Footer_Dash/> 
    
    </div>
    

  );
}

export default ContactApp;
