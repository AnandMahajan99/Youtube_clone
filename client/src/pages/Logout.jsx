import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import apis from '../api'

function Logout() {

    const history = useHistory();

    useEffect(() => {
        apis.logout().then(res => {
            if(res.data.status === "success") {
                window.alert("User Logged Out");
            } else {
                console.log(res.data.data);
            }  
            // window.location = '/login';
            history.push('/login');
        }).catch(err => console.log(err))
    }, [history])

    return (
        <div>
            User Logged out
        </div>
    )
}

export default Logout
