import { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";

import ButtonCustom from "../../components/Button";
import Tooltip from "@mui/material/Tooltip";
import ReactDOM from "react-dom";

function Filter({
  setGender,
  applyFilter = () => {},
  activeHeader = () => {},
  setFilterCondition = () => {},
  filterCondition = {
    gender: [],
    age: [],
    color: [],
    price: [],
    feature: [],
    type: [],
    size: [],
  },
}) {
  const filter = useRef(null);
  const colors = ["black", "white", "blue", "green"];
  const genders = ["men", "women", "unisex"];
  const ages = ["adult", "teenager", "kid"];
  const sizes = [36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42];
  const types = ["sneaker", "running", "hiking boots", "sandal", "dress shoes"];
  const prices = [
    {
      start: "0",
      end: "50",
    },
    {
      start: "50",
      end: "100",
    },
    {
      start: "100",
      end: "150",
    },
    {
      cost: "over",
    },
  ];
  const features = ["sale", "most"];

  const handleFilter = (e) => {
    const nameFilter = e.target.name;
    setGender(null);
    if (e.target.checked === true) {
      setFilterCondition((prev) => {
        return {
          ...prev,
          [nameFilter]: [...prev[nameFilter], e.target.value],
        };
      });
    } else {
      setFilterCondition((prev) => {
        return {
          ...prev,
          [nameFilter]: prev[nameFilter].filter(
            (item) => item !== e.target.value
          ),
        };
      });
    }
  };

  const handleFilterColor = (value = "") => {
    setFilterCondition((prev) => {
      if (prev.color.includes(value)) {
        return {
          ...prev,
          color: prev.color.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          color: [...prev.color, value],
        };
      }
    });
  };

  const handleFilterSize = (value = "") => {
    setFilterCondition((prev) => {
      if (prev.size.includes(value)) {
        return {
          ...prev,
          size: prev.size.filter((size) => size !== value),
        };
      } else {
        return {
          ...prev,
          size: [...prev.size, value],
        };
      }
    });
  };

  const clearCondition = (e) => {
    const isChecked = e.target.checked;

    const nameFilter = e.target.name;
    const checkboxes = ReactDOM.findDOMNode(filter?.current).querySelectorAll(
      `input[type="checkbox"]:checked[name="${nameFilter}"]`
    );
    if (isChecked) {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
    }
    setFilterCondition((prev) => {
      return {
        ...prev,
        [nameFilter]: [e.target.value],
      };
    });

    e.target.checked = isChecked;
  };

  const renderColor = () => {
    return colors.map((color) => {
      return (
        <Tooltip title={color} key={uuid()}>
          <div
            onClick={(e) => {
              handleFilterColor(color);
            }}
            className={`cursor-pointer hover:brightness-125 w-5 h-5 rounded-full p-4 col-span-1 bg-${color} bg-${color}-400`}
            style={{
              border: "1px solid transparent",
              borderColor: filterCondition.color.includes(color)
                ? "#fb923c"
                : "transparent",
              background: color,
            }}
          ></div>
        </Tooltip>
      );
    });
  };

  const renderSize = () => {
    return sizes.map((size) => {
      return (
        <div
          key={uuid()}
          onClick={(e) => {
            handleFilterSize(size);
          }}
          className={`text-center cursor-pointer hover:brightness-125 w-1/4 m-2 bg-slate-300 h-unset rounded-md font-barlow p-2 col-span-1 `}
          style={{
            border: "1px solid #ccc",
            borderColor: filterCondition.size.includes(size)
              ? "#fb923c"
              : "transparent",
          }}
        >
          {size}
        </div>
      );
    });
  };

  const filterValue = (conditionName, valueFilter) => {
    setFilterCondition((prev) => {
      return {
        ...prev,
        [conditionName]: prev[conditionName].filter(
          (item) => item !== valueFilter
        ),
      };
    });
  };

  const renderGender = () => {
    return genders.map((gender) => {
      return (
        <div className="start p-2 flex w-full" key={uuid()}>
          <input
            name={"gender"}
            id={`gender-${gender}`}
            type="checkbox"
            value={gender}
            checked={filterCondition.gender.includes(gender)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2 "
            onChange={(e) => {
              handleFilter(e);
            }}
          ></input>
          <label htmlFor={`gender-${gender}`} className="font-barlow">
            {gender.charAt(0).toUpperCase() + gender.slice(1)}
          </label>
        </div>
      );
    });
  };

  const renderType = () => {
    return types.map((type) => {
      return (
        <div className="start p-2 flex w-full" key={uuid()}>
          <input
            name={"type"}
            id={`type-${type}`}
            type="checkbox"
            value={type}
            checked={filterCondition.type.includes(type)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2 "
            onChange={(e) => {
              handleFilter(e);
            }}
          ></input>
          <label htmlFor={`type-${type}`} className="font-barlow">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        </div>
      );
    });
  };

  const renderPrice = () => {
    return prices.map((price) => {
      return (
        <div className="start p-2 flex w-full" key={uuid()}>
          <input
            name={"price"}
            type="checkbox"
            checked={filterCondition.price.includes(JSON.stringify(price))}
            onChange={(e) => {
              handleFilter(e);
            }}
            value={JSON.stringify(price)}
            id={`price-${price?.start}`}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2 "
          ></input>
          <label htmlFor={`price-${price?.start}`} className="font-barlow">
            {price?.start && "$ " + price.start + " - "}
            {price?.end && "$ " + price.end}
            {price?.cost && price.cost}
          </label>
        </div>
      );
    });
  };

  const renderAge = () => {
    return ages.map((age) => {
      return (
        <div className="start p-2 flex w-full" key={uuid()}>
          <input
            name={"age"}
            type="checkbox"
            value={age}
            checked={filterCondition.age.includes(age)}
            id={`age-${age}`}
            onChange={(e) => {
              handleFilter(e);
            }}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2 "
          ></input>
          <label htmlFor={`age-${age}`} className="font-barlow">
            {age.charAt(0).toUpperCase() + age.slice(1)}
          </label>
        </div>
      );
    });
  };

  const renderFeature = () => {
    return features.map((feature) => {
      return (
        <div className="start p-2 flex w-full" key={uuid()}>
          <input
            name={"feature"}
            type="checkbox"
            checked={filterCondition.feature.includes(feature)}
            onChange={(e) => {
              handleFilter(e);
            }}
            id={`feature-${feature}`}
            value={feature}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2 "
          ></input>
          <label htmlFor={`feature-${feature}`} className="font-barlow">
            {feature.charAt(0).toUpperCase() + feature.slice(1)}
          </label>
        </div>
      );
    });
  };

  return (
    <div
      className="transition-all  p-2 w-full custom-scrollbar text-md overflow-auto border-r-2 border-slate-400 border-solid"
      ref={filter}
      style={{
        maxHeight: activeHeader ? "calc(100vh - 4rem)" : "calc(100vh - 9rem)",
        transition: ".4s",
      }}
    >
      <div className=" w-full border-b-2 border-slate-400 border-solid">
        <div className="w-full font-barlow font-bold">Gender</div>
        <div className="w-full p-2">{renderGender()}</div>
      </div>
      <div className=" w-full border-b-2 border-slate-400 border-solid">
        <div className="w-full font-barlow font-bold">Type</div>
        <div className="w-full p-2">{renderType()}</div>
      </div>
      <div className=" w-full border-b-2 border-slate-400 border-solid">
        <div className="w-full font-barlow font-bold">Age</div>
        <div className="w-full p-2">{renderAge()}</div>
      </div>
      <div className=" w-full border-b-2 border-slate-400 border-solid">
        <div className="w-full font-barlow font-bold">Price</div>
        <div className="w-full p-2">{renderPrice()}</div>
      </div>
      <div className=" w-full border-b-2 border-slate-400 border-solid">
        <div className="w-full font-barlow font-bold">Color</div>
        <div className="w-full p-2 pt-5 pb-5">
          <div className="flex justify-between flex-wrap p-2">
            {renderColor()}
          </div>
        </div>
      </div>
      <div className=" w-full border-b-2 border-slate-400 border-solid">
        <div className="w-full font-barlow font-bold">Size</div>
        <div className="w-full p-2 pt-5 pb-5">
          <div className="flex justify-start flex-wrap p-2">{renderSize()}</div>
        </div>
      </div>
      <div className=" w-full border-b-2 border-slate-400 border-solid">
        <div className="w-full font-barlow font-bold">Feature</div>
        <div className="w-full p-2">{renderFeature()}</div>
      </div>
      <div className="mt-5 p-5 center">
        <ButtonCustom
          onClick={applyFilter}
          nameButton="Apply"
          style={{
            fontWeight: "bold",
            textAlign: "center",
            width: "70%",
            minWidth: "10rem",
            background: "var(--linear)",
            color: "#fff",
          }}
        />
      </div>
    </div>
  );
}

export default Filter;
