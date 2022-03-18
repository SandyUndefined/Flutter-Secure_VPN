import React from "react";
import "./modal.scss";

const modal = ({ children, hide, onClose }) => {
  var modalClass = hide ? "hide" : "";
  return (
    <div className={"modal " + modalClass}>
      <div className="modal-content">
        <span class="close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default modal;
