import { useNavigate } from 'react-router-dom';
import './MissingPage.css';
import error from './error.png';
const MissingPage = () => {
    const navigate = useNavigate()
    return (
        <div className="error">
            <div className="error-container">
                <div>
                    <div className="image"><img src={error} alt="error404" /> </div>
                    <h1 className="title">Page not found</h1>
                </div>
                <div className="description">
                    <p>We're sorry, we couldn't find the page you requested.</p>
                    <button onClick={() => { navigate("/dashboard") }}>GO BACK</button >
                </div>
            </div>
        </div>
    )
};
export default MissingPage;