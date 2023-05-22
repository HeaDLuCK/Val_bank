import './Slider.css';
import mypic2 from './phone_bg.jpg';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Link} from 'react-router-dom';

export default function MySlider(){
    const settings = {
        dots: true, // Show navigation dots
        infinite: true, // Loop through slides
        speed: 500, // Transition speed in milliseconds
        slidesToShow: 1, // Number of slides to show at a time
        slidesToScroll: 1, // Number of slides to scroll on navigation
        // autoplay: true, // Autoplay slides
        // autoplaySpeed: 2000, // Autoplay interval in milliseconds
      };
    return(
        <div>
            {/* <div className='iconss'>
            <i class="fa fa-angle-double-left"></i>
             <i class="fa fa-angle-double-right"></i>
            </div> */}
        <Slider {...settings}>
            
            <div className="div">
                <div className='slider'>
                    <div className='title'>
                        <h2>With <span>Val</span> live a client experience completely rethought</h2>
                        <p>Whether You Have A Computer , Tablet Or A Smathphone <span>Your Experience</span> Can Only Be Improved</p>
                        <button><Link to={'/login'}>Sign up for free</Link></button>
                    </div>
                    <div className='img'>
                        <img src={mypic2} alt="img" />
                    </div>
                    
                </div>
            </div>
            <div className="div">
                <div className='slider'>
                    <div className='title'>
                    <h2>
                    All your accounts<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;All in <span>one place</span> 
                    </h2>
                    <p>
                    See it all at a glance when you link your cash accounts, credit cards, investments, and bills.
                    </p>
                    <button>Sign up for free</button>
                    </div>
                    
                    <div className='img'>
                        <img src={mypic2} alt="img" />
                    </div>
                </div>
            </div>
            <div className="div">
                <div className='slider'>
                    <div className='title'>
                        <h2>Your Finances ..   
                            <br />&nbsp;&nbsp;&nbsp;&nbsp;safe and secure</h2>
                        <p>With 256-bit encryption and multi-factor authentication, we
                                protect your info as if it’s our own.</p>
                        <button>Sign up for free</button>
                    </div>
                    <div className='img'>
                        <img src={mypic2} alt="img" />
                    </div>
                </div>
            </div>
        </Slider>
        </div>
    )
}