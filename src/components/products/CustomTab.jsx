import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categorySelector,
  errorselector,
  loadingSelector,
} from "../../store/selectors/productCategorySelector";
import GenericModal from "../core/GenericModal";
import { fetchCategoryData } from "../../store/reducers/productCategoriesSlice";
import { GiLipstick } from "react-icons/gi";
import { TbPerfume } from "react-icons/tb";
import { MdCancel, MdOutlineTableRestaurant } from "react-icons/md";
import { FaCarrot } from "react-icons/fa";
import { IoMdColorWand } from "react-icons/io";
import { setInitialProductState, addNewProductsData } from "../../store/reducers/productSlice";
import { useSearchParams } from "react-router-dom";

const buttonConfig = {
  beauty: { component: <GiLipstick size={20} />, color: "bg-pink-400" },
  fragrances: { component: <TbPerfume size={20} />, color: "bg-teal-400" },
  furniture: {
    component: <MdOutlineTableRestaurant size={20} />,
    color: "bg-amber-400",
  },
  groceries: {
    component: <FaCarrot size={20} />,
    color: "bg-green-400",
  },
  "home-decoration": {
    component: <IoMdColorWand size={20} />,
    color: "bg-purple-400",
  },
};

const CustomTab = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categorySelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorselector);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, []);

  const handleCategorySelect = (categorySlug) => {
    setSearchParams({ category: categorySlug });
    dispatch(setInitialProductState());
  };

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
      options: categories.map((obj) => obj.slug)
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

  const currentCategory = searchParams.get("category");

  function resetCategory() {
    setSearchParams({});
    dispatch(setInitialProductState());
  }

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleSubmit = (data) => {
    dispatch(addNewProductsData(data));
    setModalOpen(false);
  }

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-row gap-3">
          {categories?.slice(0, 5).map((item, index) => {
            const { component: Icon, color } = buttonConfig[item.slug] || {};
            const isActive = currentCategory === item.slug;
            return (
              <button
                key={index}
                className={`list-none gap-1 items-center p-2 rounded-lg text-l font-semibold cursor-pointer flex flex-row ${color} ${isActive ? "bg-blue-500" : ""
                  }`}
                onClick={() => handleCategorySelect(item.slug)}
              >
                {Icon}
                {item.slug}
              </button>
            );
          })}
          <button
            className="list-none gap-1 items-center p-2 rounded-lg text-l font-semibold cursor-pointer flex bg-red-400 hover:bg-red-600"
            onClick={resetCategory}
          >
            <MdCancel size={20} />
            Cancel
          </button>
        </div>
        <div>
          <button type="button" onClick={(data) => handleClick(data)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add Product
            <svg className="ml-2 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 1v10m5-5H1" />
            </svg>
          </button>
        </div>
        <GenericModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          inputs={inputs}
          onSubmit={handleSubmit}
          currentData={modalData}
          modalHeading={"Add Product Details"}
        />
      </div>
    </>
  );
};

export default CustomTab;
