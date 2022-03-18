import React, { useEffect } from 'react';
import './App.css';
import './scss/app.scss';
import Login from './views/login/login';
import { Route } from 'react-router-dom';
import Vpn from './views/vpns/vpns';
import Layout from './component/layout/layout';
import { useSelector, useDispatch } from 'react-redux';
import { autoLogin } from './store/action';
import Logout from './views/login/logout';
import Users from './views/users/users';
import { ToastProvider } from 'react-toast-notifications';

function App() {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(autoLogin(token));
    }, [dispatch, token]);
    return (
        <ToastProvider autoDismiss={true} autoDismissTimeout={2000}>
            <div className="App">
                {token ? (
                    // loading ? (
                    <Layout>
                        <Route path="/logout" component={Logout} />
                        <Route path="/users" component={Users} />
                        <Route path="/" exact component={Vpn} />
                    </Layout>
                ) : (
                    <Route path="/" component={Login} />
                )}
            </div>
        </ToastProvider>
    );
}

export default App;
