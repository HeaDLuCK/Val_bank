export const AddAccount = (Account) =>{
    return{type:"Add", payload:Account}
}
export const EditAccount = (Account) =>{
    return{type:"Edit", payload:Account}
}
export const Delete = (id) =>{
    return{type: "Delete", payload:id}
}