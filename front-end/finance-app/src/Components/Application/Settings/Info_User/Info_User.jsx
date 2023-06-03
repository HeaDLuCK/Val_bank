import './Info_User.css';
import avatar from '../../Account_div/user.png';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Info_User() {
    const [data, setData] = useState({});
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('/api/data')
        .then(res => {
            setData(res.payload.data)
        }).catch(err => {
            console.log(err);
        });
    }, []);  
    return (
        <div className='Info_user'>
            <div className='top_div'>
                <form className='profile' onSubmit={handleSubmit}>
                    <div className='formHeader'>
                        <h5>Profile</h5>
                        <button type='submit'>Save</button>
                    </div>
                    <div className='form_body'>
                        <div className='avatar'>
                            <img src={avatar} alt="avatar" />
                            <div className='btn-file'>
                                <input type="file" name='avatar_image' onChange={handleInput} value={image.avatar_image} />
                            </div>
                        </div>
                        <div className='fullname'>
                            <div className='name'>
                                <label htmlFor="name">First Name</label>
                                <input type="text" id='name' name='first_name' onChange={handleInput} value={data.first_name} />
                            </div>
                            <div className='name'>
                                <label htmlFor="lastname">Last Name</label>
                                <input type="text" id='lastname' name='last_name' onChange={handleInput} value={data.last_name} />
                            </div>
                        </div>
                    </div>
                </form>
                <form className='files' onSubmit={handleSubmit}>
                    <div className='formHeader'>
                       <h5>Files</h5> 
                       <button type='submit'>Save</button>
                    </div>
                    <div className='form_body'>
                        <div>
                            <label htmlFor="">RIB</label>
                            <button>Download</button>
                        </div>
                        <div>
                            <label htmlFor="">Activities</label>
                            <button>Download</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='bottom_div'>
                <form className='adresse' onSubmit={handleSubmit}>
                    <div className='formHeader'>
                        <h5>Adresse</h5>
                        <button type='submit'>Save</button>
                    </div>
                    <div className='form_body'>
                        <div>
                            <label htmlFor="">Adresse line</label>
                            <input type="text" placeholder='hay el mohamadi' name='address' onChange={handleInput} value={data.address} />
                        </div>
                        <div>
                            <label htmlFor="">City/town</label>
                            <input type="text" placeholder='agadir' name='city' onChange={handleInput} value={data.city} />
                        </div>
                        <div>
                            <label htmlFor="">Postal/zipCode</label>
                            <input type="text" placeholder='80000' name='code_postal' onChange={handleInput} value={data.code_postal} />
                        </div>

                    </div>
                </form>
                <div className='contact_div'>
                    <form className='phone_number' onSubmit={handleSubmit}>
                        <div className='formHeader'>
                           <h5>Phone Number</h5> 
                           <button type='submit'>Save</button>
                        </div>
                        <div className='form_body'>
                            <label htmlFor="">Phone Number</label>
                            <input type="text" placeholder='0627518809' name='phone_number' onChange={handleInput} value={data.phone_number} />
                        </div>
                    </form>
                    <form className='security' onSubmit={handleSubmit}>
                        <div className='formHeader'>
                            <h5>Security</h5> 
                           <button onClick={() => { navigate('/settings_password') }}>Change</button>
                        </div>
                        <div className='form_body'>
                            <label htmlFor="">Password</label>
                            <input type="text" placeholder='***********' name='password' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}