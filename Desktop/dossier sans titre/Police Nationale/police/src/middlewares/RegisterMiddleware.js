import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";



const RegisterMiddleware = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const register = () => {
    const userToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(true);
            return navigate('/');
        }
        else{
            setIsLoggedIn(true);
            return navigate('/Accueil')
        }
    }
    useEffect(() => {
        register();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default RegisterMiddleware;