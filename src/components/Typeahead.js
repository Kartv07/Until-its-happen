"use client";
import { useState } from "react";

export default function Typeahead({
  options,
  addedNewCategory,
  setAddedNewCategory,
  setSelected,
  defaultValue = {},
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = options.filter(({ title }) =>
      title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredOptions(filtered);
    setShowDropdown(true);
    setSelectedIndex(-1);
    setAddedNewCategory(false);
  };

  // Handle option selection
  const handleSelect = (option) => {
    setInputValue(option.title);
    setSelected(option);
    setShowDropdown(false);
  };

  // Handle new option addition
  const handleAddNew = () => {
    if (inputValue.trim() && !options.some(({ title }) => title === inputValue.trim())) {
      setSelected({title: inputValue.trim(), slug: inputValue.trim().toLowerCase().replace(/\s+/g, "-") });
    }
    setAddedNewCategory && setAddedNewCategory(true);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={defaultValue?.title || inputValue}
        onClick={()=>{setShowDropdown(true); setFilteredOptions(options)}}
        onChange={handleChange}
        placeholder="Type or add new..."
        className="w-full px-4 py-2 border border-[#1d1e24] rounded-lg focus:outline-none focus:ring-2"
      />

      {showDropdown && (
        <div className="absolute w-full bg-[#141414] rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option._id}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 cursor-pointer hover:bg-gradient-to-r font-semibold hover:to-white hover:from-[#53e1e8] hover:text-transparent hover:bg-clip-text ${
                  selectedIndex === index ? "bg-gray-700" : ""
                }`}
              >
                {option.title}
              </div>
            ))
          ) : (
            !addedNewCategory && (
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gradient-to-r font-semibold hover:to-white hover:from-[#53e1e8] hover:text-transparent hover:bg-clip-text"
                onClick={() => handleAddNew()}
              >
                Add "{inputValue}"
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
