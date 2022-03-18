import React from 'react';
import './customButton.scss';

const customButton = ({ children, onClick, type }) => {
    var btnClass = `customButton ${type}`;
    return (
        <button onClick={onClick} className={btnClass}>
            {children}
        </button>
    );
};

export default customButton;
