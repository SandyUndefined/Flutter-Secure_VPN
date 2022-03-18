import React from "react";
import "./confirmation.scss";
import CustomButton from "../button/customButton";
const confirmation = ({ children, onConfirm, onCancel }) => {
  return (
    <div className="confirmation">
      <div>{children}</div>
      <div className="confirmation-action">
        <CustomButton onClick={onConfirm}> Yes </CustomButton>
        <CustomButton onClick={onCancel}> No </CustomButton>
      </div>
    </div>
  );
};

export default confirmation;
