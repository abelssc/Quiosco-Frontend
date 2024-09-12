import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const PublicRoutes = ({children}) => {
  const { user, loading, error } = useAuth();
    if(loading) return <div className="bg-red-600">Loading...</div>
    if(user) return <Navigate to="/"/>
    return children;
}
export default PublicRoutes;