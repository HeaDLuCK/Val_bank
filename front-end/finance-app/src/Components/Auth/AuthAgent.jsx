import { Outlet, Navigate, useLocation } from "react-router-dom"
import Header from "../Application/Agent/features/Header";

const AuthAgent = () => {
    const location = useLocation()
    return (
        localStorage.getItem('role') === "agent" ?
            <>
                <div className='container'>
                    <Header />
                    <Outlet />
                </div>
            </> :
            <Navigate to={"/404"} state={{ from: location }} replace />
    )

}
export default AuthAgent;