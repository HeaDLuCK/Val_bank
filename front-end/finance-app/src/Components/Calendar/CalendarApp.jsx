import Calendar from "./Calendar";
import Footer_Dash from "../../Components/Application/Footer_Dash/Footer_Dash";
import Header_Dashboard from "../Application/Header_Dash/Header_Dash";
import SideBar from "../Application/SideBar/SideBar";
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';

function CalendarApp() {
  return (
    <div className='ALL'>
      <div className='dashbord'>
        <SideBar/>
        <div className='container'>
            <Header_Dashboard title='Calendar'/>
            <Calendar/>
        </div>
    </div>
    <Footer_Dash/> 
    </div>

  );
}

export default CalendarApp;
