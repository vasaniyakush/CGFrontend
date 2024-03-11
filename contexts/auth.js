
import React,{createContext, useState, useContext, useEffect} from 'react'
import Cookies from 'js-cookie'
import Router, {useRouter} from 'next/router'

import api from '@/api'
import LoginForm from '@/components/LoginForm';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [openTab, setOpenTab] = useState("none")

    useEffect(()=>{
        async function loadUserFromCookies(){
            const token = Cookies.get('token')
            if(token){
                try{
                    console.log("check token",token);
                    console.log("Got a token in the cookies, let's see if it is valid");
                    api.defaults.headers.Authorization = `Bearer ${token}`
                    const {data: user} = await api.get('admin/me')
                    console.log("got user",user);
                    setUser(user)
                }
                catch(err){
                    setUser(null)
                }
            }
            setLoading(false)
        }

        loadUserFromCookies()
    },[])

    const login = async (email, password) => {
        try {
            const response = await api.post('admin/login', { username: email, password });
    
            if (response && response.data && response.data.token) {
                const token = response.data.token;
                console.log("Got token", token);
                Cookies.set('token', token, { expires: 60 });
                api.defaults.headers.Authorization = `Bearer ${token}`;
                const { data: user } = await api.get('admin/me');
                setUser(user);
                console.log("Got user", user);
                return true;
            } else {
                console.log("Login failed. No token found in response.");
                return false;
            }
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    }

    const logout = () => {
        Cookies.remove('token')
        setUser(null)
        delete api.defaults.headers.Authorization
        // window.location.pathname = '/login'
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout,openTab,setOpenTab }}>
            {children}
        </AuthContext.Provider>
    )
}

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading || (!isAuthenticated && window.location.pathname !== '/login')){
      return <LoginForm />; 
    }
    return children;
  };
export const useAuth = () => useContext(AuthContext)