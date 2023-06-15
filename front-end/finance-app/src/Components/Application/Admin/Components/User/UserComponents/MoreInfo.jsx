import { useEffect, useRef, useState } from 'react'
import './MoreInfo.css'
import axios from 'axios'
import Confirmation from './Confirmation/Confirmation';
import { Toast } from 'primereact/toast';
const MoreInfo = (props) => {
    const toast = useRef(null);
    const [confirmation, setConfirmation] = useState(false);
    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        gender: '',
        phone_number: '',
        birthday: '',
        city: '',
        code_postal: '',
        address: '',
        email: '',
        cin: '',
    })
    const [inEdit, setEdit] = useState(false)
    const [fade, setFade] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => { setFade(true) }, 100);
        return () => clearTimeout(timer);
    }, [])

    useEffect(() => {
        setData(props.user)
    }, [])
    if (!props.isOpen) return null
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = () => {
        if (typeof data.avatar_image === "string") {
            delete data.avatar_image
        }
        axios.put(`api/data/admin/user/${data.user_id}`, data,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": 'application/json'
                }
            }
        ).then(promise => {
            props.refresh()
        }).catch(err => console.log(err))
    }
    const switchAccountStatus = () => {
        axios.get(`/api/data/admin/user/switch/${data.user_id}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then(promise => {
            console.log(promise.data);
            toast.current.show({ severity: 'info', summary: 'info', detail: promise.data.message, life: 1500 });
            setTimeout(() => { props.refresh() }, 1500);

        }
        ).catch(err => { console.log(err); })
    }
    const onClickOutSide = () => {
        props.closeModel(false)
    }
    const onDoubleClick = () => {
        setEdit(true)
    }
    const editView = (name) => {
        let type = "text";
        if (name === "address") {
            return (<div className='input'>
                <textarea name={name} cols="30" rows="4" onClick={(e) => { e.stopPropagation(); }} value={data[name]}></textarea>
            </div>)
        }
        if (name === "email") {
            type = "email";
        }
        return (<div className='input'>
            <input type={type} name={name} value={data[name]} onChange={(e) => { handleChange(e) }} onClick={(e) => { e.stopPropagation(); }} />
        </div>)
    }
    const defaultView = (name) => {
        return (<div className='input' onDoubleClick={onDoubleClick}>
            {data[name]}
        </div>)
    }
    const handleSend = () => {
        axios.post('api/reset-password', { email: data.email }).then(prom => {
            toast.current.show({ severity: 'info', summary: 'info', detail: prom.data.message, life: 1500 });
        }).catch(err => {
            toast.current.show({ severity: 'info', summary: 'info', detail: err.response.data.message, life: 2500 });
        })


    }
    return (
        <>
            <Confirmation refresh={props.refresh} confirmation={confirmation} setConfirmation={setConfirmation} id={data.user_id} />

            <div className="overlay" onClick={onClickOutSide}>
                <div className={fade ? 'newModel fade' : 'newModel'} onClick={(e) => { e.stopPropagation(); setEdit(false) }}>
                    <Toast ref={toast} />
                    <div className="user-avn no">
                        <div className='avatar'>
                            <img src={`data:image/png;base64,${data.avatar_image}`} alt="#" />
                        </div>
                        <div>
                            <p>{`${data.total_transactions} transactions`}</p>
                            <p>{`${data.total_accounts} accounts`}</p>
                        </div>
                    </div>
                    <div className='item'>
                        <label htmlFor="first_name">FIRST NAME</label>
                        {inEdit ? editView('first_name') : defaultView('first_name')}
                    </div>
                    <div className='item'>
                        <label htmlFor="last_name">LAST NAME</label>
                        <div className='input'>
                            {inEdit ? editView('last_name') : defaultView('last_name')}
                        </div>
                    </div>
                    <div className='item spec'>
                        <label htmlFor="gender">GENDER</label>
                        <div className='input'>
                            {inEdit ? editView('gender') : defaultView('gender')}
                        </div>
                    </div>
                    <div className='item spec'>
                        <label htmlFor="phone_number">PHONE NUMBER</label>
                        <div className='input'>
                            {inEdit ? editView('phone_number') : defaultView('phone_number')}
                        </div>
                    </div>
                    <div className='item no'>
                        <label htmlFor="birthday">BIRTHDAY</label>
                        <div className='input'>
                            {inEdit ? editView('birthday') : defaultView('birthday')}
                        </div>
                    </div>
                    <div className='item'>
                        <label htmlFor="city">CITY</label>
                        <div className='input'>
                            {inEdit ? editView('city') : defaultView('city')}
                        </div>
                    </div>
                    <div className='item'>
                        <label htmlFor="code_postal">CODE POSTAL</label>
                        <div className='input'>
                            {inEdit ? editView('code_postal') : defaultView('code_postal')}
                        </div>
                    </div>
                    <div className='item no'>
                        <label htmlFor="address">ADDRESS</label>
                        <div className='input'>
                            {inEdit ? editView('address') : defaultView('address')}
                        </div>
                    </div>
                    <div className='item'>
                        <label htmlFor="email">EMAIL</label>
                        <div className='input'>
                            {inEdit ? editView('email') : defaultView('email')}
                        </div>
                    </div>
                    <div className='item'>
                        <label htmlFor="cin">CIN</label>
                        <div className='input'>
                            {inEdit ? editView('cin') : defaultView('cin')}
                        </div>
                    </div>
                    {!props.userStatus ?
                        <button className='item button no enab' onClick={() => switchAccountStatus()}>ENABLE</button> :
                        <button className='item button no red' onClick={() => switchAccountStatus()}>DISABLE</button>
                    }
                    <button className='item button orange' onClick={handleSend}>Reset password</button>
                    <button className='item button redh' onClick={() => { setConfirmation(true) }}>DELETE</button>
                    <button className='item button no grey' onClick={() => { props.closeModel(false) }}>CLOSE</button>
                    <button className='item button left green' onClick={() => handleSubmit()}>SAVE</button>
                </div>
            </div>
        </>


    )
}
export default MoreInfo;