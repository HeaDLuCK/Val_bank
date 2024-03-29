import './Info_User.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

export default function Info_User() {
    const [data, setData] = useState({
        first_name: '', last_name: '', address: '', city: '', code_postal: '', phone_number: '', email: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        console.log(localStorage.getItem('header'));
        axios.get('/api/data/user', { headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } })
            .then(res => {
                setData(res.data.payload.user_detail)
            }).catch(err => {
                console.log(err);
            });
    }, []);

    const handleInput = (e) => {
        e.persist();
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataa = {
            first_name: data.first_name,
            last_name: data.last_name,
            address: data.address,
            city: data.city,
            code_postal: data.code_postal,
            phone_number: data.phone_number,
            email: data.email,
        }
        axios.post('/api/data/user', dataa, {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.status === 201) {
                swal("Success", res.data.message, "success");
            }
            else {
                console.log('Oops!');
            }
        });
    }
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
                            <img src={`data:image/png;base64,${data.avatar_image}`} alt="avatar" />
                        </div>
                        <div className='fullname'>
                            <div className='name'>
                                <label htmlFor="name">First Name</label>
                                <input type="text" id='name' name='first_name' onChange={handleInput} value={data.first_name} placeholder='First Name' />
                            </div>
                            <div className='name'>
                                <label htmlFor="lastname">Last Name</label>
                                <input type="text" id='lastname' name='last_name' onChange={handleInput} value={data.last_name} placeholder='Last Name' />
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
                        <div className='file'>
                            <label htmlFor="">RIB</label>
                            <button>Download</button>
                        </div>
                        <div className='file'>
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
                        <div className='input-label'>
                            <label htmlFor="">Adresse line</label>
                            <input type="text" placeholder='hay el mohamadi' name='address' onChange={handleInput} value={data.address} />
                        </div>
                        <div className='input-label'>
                            <label htmlFor="">City/town</label>
                            <input type="text" placeholder='agadir' name='city' onChange={handleInput} value={data.city} />
                        </div>
                        <div className='input-label'>
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
                            <h5>Contact</h5>
                            <button type='submit'>Save</button>
                        </div>
                        <div className='form_body'>
                            <label htmlFor="">Email</label>
                            <input type="text" placeholder='omaimaabidy@gmail.com' name='email' onChange={handleInput} value={data.email} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}