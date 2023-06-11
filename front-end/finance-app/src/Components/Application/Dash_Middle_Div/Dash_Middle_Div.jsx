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
import { useSelector } from 'react-redux';

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
    const account = useSelector(state => state.idAccount);
    // const [account, setAccount] = useState(localStorage.getItem('accounts')[0]);
    const [expenses, setExpenses] = useState([]);

    const handleInput = (e) => {
        setDates({ ...dates, [e.target.name]: e.target.value })
        console.log(dates);
    }

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
    //             setRecieve(res.data.payload.received)
    //             setDeposit(res.data.payload.deposit)
    //         }).catch(err => {
    //             console.log(err);
    //         });
    // }, [dates, account]);
    const data = {
        labels: expenses.map(e => {
            return [e.type]   //`${[e.type]}`
        }
        ),
        datasets: [{
            data: expenses.map(e => {
                console.log(e.expense);
                return [e.expense]
            }),
            backgroundColor: ['#191970', '#4682B4', '#6495ED'],
        }]

    }

    const options = {
        title: "Transactions Overview",
        pieHole: 0.4,
        is3D: false,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const needFilter = [
        []
    ].concat(recieve.length && recieve.map(e => {
        let sent = 0;
        if (deposit.length) {
            let helper = deposit.filter(j => j.date === e.date)
            if (helper.length) {
                sent = helper[0]["sent"]
            }
        }
        return ([`${e.date}`, e.receive, sent])
    }),
        deposit.length && deposit.map(e => {
            let receive = 0;
            if (recieve.length) {
                let helper = recieve.filter(j => j.date === e.date)
                if (helper.length) {
                    receive = helper[0]["receive"]
                }
            }
            return ([`${e.date}`, receive, e.sent])
        })
    );
    const dataa = [["Year", "recieved", "deposit"]]
    needFilter.reduce((acc, curr, index) => {
        if (curr) {
            if (acc[0] !== curr[0]) {
                dataa.push(curr)
            }
        }

        return curr
    })
    const optionss = {
        chart: {
            title: "Company Performance",
            subtitle: "deposit, Expenses, and Profit: 2014-2017",
        },
    };
    return (
        <div className='middle_div'>
            <div className='dates-dashboard'>
                <input type="date" name='date1' value={dates.date1} onChange={handleInput} />
                <input type="date" name='date2' value={dates.date2} onChange={handleInput} />
            </div>
            
            <div className='middle'>
                <div className='Balence'>
                    <h4>Total Balence</h4>
                    <h1><span>DH</span>{balance}</h1>
                    <p>+3.22%</p>
                </div>
                <div className='Expenses'>
                    <Doughnut
                        data={data}
                        options={options}
                    />
                </div>
            </div>
            <div className='Transactions'>
                <Chart
                    chartType="Bar"
                    width="100%"
                    height="300px"
                    data={dataa}
                    options={optionss}
                />
            </div>
        </div>
    )
}