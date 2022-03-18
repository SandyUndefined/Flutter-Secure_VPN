import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from '../../store/action';
import './users.scss';
import CustomButton from '../../component/button/customButton';
import Modal from '../../component/modal/modal';
import AddUser from '../../component/addUser/addUser';

const Users = () => {
    const { token, user, users } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState(null);
    const toggleSelectedUser = (id) => {
        setSelectedUser(id);
    };
    const [addUser, setAddUser] = useState(false);
    const toggleAddUser = () => {
        setAddUser(!addUser);
    };
    useEffect(() => {
        dispatch(fetchUser(token));
    }, [dispatch]);
    return (
        <div className="users">
            {user.role === 'admin' && (
                <>
                    <Modal hide={!addUser} onClose={toggleAddUser}>
                        <AddUser></AddUser>
                    </Modal>
                    <div className="user-action">
                        <CustomButton onClick={toggleAddUser}> Add User </CustomButton>
                        <div className="right">
                            <CustomButton type="secondary"> Edit User </CustomButton>
                            <CustomButton type="danger"> Delete User </CustomButton>
                        </div>
                    </div>
                </>
            )}
            <div className="table">
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((e) => (
                            <tr key={e.id}>
                                <td>
                                    <input type="radio" checked={e.id === selectedUser} onChange={() => toggleSelectedUser(e.id)} /> {e.firstName}
                                </td>
                                <td>{e.lastName}</td>
                                <td>{e.email}</td>
                                <td>{e.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
