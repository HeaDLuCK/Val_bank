import './Activities.css';
import user from '../Account_div/user.png';
function Activities() {
    <div className='ActivitiesTransaction'>
        <h3>Activity</h3>
        <div className='filterandsearch'>
            <div className='filter'>
                <h5>Filter by:</h5>
                <button>Date</button>
                <button>Accounts</button>
            </div>
        </div>
        <div className='activitiesdivs'>
            {/* ---------------------- */}
            <div className='oneactivity'>
                <div className='date_activity'>
                    <span>22/22/2022</span>
                </div>
                <div className='user_activity'>
                    <div className='user_profile'>
                        <img src={user} alt="" />
                        <h3>Lee Sin</h3>
                    </div>
                    
                    <p>Money Recieved</p>
                    <span>+30.00 DH</span>
                </div>
            </div>
            {/* ----------------------- */}
            <div className='oneactivity'>
                <div className='date_activity'>
                    <span>22/22/2022</span>
                </div>
                <div className='user_activity'>
                    <div className='user_profile'>
                        <img src={user} alt="" />
                        <h3>Lee Sin</h3>
                    </div>
                    
                    <p>Money Recieved</p>
                    <span>+30.00 DH</span>
                </div>
            </div>
            {/* --------------------------- */}
            <div className='oneactivity'>
                <div className='date_activity'>
                    <span>22/22/2022</span>
                </div>
                <div className='user_activity'>
                    <div className='user_profile'>
                        <img src={user} alt="" />
                        <h3>Lee Sin</h3>
                    </div>
                    
                    <p>Money Recieved</p>
                    <span>+30.00 DH</span>
                </div>
            </div>
            {/* ------------------------------ */}
            <div className='oneactivity'>
                <div className='date_activity'>
                    <span>22/22/2022</span>
                </div>
                <div className='user_activity'>
                    <div className='user_profile'>
                        <img src={user} alt="" />
                        <h3>Lee Sin</h3>
                    </div>
                    
                    <p>Money Recieved</p>
                    <span>+30.00 DH</span>
                </div>
            </div>
        </div>
    </div>

}

export default Activities;
