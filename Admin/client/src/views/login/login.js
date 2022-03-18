import React from 'react';
import { useForm } from 'react-hook-form';
import './login.scss';
import { login, clearErrorUser } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

export default function Login() {
    const { addToast } = useToasts();
    const { error, success } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const onsubmit = (data) => {
        dispatch(login(data.email, data.password));
    };
    if (error) {
        console.log(error);
        addToast(error, { appearance: 'error' });
        dispatch(clearErrorUser());
    } else if (success) {
        addToast('Login Success', { appearance: 'success' });
        dispatch(clearErrorUser());
    }

    return (
        <div className="login" onSubmit={handleSubmit(onsubmit)}>
            <div className="login-container form">
                <form>
                    <div className="form-header">Login Form</div>
                    <div className="form-group">
                        <div>
                            <label for="email">Email</label>
                            <input
                                className="input-group"
                                type="email"
                                name="email"
                                id="email"
                                ref={register({
                                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                                })}
                                placeholder="something@something.com"
                            ></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="password">Password</label>
                        <input className="input-group" type="password" name="password" id="password" ref={register} placeholder="Password"></input>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="submit-button">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
