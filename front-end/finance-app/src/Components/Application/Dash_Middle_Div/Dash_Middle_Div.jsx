import './Dash_Middle_Div.css';
export default function Middle_div(){
    return(
        <div className='middle_div'>
            <div className='middle'>
                <div className='Balence'>
                    <h4>Total Balence</h4>
                    <h1><span>$</span>12,872</h1>
                    <p>+3.22%</p>
                </div>
                <div className='Expenses'>
                    <p>Expenses</p>
                </div>
            </div>
            <div className='Transactions'>
                <p>Transactions overview</p>
            </div>
        </div>
    )
}