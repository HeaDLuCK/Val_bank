import { useEffect, useState } from 'react';
import './Dash_Middle_Div.css';
import { Chart } from "react-google-charts";
import axios from 'axios';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

export default function Middle_div() {
    const [dates, setDates] = useState({ "startDate": "2023-06-04" });
    const [balance, setBalance] = useState();
    const [recieve, setRecieve] = useState([]);
    const [deposit, setDeposit] = useState([]);
    // const [account, setAccount] = useState(localStorage.getItem('accounts')[0]);
    const [expenses, setExpenses] = useState([]);

    // const handleInput = (e) => {
    //     setDates({ ...dates, [e.target.name]: e.target.value })
    //     console.log(dates);
    // }

    // useEffect(() => {
    //     axios.post(`/api/data/dashboard/${account}`, dates,
    //         {
    //             headers: {
    //                 "Authorization": `Bearer ${localStorage.getItem('token')}`,
    //                 'content-type': 'multipart/form-data'
    //             }
    //         })
    //         .then(res => {
    //             setExpenses(res.data.payload.expenses)
    //             setBalance(res.data.payload.balance)
    //             setRecieve(res.data.payload.recieve)
    //             setDeposit(res.data.payload.deposit)
    //         }).catch(err => {
    //             console.log(err);
    //         });
    // }, [dates, account]);
    // const data = {
    //     labels: expenses.map(e => {
    //         return [e.type]   //`${[e.type]}`
    //     }
    //     ),
    //     datasets: [{
    //         data: expenses.map(e => {
    //             return [e.expense]
    //         }),
    //         backgroundColor: ['#191970', '#4682B4', '#6495ED'],
    //     }]

    // }

    // const options = {
    //     title: "Transactions Overview",
    //     pieHole: 0.4,
    //     is3D: false,
    //     plugins: {
    //         legend: {
    //             display: false
    //         }
    //     }
    // };

    //  const dataa = [
    //     ["Year", "recieved", "deposit"],
    //     recieve.map(e => {
    //         return([`${e.date}`, e.sent, deposit.filter(j => j.date === e.date).map(i => i.sent)]) 
    //     })
    //   ];
      
    //      const optionss = {
    //     chart: {
    //       title: "Company Performance",
    //       subtitle: "deposit, Expenses, and Profit: 2014-2017",
    //     },
    //   };
    return (
        <div className='middle_div'>
            {/* <input type="date" name='date1' value={dates.date1} onChange={handleInput} />
            <input type="date" name='date2' value={dates.date2} onChange={handleInput} /> */}
            <div className='middle'>
                <div className='Balence'>
                    <h4>Total Balence</h4>
                    <h1><span>DH</span>{balance}</h1>
                    <p>+3.22%</p>
                </div>
                <div className='Expenses'>
                    {/* <Doughnut
                        data={data}
                        options={options}
                    /> */}
                </div>
            </div>
            <div className='Transactions'>
            {/* <Chart
                chartType="Bar"
                width="100%"
                height="300px"
                data={dataa}
                options={optionss}
            /> */}
            </div>
        </div>
    )
}