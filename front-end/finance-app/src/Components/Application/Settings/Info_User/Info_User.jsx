import './Info_User.css';
import user from '../../Account_div/user.png';
export default function Info_User(){
    return(
        <div className='Info_User'>
            <h3>My Personnal Informations</h3>
            <form action="">
                    <div className='profile_info'>
                        <h5>Profile</h5>
                                    <div className='profile'>
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
                                            <div className='lastname'>
                                                <label htmlFor="lastname">Last Name</label>
                                                <input type="text" id='lastname' />
                                            </div>
                                        </div>
                                    </div>  
                        
                    <div className='adresse-div'>

                    </div>
        </div>
                {/* <div className='groupLabelInput'>
                    <label htmlFor="image">Profile Picture :</label>
                    <img src={user} alt="user_pic" />
                    <input type="text" id='image'/>
                </div>
                <div className='groupLabelInput'>
                    <label htmlFor="name">First Name :</label>
                    <input type="text" id='name' />
                </div>
                <div className='groupLabelInput'>
                    <label htmlFor="lastname">Last Name :</label>
                    <input type="text" id='lastname' />
                </div>
                <div className='groupLabelInput'>
                    <label htmlFor="email">E-mail :</label>
                    <input type="text" id='email'/>
                </div> */}
                {/* <button>Save</button> */}
            </form>
        </div>
    )
}