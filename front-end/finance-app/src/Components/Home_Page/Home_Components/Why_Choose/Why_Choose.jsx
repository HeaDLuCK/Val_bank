import './Why_Choose.css';
export default function WhyChoose(){
    return(
        <div className="WhyChoose">
           <div className='title'>
                <h4>WHY CHOOSE <span>VAL </span>BANK?</h4>
                <div className='line'></div>
           </div>
           <div className='divs'>
                <div className='leftdiv'>
                    <div className='up'>
                        <i class="fa fa-bank"></i>
                        <p>A Civic Bank, A Priviliged Partner Of Governemental Initiatives</p>
                    </div>
                    <div className='lines'></div>
                    <div className='down'>
                        <i class="fa fa-exchange"></i>
                        <p>A Wide Range Of Banking Products And Services With Adapted Pricing</p>
                    </div>
                </div>
                <div className='rightdiv'>
                    <div className='up'>
                        <i class='fas fa-map-marker-alt'></i>
                        <p>A Large Capillary Network Of More Than 2,000 Branches</p>
                    </div>
                    <div className='lines'></div>
                    <div className='down'>
                        <i class="fa fa-credit-card"></i>
                        <p>A Resolutely Modern Bank Anchored In The Digital Age</p>
                    </div>
                </div>
           </div>
        </div>
    )
}