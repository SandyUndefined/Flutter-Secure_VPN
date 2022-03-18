import React from 'react';
import './layout.scss';
import SideNav from './SideNav/sidenav';

const layout = ({ children }) => {
    return (
        <div className="layout">
            <div className="layout_header"></div>
            <div className="layout_menu">
                <div>
                    <SideNav></SideNav>
                </div>
            </div>
            <div className="layout_body">{children}</div>
            <div className="layout_footer"></div>
        </div>
    );
};

export default layout;
