import './Accounts.css';
// import user from './user.png';
export default function Accounts(){
    return(
        <div className='AccountsCards'>
            <h3>My Accounts :</h3>
            <div className='MyAccountsDiv'>
                <div className='MyAccount'>
                    <div className='infos'>
                        <h3>Balance</h3>
                        <p className='balance'>2310.00 <span>$</span></p>
                        {/* <div className='userInfo'>
                            <i class="fa fa-user"></i>
                            <p>Omayma ABIDY</p>
                        </div>
                        <div className='userInfo'>
                            <i class='fas fa-map-marker-alt'></i>
                            <p>BMCE, Agence alwifaq</p>
                        </div> */}
                    </div>
                    <div className='dateCreation'>
                        <p>Crée le : <span>20 Nov 2020</span></p> 
                    </div>
                </div>
                <div className='MyAccount'>
                    <div className='infos'>
                        <h3>Balance</h3>
                        <p className='balance'>2310.00 <span>$</span></p>
                    </div>  
                    <div className='dateCreation'>
                        <p>Crée le : <span>20 Nov 2020</span></p>
                    </div>
                </div>
                <div className='LastDivAccount'>
                    <div className='AddAccount'>
                        <i class="fa fa-plus"></i>
                    </div>
                    <div className='AjouterAccount'>
                        <p>Add Account</p>
                    </div>
                </div>
            </div>
             
        </div>
    )
}