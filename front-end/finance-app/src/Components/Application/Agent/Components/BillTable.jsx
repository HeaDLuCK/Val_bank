import Icon from '@mdi/react';
import './BillTable.css'
import { mdiChevronLeft, mdiChevronRight, mdiMagnify } from '@mdi/js';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import MoreInfo from './AddBill/MoreInfo';
const BillTable = () => {
    const [data, setData] = useState([])
    const toast = useRef(null);
    const refresh = () => window.location.reload(true)
    const [pagination, setPagnation] = useState(1)
    const [isOpen, setOpen] = useState(false)
    const [options, setOptions] = useState({ date: '' })
    useEffect(() => {
        console.log('im here');
        console.log(options);
        axios.post('api/data/agent/bill', options,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    'content-type': 'multipart/form-data'
                }
            }).then(promise => { console.log(promise);; setData(promise.data.payload) })
            .catch(err => { console.log(err); })


    }, [options])
    // if (data.length === 0) {
    //     return <div className="users-container tt"><div className="lds-dual-ring"></div></div>
    // }
    const handleChange = (e, date = null) => {
        (date != null) ? setOptions({ ...options, date: date }) : setOptions({ ...options, date: e.target.value });
        console.log(options)
    }
    return <div className="users-container">
        <Toast ref={toast} />
        {isOpen && <MoreInfo window={isOpen} setWindow={setOpen} />}
        <div className="upbill">
            <h1>Bills List</h1>
            <button id='add-bill' onClick={() => { setOpen(true) }}>ADD BILLS</button>
        </div>
        <div className="bill-filter">
            <h2>Filter :</h2>
            <div className='fil-con'>
                <div className="date">
                    <h5>DATE:</h5>
                    <div> <input onChange={(e) => { handleChange(e) }} id='date'
                        type="text"
                        value={options.date}
                        placeholder='Pick a date'
                        onFocus={e => { e.target.type = "date" }}
                        onBlur={e => { e.target.type = "text" }}
                        name="date" />
                        <button onClick={(e) => { handleChange(e, new Date().toJSON().slice(0, 10)) }}>TODAY</button>
                    </div>
                </div>
                <div className="paid">
                    <h5>STATUS:</h5>
                    <div>
                        <button onClick={() => { setOptions({ ...options, paid_status: 0 }) }}>UNPAID</button>
                        <button onClick={() => { setOptions({ ...options, paid_status: 1 }) }}>PAID</button>
                    </div>
                </div>
            </div>
        </div >
        <div className='scroller'>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>COMPANY</th>
                        <th>PAY CODE</th>
                        <th>AMOUNT</th>
                        <th>role</th>
                        <th>PAID</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(elem => {
                        return (
                            <tr key={elem.id}>
                                <td>{elem.id}</td>
                                <td>{elem.company}</td>
                                <td>{elem.pay_code}</td>
                                <td>{elem.amount}</td>
                                <td>{elem.date_of_bill}</td>
                                <td> <span className={elem.payment_date ? 'status active' : 'status inactive'}>{elem.payment_date ? 'PAID' : 'UNPAID'}</span> </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
        {
            pagination > 1 && <ul className="pagination">
                <li><Icon path={mdiChevronLeft} size={1} /></li>
                <li className='active'><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><Icon path={mdiChevronRight} size={1} /></li>

            </ul>
        }

    </div >
}

export default BillTable;