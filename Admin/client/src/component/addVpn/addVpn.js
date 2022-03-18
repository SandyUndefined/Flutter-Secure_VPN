import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, addVpn, updateVpn } from '../../store/action';
import { useForm } from 'react-hook-form';
import Loader from '../../component/loader/loader';

const AddVpn = ({ vpn, edit, onClose }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: edit && vpn ? vpn.name : '',
            username: edit && vpn ? vpn.username : '',
            password: edit && vpn ? vpn.password : '',
            country: edit && vpn ? vpn.country : '',
            configScriptTCP: edit && vpn ? vpn.configScriptTCP : '',
            price: edit && vpn ? (vpn.paid ? 'paid' : 'free') : ''
        }
    });

    const { countries, countriesLoading, countriesError, vpnLoading, success } = useSelector((state) => state.vpn);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    const onSubmitForm = (data) => {
        if (!edit) {
            dispatch(addVpn(token, data));
        } else {
            dispatch(updateVpn(token, vpn.id, data));
        }
    };

    if (success) {
        console.log('=====================================');
    }
    return (
        <div className="addVpn">
            {countriesLoading ? (
                <div>
                    {' '}
                    <Loader />
                </div>
            ) : countriesError ? (
                <div> {countriesError}</div>
            ) : (
                <div className="form">
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <div className="form-group">
                            <label for="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="name" className="input-group" ref={register}></input>
                        </div>

                        <div className="form-group">
                            <label for="country">Select</label>
                            <select name="country" id="country" className="input-group" ref={register}>
                                {countries.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="username">UserName</label>
                            <input className="input-group" type="text" name="username" id="username" placeholder="UserName" ref={register}></input>
                        </div>

                        <div className="form-group">
                            <label for="password">Password</label>
                            <input className="input-group" type="text" name="password" id="password" placeholder="Password" ref={register}></input>
                        </div>

                        <div className="form-group">
                            <label for="configScriptTCP">TCP/UDP Script</label>
                            <textarea ref={register} className="input-group" name="configScriptTCP"></textarea>
                        </div>
                        <div className="form-group">
                            <input ref={register} type="radio" id="paid" name="price" value="paid"></input>
                            <label for="paid">Paid</label>
                            <br />

                            <br />
                            <input ref={register} type="radio" id="free" name="price" value="free"></input>
                            <label for="free">Free</label>
                        </div>

                        <div className="form-group">
                            {vpnLoading ? (
                                <Loader />
                            ) : (
                                <button type="submit" className="submit-button">
                                    {edit ? 'Edit Vpn' : 'Add Vpn'}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
export default AddVpn;
