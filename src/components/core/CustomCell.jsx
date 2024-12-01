import React from "react";
import { Link } from "react-router-dom";

const CustomCell = ({ data }) => {
  return (
    <td className="px-4 py-2 border border-gray-300 truncate w-1/3">
      {data}
    </td>
  );
};

export default CustomCell;
