import React from "react";
import "./userNav.scss";
import { useSelector } from "react-redux";

const UserNav = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="userNav">
      <div className="profile_pic">
        <img
          src="http://qvpn.pharid.com/images/user-avatar.jpg"
          alt="profile-pic"
          className="profile_img"
        ></img>
      </div>
      <div className="userNav_details">
        <p className="userNav-welcome">Welcome</p>
        <p className="userNav-user">{user.firstName}</p>
      </div>
    </div>
  );
};

export default UserNav;
