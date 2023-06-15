import { Outlet, Navigate, useLocation } from "react-router-dom"

const Auth = () => {
    const location = useLocation()
    return (
        localStorage.getItem('token') ?
            <Outlet /> :
            <Navigate to={"/login"} state={{ from: location }} replace />
    )

}
export default Auth;