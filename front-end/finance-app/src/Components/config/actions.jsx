export const getData = (data) =>{
    return{type:"Get", payload:data}
}
export const AddAccount = (Account) =>{
    return{type:"Add", payload:Account}
}
export const EditAccount = (Account) =>{
    return{type:"Edit", payload:Account}
}
export const Delete = (id) =>{
    return{type: "Delete", payload:id}
}
export const idAccount = (id) =>{
    return{type: "idAccount", payload:id}
}