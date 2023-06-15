import axios from "axios";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";

const AddTransaction = (props) => {
    const toast = useRef(null);
    const [fade, setFade] = useState(false)
    const [data, setData] = useState({
        dep_account: '',
        arr_account: '',
        amount: ''
    })
    useEffect(() => {
        const timer = setTimeout(() => { setFade(true) }, 100);
        return () => clearTimeout(timer);
    }, [])
    const handleChange = (e) => {
        console.log(data);
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSumbit = () => {
        if (data.arr_account != '' && data.dep_account != '' && data.amount != ''
            && data.arr_account != null && data.dep_account != null && data.amount != null) {
            data.amount = parseInt(data.amount).toFixed(2)
            axios.post('/api/data/admin/transaction', data,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(res => {
                    toast.current.show({ severity: 'success', summary: 'success', detail: res.data.message, life: 1500 });
                    setTimeout(() => { props.refresh() }, 1700);
                })
                .catch(err => { console.log(err); })
        }
    }
    return (<div className="overlay2 " onClick={() => { props.setWindow(false) }}>
        <Toast ref={toast} />
        <div className={fade ? 'Trwindow fade' : 'Trwindow'} onClick={(e) => { e.stopPropagation(); }}>
            <h3>ADD TRANSACTION</h3>
            <div className="depo">
                <label htmlFor="depo-acc">
                    depositor account id
                </label>
                <div className='input'>
                    <input type={"text"} name={"dep_account"} value={data["dep_account"]} onChange={(e) => { handleChange(e) }} />
                </div>
            </div>
            <div className="rec">
                <label htmlFor="arr-acc">
                    receiver account id
                </label>
                <div className='input'>
                    <input type={"text"} name={"arr_account"} value={data["arr_account"]} onChange={(e) => { handleChange(e) }} />
                </div>
            </div>
            <div className="amount">
                <label htmlFor="amount">
                    AMOUNT
                </label>
                <div className='input'>
                    <input type={"text"} name={"amount"} value={data["amount"]} onChange={(e) => { handleChange(e) }} />
                </div>
            </div>
            <div className="act">
                <button className='exit' onClick={() => { props.setWindow(false) }}>EXIT</button>
                <button className='save' onClick={handleSumbit}>SUBMIT</button>
            </div>
        </div>
    </div>)
}
export default AddTransaction;