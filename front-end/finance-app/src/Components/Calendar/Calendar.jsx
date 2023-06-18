import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
// import './Calendar.css';
import Popup from './Popup/Popup';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export default function MyAppp() {
  const refresh = () => window.location.reload(true)
  const [data, setData] = useState({
    acc_id: '',
    pay_code: '',
    pay_day: ''
  });
  const [value, setValue] = useState();
  const [event, setEvent] = useState([]);
  const [btnPopup, setBtnPopus] = useState(false);
  const [info, setInfo] = useState({})
  const onChange = (e) => {
    setBtnPopus(true)
    // let helper = []
    // if (event.length > 0) { helper = event.filter(event => event.pay_day.slice(0, 10) == new Date(e).toJSON().slice(0, 10)) }
    // setInfo({
    //   acc_id: helper[0].acc_id,
    //   pay_code: helper[0].pay_code,
    //   pay_day: helper[0].pay_day,
    // })
    setData({
      ...data, date: new Date(e).toJSON().slice(0, 10)
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
      acc_id: data.account_id,
      pay_code: data.code_pay,
      pay_day: data.date,
    }
    axios.post('api/data/autopay', dataa, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(res => {
      console.log(res);
      refresh()
    }).catch(err => {
      console.log(err);
      swal('Warning', err.message, 'warning')
    }

    )
  }

  useEffect(() => {
    axios.get('api/data/autopay', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(res => {
      setEvent(res.data.payload);
    }).catch(err => {
      console.log(err);
      // swal('Warning', err.message, 'warning')
    })
  }, [])

  const handleEvent = () => {
    alert(
      info.pay_day + ' ' +
      info.pay_code + ' ' +
      info.acc_id
    )
    setBtnPopus(false)

  }

  const tileContent = (e) => {
    let helper = false
    event.map(event => {
      if (event.pay_day.slice(0, 10) === new Date(e.date).toJSON().slice(0, 10)) {
        helper = true
      };
    })
    return helper ? (<div className="special-date" /*onClick={(e) => { e.stopPropagation(); handleEvent(); }}*/></div>) : null

  }
  return (
    <div className='calendar'>
      <Calendar onClickDay={(e) => onChange(e)} value={value} tileContent={(e) => tileContent(e)} />
      {/* <Popup trigger={btnPopup} setTrigger={event.date === data.date? setBtnPopus : false} > */}
      <Popup trigger={btnPopup} setTrigger={setBtnPopus} >
        <h3>Add Your Event Here </h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, itaque esse Voluptatibus quibusdam.</p>
        <form action="POST" onSubmit={handleSubmit}>
          <div className='popup_divs'>
            <input type="number" id='codeAcc' name='account_id' placeholder='Account Number' onChange={handleInput} value={data.account_id} />
          </div>
          <div className='popup_divs'>
            <input type="number" id='codePay' name='code_pay' placeholder='Code pay' onChange={handleInput} value={data.code_pay} />
          </div>
          <div className='popup_btn'>
            <button type='submit'>add Event</button>
          </div>

        </form>
      </Popup>
    </div>
  );
}