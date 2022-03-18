import React, { useEffect, useState } from 'react';
import './vpns.scss';
import CustomButton from '../../component/button/customButton';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVpn, deleteVpn, clearErrorVpn } from '../../store/action';
import Modal from '../../component/modal/modal';
import AddVpn from '../../component/addVpn/addVpn';
import Confirmation from '../../component/confirmation/confirmation';
import { useToasts } from 'react-toast-notifications';
import Vpn from './vpn';

const Vpns = () => {
    const { addToast } = useToasts();

    const { token, user } = useSelector((state) => state.auth);
    const { loading, vpns, error, success } = useSelector((state) => state.vpn);
    const dispatch = useDispatch();
    const [addVpn, setAddVpn] = useState(true);
    const [selectedVpn, setSelectedVpn] = useState(null);

    const [editPage, setEditPage] = useState(false);
    const [confirmationBox, setConfirmationBox] = useState(true);
    const toggleSelected = (newid) => {
        setSelectedVpn(newid);
    };
    const toggleAddVpn = () => {
        setAddVpn(!addVpn);
    };
    const toggleConfirmationBox = () => {
        setConfirmationBox(!confirmationBox);
    };
    const onDelete = () => {
        if (selectedVpn !== null) {
            dispatch(deleteVpn(token, selectedVpn));
            setSelectedVpn(null);
        }
        toggleConfirmationBox();
    };
    if (error) {
        addToast(error, { appearance: 'error' });
        dispatch(clearErrorVpn());
    } else if (success) {
        toggleAddVpn();
        addToast(success, { appearance: 'success' });
        dispatch(clearErrorVpn());
    }
    useEffect(() => {
        dispatch(fetchVpn());
    }, [dispatch]);

    return (
        <div className="vpns">
            {loading ? (
                <div>Loading ...</div>
            ) : (
                <>
                    {user.role === 'admin' && (
                        <>
                            <Modal hide={confirmationBox} onClose={toggleConfirmationBox}>
                                <Confirmation onCancel={toggleConfirmationBox} onConfirm={onDelete}>
                                    Want to delete selected Vpn ?
                                </Confirmation>
                            </Modal>
                            <Modal hide={addVpn} onClose={toggleAddVpn}>
                                {addVpn ? '' : <AddVpn onClose={toggleAddVpn} edit={editPage} vpn={vpns.filter((x) => x.id === selectedVpn)[0]} />}
                            </Modal>
                            <div className="vpns-header">
                                <CustomButton
                                    onClick={() => {
                                        setEditPage(false);
                                        toggleAddVpn();
                                    }}
                                >
                                    {' '}
                                    Add Vpn{' '}
                                </CustomButton>
                                {selectedVpn !== null ? (
                                    <div className="right">
                                        <CustomButton
                                            type="secondary"
                                            onClick={() => {
                                                setEditPage(true);
                                                toggleAddVpn();
                                            }}
                                        >
                                            Edit Vpn
                                        </CustomButton>
                                        <CustomButton type="danger" onClick={toggleConfirmationBox}>
                                            {' '}
                                            Delete Vpn{' '}
                                        </CustomButton>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                        </>
                    )}
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Country</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Script</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vpns.map((v) => (
                                    <Vpn v={v} key={v.id} selected={selectedVpn} onChange={toggleSelected} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Vpns;
