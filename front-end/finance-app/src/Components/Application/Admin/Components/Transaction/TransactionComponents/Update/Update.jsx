import { useEffect, useRef, useState } from 'react';
import './Update.css'
import axios from 'axios';
import { Toast } from 'primereact/toast';

const Update = (props) => {
    const toast = useRef(null);
    const [fade, setFade] = useState(false)
    const [data, setData] = useState({
        dep_account: '',
        arr_account: '',
        amount: ''
    })
    const [inEdit, setEdit] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => { setFade(true) }, 100);
        setData(props.transaction)
        return () => clearTimeout(timer);
    }, [])
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const onDoubleClick = () => {
        setEdit(true);
    }
    const editView = (name) => {
        return (<div className='input'>
            <input type={"text"} name={name} value={data[name]} onChange={(e) => { handleChange(e) }} onClick={(e) => { e.stopPropagation(); }} />
        </div>)
    }
    const defaultView = (name) => {
        if (name === "amount") {
            return (<div className='input' onDoubleClick={onDoubleClick}>
                {data[name]}DH
            </div>)
        }
        return (<div className='input' onDoubleClick={onDoubleClick}>
            {data[name]}
        </div>)
    }
    const handleSubmit = () => {
        axios.put(`api/data/admin/transaction/${data.dep_account}`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            toast.current.show({ severity: 'success', summary: 'success', detail: res.data.message, life: 1500 });
            setTimeout(() => { props.refresh() }, 1700);
        })
            .catch(err => { console.log(err); })
    }
    if (!props.window) return null
    return (<div className="overlay2 " onClick={() => { props.setWindow(false) }}>
        <Toast ref={toast} />
        <div className={fade ? 'Trwindow fade' : 'Trwindow'} onClick={(e) => { e.stopPropagation(); setEdit(false) }}>
            <h3>UPDATE TRANSACTION</h3>
            <div className="depo">
                <label htmlFor="depo-acc">
                    depositor account id
                </label>
                {defaultView("dep_account")}
            </div>
            <div className="rec">
                <label htmlFor="arr-acc">
                    receiver account id
                </label>
                {inEdit ? editView("arr_account") : defaultView("arr_account")}
            </div>
            <div className="amount">
                <label htmlFor="amount">
                    AMOUNT
                </label>
                {inEdit ? editView("amount") : defaultView("amount")}
            </div>
            <div className="act">
                <button className='exit' onClick={() => { props.setWindow(false) }}>EXIT</button>
                <button className='save' onClick={handleSubmit}>SAVE</button>
            </div>
        </div>
    </div>)
}
export default Update;
