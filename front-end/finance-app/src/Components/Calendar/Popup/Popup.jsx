import './Popup.css';

export default function Popup(props) {

  return (props.trigger) ?(
    <div className='Popup'>
      <div className="popup-inner">
        <i onClick={()=>props.setTrigger(false)} class="fa fa-close"></i>
        {props.children}
      </div>
    </div>
  ) : "";
}