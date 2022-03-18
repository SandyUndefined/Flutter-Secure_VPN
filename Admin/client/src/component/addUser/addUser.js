import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../store/action';

const AddUser = ({ edit, user }) => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstname: edit && user ? user.firstname : '',
            lastname: edit && user ? user.lastname : '',
            password: '',
            email: edit && user ? user.email : ''
        }
    });

    const onSubmit = (data) => {
        dispatch(addUser(token, data));
    };
    return (
        <div className="addUser" onSubmit={handleSubmit(onSubmit)}>
            <div className="form">
                <form>
                    <div className="form-group">
                        <label for="firstname">First Name</label>
                        <input ref={register} className="input-group" id="firstname" name="firstname" placeholder="First Name" />
                    </div>

                    <div className="form-group">
                        <label for="lastname">Last Name</label>
                        <input ref={register} className="input-group" id="lastname" name="lastname" placeholder="Last Name" />
                    </div>

                    <div className="form-group">
                        <label for="password">Password</label>
                        <input ref={register} className="input-group" id="password" name="password" placeholder="Password" />
                    </div>

                    <div className="form-group">
                        <label for="email">Email</label>
                        <input ref={register} id="email" className="input-group" name="email" placeholder="Email Address" />
                    </div>
                    <button type="submit" className="submit-button">
                        Add User
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
