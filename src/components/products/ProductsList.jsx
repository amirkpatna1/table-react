import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  hasMoreSelector,
  limitSelector,
  loadingSelector,
  pageSelector,
  productSelector
} from "../../store/selectors/productSelector";
import {categorySelector} from "../../store/selectors/productCategorySelector";
import {
  fetchProductsData,
  setPage,
  fetchCategoryProducts,
} from "../../store/reducers/productSlice";
import { fetchCategoryData } from "../../store/reducers/productCategoriesSlice";
import CustomTable from "../core/CustomTable";
import GenericModal from "../core/GenericModal";
import { useSearchParams } from "react-router-dom";
import { ProductHeaders } from "../../data/data.json";

const ProductsList = () => {
  const dispatch = useDispatch();

  const categories = useSelector(categorySelector);

  const [searchParams, setSearchParams] = useSearchParams();
  const products = useSelector(productSelector);
  const page = useSelector(pageSelector);
  const limit = useSelector(limitSelector);
  const hasMore = useSelector(hasMoreSelector);
  const loading = useSelector(loadingSelector);

  const category = searchParams.get("category");
  const observer = useRef(null);
  const lastElementRef = useRef();

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, []);

  useEffect(() => {
    if (!category)
      dispatch(fetchProductsData({ page, limit, skip: (page - 1) * limit }));
  }, [category, page, hasMore]);

  useEffect(() => {
    if (category) {
      dispatch(fetchCategoryProducts(category));
    }
  }, [category]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loading) {
          dispatch(setPage(page + 1));
        }
      },
      { threshold: 1.0 }
    );

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, loading, page]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  // const inputs = [
  //   { label: 'Owner Name', type: 'text', key: 'ownerName', required: true },
  //   { label: 'Card Type', type: 'select', key: 'cardType', options: ['Visa', 'MasterCard', 'American Express'], required: true },
  //   { label: 'Card Number', type: 'text', key: 'cardNumber', required: true },
  //   { label: 'Expiry Date', type: 'date', key: 'expiryDate', required: true },
  //   { label: 'CVC', type: 'number', key: 'cvc', required: true }
  // ];

  const inputs = [
    {
      "key": "title",
      "label": "Title",
      type: 'text'
    },
    {
      "key": "category",
      "label": "Category",
      type: 'select',
      options: categories?.map((obj) => obj.slug) || []
    },
    {
      "key": "price",
      "label": "Price",
      type: 'number'
    },
    {
      "key": "rating",
      "label": "Rating",
      type: 'number'
    },
    {
      "key": "stock",
      "label": "Stock",
      type: 'number'
    }
  ]
  

  for (let i = 0; i < ProductHeaders.length; i += 1) {
    if (ProductHeaders[i].key == 'ticker') {
      ProductHeaders[i].render = (key) => (
        <Link
          to={`/company/${key}`} className="text-blue-500 hover:text-blue-700">
          {key}
        </Link>
      )
      break;
    }
  }

  const handleClick = (data) => {
    console.log("Amir Khan ", data);
    setModalData(data)
    setModalOpen(true);
  };

  const handleSubmit = (data) => {
    console.log("Data is : ", data);
    setModalOpen(false);
  }

  const headersSet = new Set(ProductHeaders)
  headersSet.add({ key: "action", label: "Action", render: (key, data) => <button type="button" className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={() => handleClick(data)}>Update</button> })

  return (
    <div className="p-3 h-1/3 overflow-auto">
      {products.length > 0 ? (
        <CustomTable data={products} header={[...headersSet]} />
      ) : (
        <div>No products found.</div>
      )}
      {hasMore && (
        <div
          ref={lastElementRef}
          style={{ height: "20px", backgroundColor: "transparent" }}
        >
          Loading more...
        </div>
      )}
      <GenericModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        inputs={inputs}
        onSubmit={handleSubmit}
        currentData={modalData}
        modalHeading={"Change Product Details"}
      />
    </div>
  );
};

export default ProductsList;
