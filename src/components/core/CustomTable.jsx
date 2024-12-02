import React, { useEffect } from "react";
import CustomRow from "./CustomRow";
import CustomHeader from "./CustomHeader";
// import header from "../../data/data.json";
const CustomTable = ({ data, header }) => {
  return (
    <>
      <table>
        <CustomHeader header={header} />
        <tbody>
          {data?.map((currRow, rowIndex) => (<CustomRow key={rowIndex} data={currRow} header={header} rowIndex={rowIndex} />))}
        </tbody>
      </table>
    </>
  );
};

export default CustomTable;
