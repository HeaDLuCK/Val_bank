import './Info_User.css';
import user from '../../Account_div/user.png';
export default function Info_User(){
    return(
        <div className='Info_user'>
            <form action="">
                <div className='top_div'>
                    <div className='profile'>
                        <h5>Profile</h5>
                        <div  className='body_profile'>
                            <div className='avatar'>
                                <img src={user} alt="avatar" />
                                <div className='btn-file'>
                                    <input type="text" />
                                </div>
                            </div>
                            <div className='fullname'>
                                <div className='name'>
                                    <label htmlFor="name">First Name</label>
                                    <input type="text" id='name' />
                                </div>
                                <div className='name'>
                                    <label htmlFor="lastname">Last Name</label>
                                    <input type="text" id='lastname' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='files'>
                        <h5>Files</h5>
                    </div>
                </div>
                <div className='bottom_div'>
                    <div className='adresse'></div>
                    <div className='contact_div'>
                        <div className='phone_number'></div>
                        <div className='security'></div>
                    </div>
                </div>
            </form>
        </div>
    )
}