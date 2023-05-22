import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import male from './male_avatar.png';
import female from './female_avatar.png';
import './Register_Form.css';
// import logo from '../../Home_Page/Home_Components/Header/logo.png'

const RegisterForm = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPaswword] = useState("");
  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [city, setCity] = useState("");
  // const [adresse, setAdresse] = useState("");
  // const [phone, setPhone] = useState("");
  // const [codepostal, setCodepostal] = useState("");
  // const [email, setEmail] = useState("");
  // const [dateN, setDateN] = useState("");
  // const [cin, setCin] = useState("");
  // const [gender, setGender] = useState("");
  // const [avatar, setAvatar] = useState("");

  const sliderRef = useRef(null);

  // const handleNext = () => {
  //   sliderRef.current.slickNext();
  // };

  // const handlePrev = () => {
  //   sliderRef.current.slickPrev();
  // };

  const handleSubmit = () => {
     
  };

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

  return (
    <div className='Register'>
      <form className='centrediv'>
          <h2>Register</h2>
        <Slider ref={sliderRef} {...settings}>
          {/* etape 1 */}
        <div className='etapeone'>
          <div className='inputs_gp'>
            <input type="text" placeholder='username'/>
            <input type="text" placeholder='password'/>
            <input type="text" placeholder='confirm password'/>
          </div>
        </div>
        {/* etape 2 */}
        <div className='etapetwo'>
          <div className='inputs_gp'>
              <div className='gp1'>
                <input type="text" placeholder='first name'/>
                <input type="text" placeholder='city'/>
                <input type="text" placeholder='phone number'/>
              </div>
            <div className='gp2'>
              <input type="text" placeholder='last name'/>
              <input type="text" placeholder='adresse'/>
              <input type="text" placeholder='code postal'/>
            </div>
          </div>
        </div>
        {/* etape 3 */}
        <div className='etapetree'>
          <div className='inputs_gp'>
            <div className='gp11'>
                <input type="text" placeholder='Email adresse'/>
                <input type="text" placeholder='CIN'/>
            </div>
            <div className='gp22'>
                <input type="text" placeholder='Date of birth'/>
                <input type="text" placeholder='Gender'/>
            </div>
          </div>
        </div>
        {/* etape 4 */}
        <div className='etapefour'>
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
          <input type="text" placeholder='Choose image' />
          <div>
          <button className='register_btn' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        </Slider>
      
      </form>
    </div>
  );
};

export default RegisterForm;
