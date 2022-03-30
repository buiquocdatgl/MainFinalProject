import React, { useState, useEffect } from 'react'
import './login.css'
import OAuth2Login from "react-simple-oauth2-login";
import { useDispatch } from "react-redux";
import {
    authorizationUrl,
    clientId,
    redirectUri,
    serverUrl,
    oauthServerUrl
} from './setting';
import ErrorAlert from './ErrorAler';
import { Link } from 'react-router-dom';

function Login({ history, na}) {

    const initialSate = {
        id: 0,
        name: '',
        email: '',
        role: '',
        first_name: '',
        last_name: '',
        avatar: '',
    }
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(initialSate);
    const [error, setError] = useState(null);

    const onSuccess = ({ code }) => fetch(`${serverUrl}/api/auth/oauth/token`, {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: {
            'content-type': 'application/json',

        },
    })
        .then(res => res.json())
        .then((data) => {
            setAccessToken(data._id);
            return data._id;
        })
        .then(id => fetch(`${serverUrl}/api/users/me/${id}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        }))
        .then(res => res.json())
        .then((data) => {
            setUser(data)

        })
        .catch(setError);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: "LOGGED_IN_USER",
            payload: {
                id: user.userId,
                name: user.name,
                email: user.email,
                role: user.role,
                first_name: user.firstName,
                last_name: user.lastName,
                avatar: user.avatar,
            }
        })
        if(user.id !== 0){
            history.push('/dash');
        }
        
    }, [dispatch , user])
    
    console.log(user)

    return (
        <div className="box">
            <button
                type="submit"
                className="bg-blue-400 hover:bg-blue-600 flex gap-1 sm:gap-2 items-center h-fit rounded-md font-semibold px-[100px] py-[10px] sm:px-30 sm:py-3 w-fit"
            
            >
                <OAuth2Login
                    id="auth-code-login-btn"
                    authorizationUrl={authorizationUrl}
                    clientId={clientId}
                    redirectUri={redirectUri}
                    responseType="code"
                    scope={'users:me'}
                    buttonText="Login with GAE App"
                    onSuccess={onSuccess}
                    onFailure={setError}
                />
            </button>
            <div className="stars">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
            </div>
            <div className="stars1">
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
            </div>
        </div>
    )
}

export default Login