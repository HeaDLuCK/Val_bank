import './Accounts_div.css';
import user from './user.png';
export default function Accounts_div(){
    return(
        <div className='Accounts_div'>
            <div className='notifications'>
                <i class="fa-regular fa-bell"></i>
                <img src={user} alt="user" />
            </div>
            <div className='accounts'>
                <div className='accounts_head'>
                    <h5>My accounts</h5>
                    <i class="fa-regular fa-square-plus"></i>
                </div>
                <div className='accounts_body'>
                    <div className='square'></div>
                    <div className='square'></div>
                    <div className='square'></div>
                </div>
            </div>
            <div className='receivers'>
                <h5>Receivers</h5>
                <div className='cercles'>
                    <img src={user} alt="user" />
                    <img src={user} alt="user" />
                    <img src={user} alt="user" />
                    <img src={user} alt="user" />
                </div>
            </div>
            <div className='recent_activity'>
                <h5>Recent Activity</h5>
            
                <div className='activities'>
                    <div className='activity'>
                        <img src={user} alt="user" />
                        <div className='descreption_activity'>
                            <h5>USERNAME</h5>
                            <p>22 oct 2022</p>
                        </div>
                    </div>
                    <span>22.90$</span>
                </div>
                <div className='activities'>
                    <div className='activity'>
                        <img src={user} alt="user" />
                        <div className='descreption_activity'>
                            <h5>USERNAME</h5>
                            <p>22 oct 2022</p>
                        </div>
                    </div>
                    <span>22.90$</span>
                </div>
                <div className='activities'>
                    <div className='activity'>
                        <img src={user} alt="user" />
                        <div className='descreption_activity'>
                            <h5>USERNAME</h5>
                            <p>22 oct 2022</p>
                        </div>
                    </div>
                    <span>22.90$</span>
                </div>
                <div className='activities'>
                    <div className='activity'>
                        <img src={user} alt="user" />
                        <div className='descreption_activity'>
                            <h5>USERNAME</h5>
                            <p>22 oct 2022</p>
                        </div>
                    </div>
                    <span>22.90$</span>
                </div>
                <div className='activities'>
                    <div className='activity'>
                        <img src={user} alt="user" />
                        <div className='descreption_activity'>
                            <h5>USERNAME</h5>
                            <p>22 oct 2022</p>
                        </div>
                    </div>
                    <span>22.90$</span>
                </div>
            </div>
        </div>
    )
}