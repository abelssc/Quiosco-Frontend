import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const PrivateRoutes=({children,requiredRole})=>{
    const { user, loading } = useAuth();
    if(loading) return <div>Loading...</div>
    if(!user) return <Navigate to="/auth/login"/>
    // if middleware is admin and user is not admin navigate to home
    if(requiredRole && user.rol!==requiredRole) return <Navigate to="/"/>
    return children;
}
export default PrivateRoutes;