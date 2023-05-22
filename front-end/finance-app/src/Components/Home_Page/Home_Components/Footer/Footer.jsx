import './Footer.css';
import logo from '../Header/logo.png';
export default function Footer(){
    return(
        <div className='Footer'>
            <div className='divs'>
                <div className='logo'>
                    <img src={logo} alt="logo" />
                </div>
                <div className='services'>
                    <h4>OUR SERVICES :</h4>
                    <ul> 
                        <li>BECOME A CUSTOMER</li>
                        <li>VAL BANK MOBILE</li>
                    </ul>
                </div>
                <div className='reseaux-sociaux'>
                    <h4>FOLLOW US :</h4>
                    <div className='icons'>
                        <i class="fa-brands fa-facebook"></i>
                        <i class="fa-brands fa-linkedin-in"></i>
                        <i class="fa-brands fa-youtube"></i>
                        <i class="fa-brands fa-twitter"></i>
                    </div>
                    
                </div>
            </div>
            <div className='rights'>
                <p>©2023 7ENA Bank - All rights reserved</p>
            </div>
        </div>
    )
}