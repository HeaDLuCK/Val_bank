import axios from 'axios';
import './Confirmation.css';


const Confirmation = (props) => {


    if (!props.confirmation) return null
    const handleDelete = () => {
        if (!props.id) { props.axiossetConfirmation(false); }
        axios.delete(`/api/data/admin/user/${props.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then(promise => {
                console.log("deleted successfully");
                props.refresh()
            }).catch(err => {
                console.log(err);
            })
    }
    return (<div className="overlay2 " onClick={() => { props.setConfirmation(false) }}>
        <div className='window' onClick={(e) => { e.stopPropagation(); }}>
            <h2>ARE YOU SURE?</h2>
            <div>
                <button className='exit ' onClick={() => { props.setConfirmation(false) }}>EXIT</button>
                <button className='delete' onClick={handleDelete}>DELETE</button>
            </div>
        </div>

    </div>)
}
export default Confirmation;