import React from "react";

const vpn = ({ v, selected, onChange }) => {
  return (
    <tr>
      <td>
        <input
          type="radio"
          name="vpn_selection"
          selectedVpn={selected === v.id}
          onChange={() => onChange(v.id)}
        />{" "}
        {v.name}
      </td>
      <td>{v.country}</td>
      <td>{v.username}</td>
      <td>{v.password}</td>
      <td className="script">click to copy</td>
    </tr>
  );
};

export default vpn;
