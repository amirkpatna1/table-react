import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CustomTable from "../core/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import {
  errorSelector,
  gainersSelector,
  loadingSelector,
  losersSelecter,
} from "../../store/selectors/stocksSelector";
import { fetchStocksData } from "../../store/reducers/stocksSlice";
import {headers} from "../../data/data.json";

const IndexTable = () => {
  const dispatch = useDispatch();
  const topGainers = useSelector(gainersSelector);
  const topLosers = useSelector(losersSelecter);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);

  useEffect(() => {
    dispatch(fetchStocksData());
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error: {error}</h1>;
  }

  // for(let i = 0; i < topGainers.length; i += 1) {
  //   const val = topGainers[i].ticker;
  //   topGainers[i].ticker = <Link
  //     to={`/company/${val}`} className="text-blue-500 hover:text-blue-700">
  //     {val}
  //   </Link>
  // }

  const renderActions = (item, index) => (
    <button onClick={() => <Link
          to={`/company/${val}`} className="text-blue-500 hover:text-blue-700">
          {val}
        </Link>}>
      {item}
    </button>
  );

  for(let i = 0; i < headers.length; i += 1) {
    if(headers[i].key == 'ticker') {
      headers[i].render = (key, data) => (
        <Link
          to={`/company/${key}`} className="text-blue-500 hover:text-blue-700">
          {key}
        </Link>
      )
      break;
    }
  }

  return (
    <div>
      <h2 className="text-lg font-bold py-3">Top Gainers</h2>
      <CustomTable data={topGainers} header={headers} />
      <h2 className="text-lg font-bold py-3">Top Loosers</h2>
      <CustomTable data={topLosers} header={headers} />
    </div>
  );
};

export default IndexTable;
