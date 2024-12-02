import React from "react";
import CustomCell from "./CustomCell";

const CustomRow = ({ data, header, rowIndex }) => {
  return (
    <>
      <tr
        className={`border-b border-gray-200 text-left w-full ${rowIndex % 2 === 0 ? "bg-white" : "bg-slate-200"
          }`}
        key={rowIndex}
      >
        {data &&
          header?.map((key, colIndex) => {
            return (
              <CustomCell
                key={`${rowIndex}${colIndex}`}
                data={key.render ? key.render(data[key.key], data) : data[key.key]}
              ></CustomCell>
            );
          })}
      </tr>
    </>
  );
};

export default CustomRow;
