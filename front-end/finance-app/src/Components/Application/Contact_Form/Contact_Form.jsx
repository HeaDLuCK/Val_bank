import './Contact_Form.css';
export default function Contact_Form(){
    return(
        <div className='Contact_Form'>
            <div className='form'>
                <div className='contactSide'>
                    <div className='divs'>
                        <i class='fas fa-map-marker-alt'></i>
                        <h5>Adresse</h5>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
                    </div>
                    <div className='divs'>
                        <i class="fa fa-phone"></i>
                        <h5>Phone</h5>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                    <div className='divs'>
                        <i class="fa fa-envelope"></i>
                        <h5>Email</h5>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
            </div>
            <div className='formInputs'>
                <h3>Send us your probléme</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className='inputsContact'>
                    <input type="text" placeholder='Name'/>
                    <input type="text" placeholder='E-mail'/>
                    <textarea placeholder='Message' ></textarea>
                </div>
                <button>Send Now</button>
            </div>
            
        </div>
    )
}