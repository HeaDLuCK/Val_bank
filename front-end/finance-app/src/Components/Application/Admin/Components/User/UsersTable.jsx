import Icon from '@mdi/react';
import './User.css'
import { mdiChevronLeft, mdiChevronRight, mdiMagnify } from '@mdi/js';
import { useEffect, useRef, useState } from 'react';
import MoreInfo from './UserComponents/MoreInfo';
import axios from 'axios';
import { Toast } from 'primereact/toast';
const UsersTable = () => {
    const toast = useRef(null);
    const refresh = () => window.location.reload(true)
    const [isOpen, setOpen] = useState(false)
    const [data, setData] = useState([null])
    const [oneUser, setUser] = useState({})
    const [userStatus, setStatus] = useState(0)
    const [pagination, setPagnation] = useState(1)
    const [options, setOptions] = useState({})
    const [active, setActive] = useState(false)
    const [inactive, setInactive] = useState(false)
    const [username, setUsername] = useState('');
    useEffect(() => {
        console.log(options);
        axios.post(`/api/data/admin/users`, options,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then(res => {
                console.log(res);
                setData(res.data.payload.data)
                setPagnation(res.data.payload.last_page)
            })
            .catch(err => { console.log(err) })
    }, [options])
    const switchAccountStatus = (id) => {
        axios.get(`/api/data/admin/user/switch/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }
        ).then(promise => {
            console.log(promise.data);
            toast.current.show({ severity: 'info', summary: 'info', detail: promise.data.message, life: 1500 });
            setTimeout(() => { refresh() }, 1500);
        }
        ).catch(err => { console.log(err); })
    }

    const openModel = (user, status) => {
        setUser(user)
        setStatus(status)
        setOpen(true)
    }
    const handleStatus = (status) => {
        if (+options.user_status === +status) {
            setActive(false);
            setInactive(false);
            setOptions({ ...options, user_status: '' });
        } else {
            setOptions({ ...options, user_status: +status })
        }

    }
    if (data[0] === null) {
        return <div className="users-container tt"><div className="lds-dual-ring"></div></div>
    }
    return <div className="users-container">
        <Toast ref={toast} />
        {isOpen && <MoreInfo refresh={refresh} userStatus={userStatus} closeModel={setOpen} isOpen={isOpen} user={oneUser} />}
        <h1>Users List</h1>
        <div className="filter">
            <h2>Filter :</h2>
            <div className='fil-container'>
                <button id='active' className={active ? 'on' : ''}
                    onClick={() => { setActive(true); setInactive(false); handleStatus(1) }}>ACTIVE</button>
                <button id='inactive' className={inactive ? 'on' : ''}
                    onClick={() => { setActive(false); setInactive(true); handleStatus(0) }}>INACTIVE</button>
                <div className='search'>
                    <input type="text" name='username' value={username} onChange={(e) => { setUsername(e.target.value) }} placeholder='Search by username' />
                    <button onClick={() => { setOptions({ ...options, username: username }) }}><Icon path={mdiMagnify} size={1} /></button>
                </div>
            </div>
        </div>
        <div className='scroller'>
            {data.length > 0 ? <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>username</th>
                        <th>first name</th>
                        <th>last name</th>
                        <th>role</th>
                        <th>account status</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(elem => {
                        return (
                            <tr key={elem.id}>
                                <td>{elem.id}</td>
                                <td>{elem.username}</td>
                                <td>{elem.user_detail.first_name}</td>
                                <td>{elem.user_detail.last_name}</td>
                                <td>{elem.role}</td>
                                <td> <span className={elem.user_status ? 'status active' : 'status inactive'}>{elem.user_status ? 'ACTIVE' : 'INACTIVE'}</span> </td>
                                <td className='btn'>
                                    <button className='show' onClick={() => { openModel(elem.user_detail, elem.user_status) }}>SHOW MORE</button>
                                    {!elem.user_status ?
                                        <button className='enable' onClick={() => switchAccountStatus(elem.id)}>ENABLE</button> :
                                        <button className='disable' onClick={() => switchAccountStatus(elem.id)}>DISABLE</button>
                                    }
                                </td>
                            </tr>
                        )
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

        </ul>}

    </div >
}

export default UsersTable;