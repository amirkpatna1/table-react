import React from "react";
const CustomHeader = ({ header }) => {
  return (
    <>
        <thead>
          <tr>
            {header?.map((val, index) => (
              <th
                className="px-3 py-2 bg-slate-300 border border-slate-100"
                key={index}
              >
                {val.label}
              </th>
            ))}
          </tr>
        </thead>
    </>
  );
};

export default CustomHeader;
