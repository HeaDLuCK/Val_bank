import { useEffect, useState } from "react";
import AnimatedNumber from "animated-number-react";
import './Dashboard.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
);

const Dashboard = () => {
    const [info, setInfo] = useState([]);
    const [labels, setLabels] = useState([]);
    const [dataset, setDataset] = useState([]);

    useEffect(() => {
        axios.get('api/data/admin/admin-dashboard',
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            }).then(promise => {
                setInfo(promise.data.payload);
                setLabels(Object.keys(promise.data.payload.transaction))
                setDataset(Object.values(promise.data.payload.transaction))
                console.log(promise.data.payload.transaction);
            })
            .catch(err => { console.log(err); })
    }, [])
    if (info.length === 0) {
        return <div className="users-container tt"><div className="lds-dual-ring"></div></div>
    }
    const data = {
        labels: labels,
        datasets: [{
            data: dataset,
            backgroundColor: "#fff",
            borderColor: "#fff",
            pointBorderColor: "#fff",
            pointBorderWidth: 4,
            tension: 0.5
        }]
    }
    const options = {
        plugins: {
            legend: false,
        },
        scales: {
            x: {
                ticks: {
                    color: "#fff"
                },
                grid: { display: false }
            },
            y: {
                min: 0,
                max: Math.max(...dataset) + 2,
                ticks: {
                    color: "#fff",
                    stopSize: 2,
                    callback: (value) => value + 'p',
                    stepSize: 1

                },
                border: { dash: [4, 4] },
            }
        }
    }
    return (
        <div className="dashboard-admin" >
            <div className="val-info-ad">
                <div className="users">
                    <h3>USERS</h3>
                    <AnimatedNumber
                        className={"anim-number"}
                        value={info.users}
                        duration={1000}
                        style={{ fontSize: 200 }}
                        formatValue={(value) => value.toFixed(0)}
                    />
                </div>
                <div className="register">
                    <h3>Register <small>(today)</small></h3>

                    <AnimatedNumber
                        className={"anim-number"}
                        value={info.register}
                        duration={1000}
                        formatValue={(value) => value.toFixed(0)}
                    />
                </div>
                <div className="agents">
                    <h3>Agents</h3>
                    <AnimatedNumber
                        className={"anim-number"}
                        value={info.agents}
                        duration={1000}
                        formatValue={(value) => value.toFixed(0)}
                    />
                </div>
            </div>
            <div className="visit-chart" >
                <h3>Transaction History Chart</h3>
                {dataset.length > 0 ? <Line data={data} options={options} /> :
                    <h1 style={{ textAlign: "center", width: "100%", height: "100%" }}>NO DATA</h1>}
            </div>
        </div >
    )
}

export default Dashboard;