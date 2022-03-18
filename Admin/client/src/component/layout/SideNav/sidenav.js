import React from 'react';
import SideNavItem from './sideNavItem';
import UserNav from './userNav';

const items = [
    {
        title: 'Users',
        icon: 'fas fa-user',
        link: '/users'
    },
    {
        title: 'Vpns',
        icon: 'fas fa-user-secret',
        link: '/'
    },
    {
        title: 'Logout',
        icon: 'fas fa-sign-out-alt',
        link: '/logout'
    }
];

const sideNav = () => {
    return (
        <>
            <UserNav />
            {items.map((item) => (
                <SideNavItem key={item.title} item={item} />
            ))}
        </>
    );
};

export default sideNav;
