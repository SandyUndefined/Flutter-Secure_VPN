import React from 'react';
import './sideNavItems.scss';
import { Link } from 'react-router-dom';

const sideNavItem = ({ item }) => {
    return (
        <div>
            <Link className="sideNavItems" to={item.link}>
                <i class={item.icon}></i> {item.title}{' '}
            </Link>
        </div>
    );
};

export default sideNavItem;
