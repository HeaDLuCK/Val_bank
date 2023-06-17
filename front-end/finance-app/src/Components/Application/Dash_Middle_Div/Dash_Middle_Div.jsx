import { useEffect, useState } from 'react';
import './Dash_Middle_Div.css';
import { Chart } from "react-google-charts";
import axios from 'axios';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from 'chart.js';

import { Doughnut, Bar } from 'react-chartjs-2';

import { useSelector } from 'react-redux';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement

)

export default function Middle_div() {
    const dateH = new Date().setMonth(new Date().getMonth() - 1)
    const [dates, setDates] = useState({ startDate: new Date(dateH).toJSON().slice(0, 10), endDate: new Date().toJSON().slice(0, 10) });
    const [balance, setBalance] = useState();
    const [recieve, setRecieve] = useState([]);
    const [deposit, setDeposit] = useState([]);
    const account = useSelector(state => state.idAccount);
    const [expenses, setExpenses] = useState([]);
    const handleInput = (e) => {
        setDates({ ...dates, [e.target.name]: e.target.value })
        console.log(dates);
    }
    // console.log(account);

    // function for to manage data
    const barChartData = () => {
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
            return ([`${e.date}`, +e.receive, +sent])
        }),
            deposit.length && deposit.map(e => {
                let receive = 0;
                if (recieve.length) {
                    let helper = recieve.filter(j => j.date === e.date)
                    if (helper.length) {
                        receive = helper[0]["receive"]
                    }
                }
                return ([`${e.date}`, +receive, +e.sent])
            })
        );
        const dataa = []
        needFilter.reduce((acc, curr, index) => {
            if (curr) {
                if (acc[0] !== curr[0]) {
                    dataa.push(curr)
                }
            }

            return curr
        })
        return dataa.sort((a, b) => { return new Date(a[0]) > new Date(b[0]) ? 1 : -1 });
    }

    useEffect(() => {
        console.log("change");
        axios.post(`/api/data/dashboard/${account}`, dates,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    'content-type': 'multipart/form-data'
                }
            })
            .then(res => {
                console.log(res);
                setExpenses(res.data.payload.expenses)
                setBalance(res.data.payload.balance)
                setRecieve(res.data.payload.received)
                setDeposit(res.data.payload.deposit)
            }).catch(err => {
                console.log(err);
            });
    }, [dates, account]);

    const data1 = {
        labels: expenses.map(e => {
            return [e.type]   //`${[e.type]}`
        }
        ),
        datasets: [{
            data: expenses.map(e => {
                // console.log(e.expense);
                return [e.expense]
            }),
            backgroundColor: ['#191970', '#4682B4', '#6495ED'],
        }]

    }

    const options1 = {
        title: "Expenses",
        pieHole: 0.4,
        is3D: false,
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const data2 = {
        labels: barChartData().map(elem => elem[0]),
        datasets: [
            {
                label: 'receiver',
                data: barChartData().map(elem => elem[1]),
                borderColor: "#67c6dd",
                backgroundColor: "#67c6dd78",
                borderWidth: 2,
                borderRadius: 5,
                tension: 0.5
            },
            {
                label: 'deposit',
                data: barChartData().map(elem => elem[2]),
                borderColor: "#2d8bba",
                backgroundColor: "#2d8bba78",
                borderWidth: 2,
                borderRadius: 5,
                tension: 0.5
            }
        ]
    }
    const options2 = {
        plugins: {
            legend: false,
        },
        scales: {
            x: {
                ticks: {
                    color: "#000"
                },
                grid: { display: false }
            },
            y: {
                ticks: {
                    color: "#000",
                    stopSize: 2,
                    callback: (value) => value + ' DH',

                },
                border: { dash: [4, 4] },
            }
        }
    }

    return (
        <div className='middle_div'>
            <div className='dates-dashboard'>
                <input type="date" name='startDate' value={dates.startDate} onChange={handleInput} />
                <input type="date" name='endDate' value={dates.endDate} onChange={handleInput} />
            </div>

            <div className='middle'>
                <div className='Balence'>
                    <h2>Total Balance</h2>
                    <h1>{balance}<span>DH</span></h1>
                </div>
                <div className='Expenses'>
                    <h1>Expenses</h1>
                    <Doughnut
                        data={data1}
                        options={options1}
                    />
                </div>
            </div>
            <div className='Transactions'>
                <div className='title-chart'>
                    <h1>Transactions Chart</h1>
                    <p>deposits/expenses</p>
                </div>
                <Bar data={data2} options={options2}/>
            </div>
        </div>
    )
}