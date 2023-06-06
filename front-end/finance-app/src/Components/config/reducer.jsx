
const initialState = {
    Accounts:[ 
        { id: 1, account_name: "aa", balance: "11" , account_type:"", account_status:""}, 
        { id: 2, account_name: "bb", balance: "22" , account_type:"", account_status:""}, 
    ] 
  };
  
  const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'Add':
            return {...state, Accounts:[...state.Accounts, action.payload]}
        case "Edit":
            const Account = state.Accounts.find((u)=>u.id===parseInt(action.payload.id))
            if (Account) {
                Account.account_name = action.payload.account_name
                Account.balance = action.payload.balance
                Account.account_type = action.payload.account_type
                Account.account_status = action.payload.account_status
            }
            return state
        case "Delete":
            return {...state, Accounts:[...state.Accounts.filter((u)=>u.id!==parseInt(action.payload))]}
        default:
           return state
    }
  };
  
  export default reducer;