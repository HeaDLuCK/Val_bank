import { Outlet, Navigate, useLocation } from "react-router-dom"
import Header from "../Application/Admin/features/Header"
import SideBar from "../Application/Admin/features/SideBar"
import './style.css'
const AuthAdmin = () => {
    const location = useLocation()
    return (
        localStorage.getItem('role') === "admin" ?
            <>

                <div className='container'>
                    <Header />
                    <div className="helper">
                        <SideBar />
                        <Outlet />
                    </div>
                </div>
            </>
            :
            <Navigate to={"/404"} state={{ from: location }} replace />
    )

}
export default AuthAdmin;