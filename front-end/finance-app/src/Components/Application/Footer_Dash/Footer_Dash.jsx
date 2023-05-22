import './Footer_Dash.css';
import logo from '../../Home_Page/Home_Components/Header/logo.png';
export default function Footer_Dash(){
    return(
        <div className='Footer_dash'>
            <div className='body_footer_dash'>
                <div className='logo_dash'>
                    <img src={logo} alt="Logo" />
                </div>
                <div className='footer_dash_services'>
                    <p>Our services :</p>
                    <ul>
                        <li>Became a customer</li>
                        <li>Val bank mobile</li>
                    </ul>
                </div>
                <div className='footer_dash_rights'>
                    <h4>Follow us</h4> 
                    <div className='icons_dash'>
                            <i class="fa-brands fa-facebook"></i>
                            <i class="fa-brands fa-linkedin-in"></i>
                            <i class="fa-brands fa-youtube"></i>
                            <i class="fa-brands fa-twitter"></i>
                    </div>
                </div>
            </div>
            <p className='p_rights'>©2023 VAL Bank - All rights reserved</p>
        </div>
    )
}