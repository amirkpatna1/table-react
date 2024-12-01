import React, { useState } from 'react';

const GenericModal = ({ isOpen, onClose, inputs, onSubmit, currentData }) => {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    onSubmit(data);
  };

  const renderInput = (input) => {
    const [inputValue, setInputValue] = useState((currentData && currentData[input.key]) || '');
    switch (input.type) {
      case 'select':
        return (
          <select
            name={input.key}
            onChange={(event) => setInputValue(event.target.value)}
            value={inputValue}
            required={input.required}
            className="border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 rounded-md shadow-sm p-2 text-sm"
          >
            {input.options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'text':
      case 'number':
      case 'date':
        return (
          <input
            type={input.type}
            name={input.key}
            onChange={(event) => setInputValue(event.target.value)}
            value={inputValue}
            required={input.required}
            placeholder={input.placeholder || ''}
            disabled={input.disabled}
            className="border border-gray-300 focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50 rounded-md shadow-sm p-2 text-sm"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Enter Billing Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none text-xl">
            &#10005;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {inputs.map((input, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-left font-bold text-gray-900">{input.label}</label>
              {renderInput(input)}
            </div>
          ))}
          <div className="flex justify-center space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm bg-gray-300 rounded-md hover:bg-gray-400 text-gray-800">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenericModal;




{/* <label className="mb-2 text-sm font-medium text-left font-bold text-gray-900">{input.label}</label> */}