import './Header_Dash.css';
export default function Header_Dashboard(props){
    return(
        <div className='Header_Dashboard'>
            <h1>{props.title}</h1>
            <p>{props.data}Showing for <span>21 Oct - 28 Oct 2021</span></p>
        </div>
    )
}