import React, { useRef, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import male from './male_avatar.png';
import female from './female_avatar.png';
import './Register_Form.css';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const [image, setImage] = useState(null)

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    swipe: false,
    draggable: false, 
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [registerInput, setRegister] = useState({
    username: '',
    password: '',
    confirm_password: '',
    first_name: '',
    city: '',
    phone_number: '',
    last_name: '',
    address: '',
    code_postal: '',
    email: '',
    cin: '',
    birthday: '',
    gender: '',
    error_list: {}
  })
  const handleInput = (e) => {
    e.persist();

    if (e.target.files) {
      setImage(e.target.files[0])
    } else {
      setRegister({ ...registerInput, [e.target.name]: e.target.value })
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: registerInput.username,
      password: registerInput.password,
      password_confirmation: registerInput.password_confirmation,
      first_name: registerInput.first_name,
      phone_number: registerInput.phone_number,
      city: registerInput.city,
      last_name: registerInput.last_name,
      address: registerInput.address,
      code_postal: registerInput.code_postal,
      email: registerInput.email,
      cin: registerInput.cin,
      birthday: registerInput.birthday,
      gender: registerInput.gender,
      avatar_image: image,
    }
    axios.post('/api/register', data, {
      headers: {
        'content-type': 'multipart/form-data',
      }
    }).then(res => {
      if (res.status === 201) {
        swal("Success", res.data.message, "success");
        navigate('/');
      }
      else {
        setRegister({ ...registerInput, error_list: res.data.errors })
      }
    });

  };
  return (
    <div className='Register'>
      <form className='centrediv' onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Register</h2>
        <Slider ref={sliderRef} {...settings}>
          {/* etape 1 */}
          <div className='etapeone'>
            <div className='inputs_gp'>
              <input type="text" placeholder='username' name='username' onChange={handleInput} value={registerInput.username} />
              <span>{registerInput.error_list.username}</span>
              <input type="password" placeholder='password' name='password' onChange={handleInput} value={registerInput.password} />
              <span>{registerInput.error_list.password}</span>
              <input type="password" placeholder='confirm password' name='password_confirmation' onChange={handleInput} value={registerInput.password_confirmation} />
              <span>{registerInput.error_list.password_confirmation}</span>
            </div>
          </div >
          {/* etape 2 */}
          <div div className='etapetwo' >
            <div className='inputs_gp'>
              <div className='gp1'>
                <input type="text" placeholder='first name' name='first_name' onChange={handleInput} value={registerInput.first_name} />
                <span>{registerInput.error_list.first_name}</span>
                <input type="text" placeholder='city' name='city' onChange={handleInput} value={registerInput.city} />
                <span>{registerInput.error_list.city}</span>
                <input type="text" placeholder='phone number' name='phone_number' onChange={handleInput} value={registerInput.phone_number} />
                <span>{registerInput.error_list.phone_number}</span>
              </div>
              <div className='gp2'>
                <input type="text" placeholder='last name' name='last_name' onChange={handleInput} value={registerInput.last_name} />
                <span>{registerInput.error_list.last_name}</span>
                <input type="text" placeholder='address' name='address' onChange={handleInput} value={registerInput.address} />
                <span>{registerInput.error_list.address}</span>
                <input type="text" placeholder='code postal' name='code_postal' onChange={handleInput} value={registerInput.code_postal} />
                <span>{registerInput.error_list.code_postal}</span>
              </div>
            </div>
          </div >
          {/* etape 3 */}
          <div div className='etapetree' >
            <div className='inputs_gp'>
              <div className='gp11'>
                <input type="email" placeholder='Email adresse' name='email' onChange={handleInput} value={registerInput.email} />
                <span>{registerInput.error_list.email}</span>
                <input type="text" placeholder='CIN' name='cin' onChange={handleInput} value={registerInput.cin} />
                <span>{registerInput.error_list.cin}</span>
              </div>
              <div className='gp22'>
                <input type="date" className='inputDate' placeholder='Date of birth' name='birthday' onChange={handleInput} value={registerInput.birthday} />
                <span>{registerInput.error_list.birthday}</span>
                <input type="text" placeholder='Gender' name='gender' onChange={handleInput} value={registerInput.gender} />
                <span>{registerInput.error_list.gender}</span>
              </div>
            </div>
          </div >
          {/* etape 4 */}
          <div div className='etapefour' >
            <h3>avatar</h3>
            <div className='avatars'>
              <img src={female} alt="" />
              <img src={male} alt="" />
            </div>
            <div className='orline'>
              <div className='line1'></div>
              <p>OR</p>
              <div className='line2'></div>
            </div>
            <input className='inputFile' type="file" placeholder='Choose image' name='avatar_image' onChange={handleInput} value={registerInput.avatar_image} />
            <div>
              <button className='register_btn'>Submit</button>
            </div>
          </div >
        </Slider >
      </form >
    </div >
  );
};

export default RegisterForm;
