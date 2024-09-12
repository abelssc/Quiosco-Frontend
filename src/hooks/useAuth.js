import { useEffect, useState } from "react";
import clientAxios from "../config/axios";

export const useAuth=()=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setLoading(false);
            return;
        }
        
        const fetchUser = async () => {
            try {
                // wait 2 seconds
                // await new Promise(resolve => setTimeout(resolve, 2000));
                const response = await clientAxios.get('/api/user', {   
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.log(error);
                setError(error);
                // setUser(null);
                // localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return { user, loading, error };
}