import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';
import Popup from './Popup/Popup';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function MyAppp() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    account_id:'',
    code_pay:'',
    date:''
  });
  const [value, setValue] = useState();
  const [btnPopup, setBtnPopus] = useState(false);
  const onChange = (e) =>{
    setBtnPopus(true)
    console.log(e);
    const year = new Date(e).getFullYear()
    const mounth = new Date(e).getMonth()+1
    const day = new Date(e).getDay()
    setData({
      ...data, date: year +'-'+mounth+'-'+day
  })
  }
  const handleInput = (e) => {
    e.persist();
    setData({
        ...data, [e.target.name]: e.target.value
    })
    
}
const handleSubmit = (e) => {
  e.preventDefault();
  const dataa = {
      account_id: data.account_id,
      code_pay:data.code_pay,
      date: data.date,
  }
  axios.post('api/data/calendar', dataa, {
      headers: {
          // 'content-type': 'multipart/form-data',
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
  }).then(res => {
      console.log(res);
      if (res.status === 200) {
          swal('Success', res.data.message, 'success')
          navigate('/calendar')
      }
  }).catch(err => {
      console.log(err);
      swal('Warning', err.message, 'warning')
  }

  )
}

  return (
    <div className='calendar'>
      <Calendar onClickDay={(e)=>onChange(e)} value={value} />
      <Popup trigger={btnPopup} setTrigger={setBtnPopus}>
        <h1>Popup</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className='popup_divs'>
            <label htmlFor="codeAcc">code Account</label>
            <input type="number" id='codeAcc' name='account_id' onChange={handleInput} value={data.account_id}/>
          </div>
          <div className='popup_divs'>
            <label htmlFor="codePay">Code Pay</label>
            <input type="number" id='codePay' name='code_pay' onChange={handleInput} value={data.code_pay}/>
          </div>
          <button type='submit'>add Event</button>
        </form>
      </Popup>
    </div>
  );
}