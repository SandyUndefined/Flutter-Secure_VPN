import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/action';
import { Redirect } from 'react-router-dom';

const Logout = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);
    return (
        <div>
            <Redirect to="/" />
        </div>
    );
};

export default Logout;
