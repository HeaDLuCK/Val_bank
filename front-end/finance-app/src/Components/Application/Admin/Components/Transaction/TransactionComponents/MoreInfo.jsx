import Icon from '@mdi/react';
import './MoreInfo.css'
import { mdiArrowDownThin, mdiArrowUpThin } from '@mdi/js';
import Update from './Update/Update';
import t from './t.png'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
const MoreInfo = (props) => {
    const toast = useRef(null);
    const [isOpen, setOpen] = useState(false)
    const [fade, setFade] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => { setFade(true) }, 100);
        return () => clearTimeout(timer);
    })

    if (!props?.transaction.dep_account) return null
    const transaction = {
        dep_account: props.transaction.dep_account,
        arr_account: props.transaction.arr_account,
        amount: props.transaction.amount
    }
    const handleDelete = (id) => {
        axios.delete(`api/data/admin/transaction/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                toast.current.show({ severity: 'info', summary: 'info', detail: res.data.message, life: 1500 });
                setTimeout(() => { props.refresh() }, 1500);
            })
            .catch(err => {
                console.log(err);
                toast.current.show({ severity: 'error', summary: 'error', detail: err.response.data.message, life: 1500 });
                setTimeout(() => { props.refresh() }, 1500);
            })
    }
    if (!props.isOpen) return null
    return (
        <>
            {isOpen && <Update setWindow={setOpen} refresh={props.refresh} window={isOpen} transaction={transaction} />}
            <div className="overlay" onClick={() => { props.closeModel(false) }}>
                <Toast ref={toast} />
                <div className={fade ? 'secModel fade' : 'secModel'} onClick={(e) => { e.stopPropagation() }}>
                    <div className="klmt">
                        <div>
                            <h3 className='depo'>DEPOSITOR</h3>
                            <div className="img">
                                <img src={`data:image/png;base64,${props.transaction.depo_avatar}`} alt={props.transaction.depo_name} />
                            </div>
                        </div>
                        <div className='infos'>
                            <p><span>Fullname :</span> {props.transaction.depo_name}</p>
                            <p><span>Account id :</span> {props.transaction.dep_account ? props.transaction.dep_account : "unknown"}</p>
                        </div>
                        <div >
                            <Icon className='depo' path={mdiArrowUpThin} size={1} />
                        </div>
                    </div>
                    <div className="klmt">
                        <div>
                            <h3 className='rece'>RECEIVER</h3>
                        </div>
                        <div className='infos'>
                            <p><span>Fullname :</span> {props.transaction.arr_name}</p>
                            <p><span>Account id :</span>{props.transaction.arr_account ? props.transaction.arr_account : "unknown"}</p>
                        </div>
                        <div>
                            <Icon className='rece' path={mdiArrowDownThin} size={1} />
                            <div className='img'>
                                <img src={`data:image/png;base64,${props.transaction.arr_avatar}`} alt={props.transaction.arr_name} />
                            </div>
                        </div>
                    </div>
                    <div className='action'>
                        <button className='ret' onClick={() => { props.closeModel(false) }}>RETURN</button>
                        {props.transaction.arr_account && props.transaction.dep_account &&
                            <>
                                <button className='upd' onClick={() => { setOpen(true) }}>UPDATE</button>
                                <button className='del' onClick={() => { handleDelete(props.transaction.transaction_id) }}>DELETE</button>
                            </>}

                    </div>
                </div>
            </div>
        </>
    )
}

export default MoreInfo;