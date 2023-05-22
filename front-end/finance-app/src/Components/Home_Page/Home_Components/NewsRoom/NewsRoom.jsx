import './NewsRoom.css';
import card_pic1 from './card_img1.png';
export default function NewsRoom(){
    return(
        <div className='newsroom'>
            <div className='title'>
                <h4>NEWSROOM</h4>
                <div className='line'></div>
           </div>
           <div className='cards'>
                <div className='card'>
                    <div className='img'>
                        <img src={card_pic1} alt="" />
                    </div>
                    <div className='content'>
                        <div className='date'>
                            <button>NEW</button>
                            <p>26/11/2025</p>
                        </div>
                        <div className='text'>
                            <h4>List of candidates preselected for oral interviews - recruitment competition 2022- 2023 -</h4>
                            <p>Applicants whose names are listed below are eligible to pass the oral interviews...</p>
                        </div>
                        <div className='btn'>
                            <button>Read more</button>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className='img'>
                        <img src={card_pic1} alt="" />
                    </div>
                    <div className='content'>
                        <div className='date'>
                            <button>NEW</button>
                            <p>26/11/2025</p>
                        </div>
                        <div className='text'>
                            <h4>List of candidates preselected for oral interviews - recruitment competition 2022- 2023 -</h4>
                            <p>Applicants whose names are listed below are eligible to pass the oral interviews...</p>
                        </div>
                        <div className='btn'>
                            <button>Read more</button>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <div className='img'>
                        <img src={card_pic1} alt="" />
                    </div>
                    <div className='content'>
                        <div className='date'>
                            <button>NEW</button>
                            <p>26/11/2025</p>
                        </div>
                        <div className='text'>
                            <h4>List of candidates preselected for oral interviews - recruitment competition 2022- 2023 -</h4>
                            <p>Applicants whose names are listed below are eligible to pass the oral interviews...</p>
                        </div>
                        <div className='btn'>
                            <button>Read more</button>
                        </div>
                    </div>
                </div>
           </div>
           <div className="btn-seeAllNews">
                <button>See all news</button>
           </div>
           
        </div>
    )
}