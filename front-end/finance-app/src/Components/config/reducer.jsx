

const initialState = { Accounts: [], idAccount: localStorage.getItem('accounts') }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'Get':
            return { ...state, Accounts: [...action.payload] };
        case 'Add':
            return { ...state, Accounts: [...state.Accounts, action.payload] }
        case "Edit":
            const Account = state.Accounts.find((u) => u.account_id === parseInt(action.payload.id))
            if (Account) {
                Account.account_name = action.payload.account_name
                Account.balance = action.payload.balance
                Account.account_type = action.payload.account_type
                Account.account_status = action.payload.account_status
            }
            return state
        case "Delete":
            return { ...state, Accounts: [...state.Accounts.filter((u) => u.account_id !== parseInt(action.payload))] }
        case "idAccount":
            return { ...state, idAccount: parseInt(action.payload) }
        default:
            return state
    }
};

export default reducer;