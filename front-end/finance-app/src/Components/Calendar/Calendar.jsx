import React, { useState } from 'react';
import Calendar from 'react-calendar';
// import './Calendar.css';
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
  const [event, setEvent] = useState();
  const [btnPopup, setBtnPopus] = useState(false);
  const onChange = (e) =>{
    setBtnPopus(true)
    console.log(e);
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
console.log(data);
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
          axios.get('api/data/calendar',{
            headers: {
              // 'content-type': 'multipart/form-data',
              "Authorization": `Bearer ${localStorage.getItem('token')}`,
          }
          }).then(res => {
            if(res.status === 200){
              setEvent(res.data.code_pay)
            }
          }).catch(err => {
            console.log(err);
            swal('Warning', err.message, 'warning')
        })}
      
  }).catch(err => {
      console.log(err);
      swal('Warning', err.message, 'warning')
  }

  )
}
const handleEvent = () =>{
  alert(
    `Code Pay : ${event.code_pay}`
    `Code Account : ${event.account_id}`
    `Date : ${event.date}`
  )
}

const tileContent = (e) => {
  // if (new Date(e.date).toJSON().slice(0, 10) === event.date){
    return (<div className="special-date" onClick={handleEvent}></div>);
  // }else{
  //   return null
  // }
}
  return (
    <div className='calendar'>
      <Calendar onClickDay={(e)=>onChange(e)} value={value} tileContent={(e)=>tileContent(e)}/>
      {/* <Popup trigger={btnPopup} setTrigger={event.date === data.date? setBtnPopus : false} > */}
      <Popup trigger={btnPopup} setTrigger={setBtnPopus } >
        <h3>Add Your Event Here </h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio, itaque esse Voluptatibus quibusdam.</p>
        <form action="POST" onSubmit={handleSubmit}>
          <div className='popup_divs'>
            <input type="number" id='codeAcc' name='account_id' placeholder='Account Number' onChange={handleInput} value={data.account_id}/>
          </div>
          <div className='popup_divs'>
            <input type="number" id='codePay' name='code_pay' placeholder='Code pay' onChange={handleInput} value={data.code_pay}/>
          </div>
          <div className='popup_btn'>
            <button type='submit'>add Event</button>
          </div>
          
        </form>
      </Popup>
    </div>
  );
}