import Icon from '@mdi/react';
import './Transactions.css'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { useEffect, useState } from 'react';
import MoreInfo from './TransactionComponents/MoreInfo';
import axios from 'axios';
import AddTransaction from './TransactionComponents/AddTransaction/AddTransaction';

const TransactionsTable = () => {
    const refresh = () => window.location.reload(true)
    const [isOpen, setOpen] = useState(false)
    const [data, setData] = useState([null])
    const [oneTransaction, setTransaction] = useState({});
    const [pagination, setPagination] = useState(0)
    const [newWindow, setWindow] = useState(false)

    useEffect(() => {
        axios.get('api/data/admin/transaction',
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then((prom) => prom.data)
            .then(data => {
                setPagination(data.payload.last_page);
                setData(data.payload.data);
            })
            .catch(err => { console.log(err); })
    }, [])
    const handleShow = (transaction) => {
        setTransaction({
            transaction_id: transaction.transaction_id,
            depo_avatar: transaction.depositor_avatar,
            depo_name: transaction.depositor_name,
            dep_account: transaction.dep_account,
            arr_avatar: transaction.reciver_avatar,
            arr_name: transaction.reciver_name,
            arr_account: transaction.arr_account,
            amount: transaction.amount,
        })
        setOpen(true)
    }
    if (data[0] === null) {
        return <div className="users-container tt"><div className="lds-dual-ring"></div></div>
    }
    console.log(data);
    return (<>
        {newWindow && <AddTransaction refresh={refresh} setWindow={setWindow} />}
        <div className="transaction-container">
            {isOpen && <MoreInfo closeModel={setOpen} isOpen={isOpen} refresh={refresh} transaction={oneTransaction} />}

            <div className="upper">
                <h1>Transactions List</h1>
                <button onClick={() => { setWindow(true) }}>ADD TRANSACTION</button>
            </div>
            <div className='scroller'>
                {data.length > 0 ? <table>
                    <thead>
                        <tr>
                            <th>transaction id</th>
                            <th>receiver id</th>
                            <th>depositor ud</th>
                            <th>amount</th>
                            <th>date</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(elem => {
                            return (<tr key={elem.transaction_id}>
                                <td>{elem.transaction_id}</td>
                                <td>{elem.reciver_id ? elem.reciver_id : "UNKOWN"}</td>
                                <td>{elem.depositor_id ? elem.depositor_id : "UNKOWN"}</td>
                                <td>{elem.amount}DH</td>
                                <td>{elem.created_at.slice(0, 10)}</td>
                                <td className='btn'>
                                    <button className='show' onClick={() => { handleShow(elem) }}>SHOW MORE</button>
                                </td>
                            </tr>)
                        })}

                    </tbody>
                </table> :
                    <h1 style={{ textAlign: "center", width: "100%" }}>NO DATA</h1>}
            </div>
            {pagination > 1 && <ul className="pagination">
                <li><Icon path={mdiChevronLeft} size={1} /></li>
                <li className='active'><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><Icon path={mdiChevronRight} size={1} /></li>

            </ul>
            }

        </div >
    </>)
}


export default TransactionsTable;