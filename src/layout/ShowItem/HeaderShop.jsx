import { useEffect, useState } from "react";
import ButtonCustom from "../../components/Button";
import filter from "../../assets/icon/Filter.svg";

import { IoIosArrowDown } from "react-icons/io";

import { v4 as uuid } from "uuid";
import MenuCustom from "../../components/MenuCustom";

function HeaderShop({
  brand,
  setBrand,
  sort = "",
  setShowFilter = () => {},
  showFilter,
  activeHeader,
  setActiveHeader = () => {},
  setSort,
  setFilterCondition = () => {},
  filterCondition,
}) {
  const BrandName = [
    {
      name: "All",
      icon: null,
      action: () => {
        setFilterCondition((prev) => {
          return {
            ...prev,
            brand: "all",
          };
        });
      },
    },
    {
      name: "Bitis",
      icon: null,
      action: () => {
        setFilterCondition((prev) => {
          return {
            ...prev,
            brand: "bitis",
          };
        });
      },
    },
    {
      name: "Nike",
      icon: null,
      action: () => {
        setFilterCondition((prev) => {
          return {
            ...prev,
            brand: "nike",
          };
        });
      },
    },
    {
      name: "Adidas",
      icon: null,
      action: () => {
        setFilterCondition((prev) => {
          return {
            ...prev,
            brand: "adidas",
          };
        });
      },
    },
    {
      name: "Puma",
      icon: null,
      action: () => {
        setFilterCondition((prev) => {
          return {
            ...prev,
            brand: "puma",
          };
        });
      },
    },
  ];

  const [activeMenuSort, setActiveMenuSort] = useState(false);
  const sorts = [
    {
      id: uuid(),
      icon: null,
      name: "Newest",
      action: () => {
        setActiveMenuSort(false);
        setSort("newest");
      },
    },
    {
      id: uuid(),
      icon: null,
      name: "Pice: high-low",
      action: () => {
        setActiveMenuSort(false);
        setSort("price:high-low");
      },
    },
    {
      id: uuid(),
      icon: null,
      name: "Pice: low-high",
      action: () => {
        setActiveMenuSort(false);
        setSort("price:low-high");
      },
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setActiveHeader(true);
      } else {
        setActiveHeader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderBrand = () => {
    return BrandName.map((brandN, index) => {
      return (
        <ButtonCustom
          key={uuid()}
          hoverBg="rgba(0,0,0,.1)"
          nameButton={brandN.name}
          style={{
            padding: ".2rem 2rem",
            marginRight: "1rem",
            color: "black",
            fontSize: "1rem",
            border: "1px solid transparent",
            borderColor:
              filterCondition.brand?.toLowerCase() === brandN.name.toLowerCase()
                ? "#1976d2"
                : "transparent",

            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          sx={{
            textTransform: "capitalize",
          }}
          onClick={brandN.action}
        />
      );
    });
  };

  return (
    <div
      className={`w-full flex justify-between items-center transition-all  ${
        activeHeader ? "fixed top-0 left-0 right-0" : ""
      }`}
      style={{
        zIndex: "103",
        padding: ".5rem",
        transition: ".4s",
        backdropFilter: "blur(1rem)",
        borderBottom: "1px solid #94a3b8",
        background: activeHeader ? "rgba(255, 255, 255, 0.1)" : "transparent",
      }}
    >
      <div className="">{renderBrand()}</div>
      <div className="end flex">
        <ButtonCustom
          nameButton={showFilter ? "Filters" : "Hide Filters"}
          hoverBg="rgba(0,0,0,.1)"
          style={{
            marginLeft: "1rem",
            fontSize: "1rem",
            width: "unset",
            marginRight: "1rem",
          }}
          sx={{
            textTransform: "capitalize",
          }}
          iconRight={<img src={filter} className="w-5 ml-2"></img>}
          onClick={() => {
            setShowFilter(!showFilter);
          }}
        />
        <div
          className="items-center justify-center flex w-15 p-4 rounded-md hover:bg-blur"
          onClick={(e) => {
            setActiveMenuSort(e.target);
          }}
        >
          <button className=" font-barlow text-md ">
            Sort by {sort && " : " + sort}
          </button>
          <IoIosArrowDown className="text-xl " />
        </div>
        <MenuCustom
          sx={{
            fontSize: "1.25rem",
          }}
          data={sorts}
          activeMenu={activeMenuSort}
          setActiveMenu={setActiveMenuSort}
        ></MenuCustom>
      </div>
    </div>
  );
}

export default HeaderShop;
