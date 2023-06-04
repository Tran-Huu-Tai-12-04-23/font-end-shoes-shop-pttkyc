import { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";

import Header from "../../components/Header";
import HeaderShop from "./HeaderShop";
import Filter from "./Filter";

import PaginationCustom from "../../components/PaginationCustom";
import GridItem from "../../components/GridItem";
import GridSkeleton from "../../components/GridSkeleton";

import Util from "../../util";
import Services from "../../Services";
import { useContextStore } from "../../Store";
import { memo } from "react";

function ShowItem() {
  const { gender, setGender } = useContextStore();
  const [showFilter, setShowFilter] = useState(true);
  const [activeHeader, setActiveHeader] = useState(false);
  const [pageActive, setPageActive] = useState(1);
  const [loadItem, setLoadItem] = useState(true);
  const [items, setItems] = useState([]);
  const [itemsApi, setItemsApi] = useState([]);
  const [brand, setBrand] = useState("all");

  const [filterCondition, setFilterCondition] = useState({
    gender: [],
    age: [],
    color: [],
    price: [],
    feature: [],
    type: [],
    size: [],
    brand: "all",
  });

  const [sort, setSort] = useState("");
  const sortItem = (listItems) => {
    switch (sort) {
      case "newest": {
        setItems(Util.sortProducts(listItems, "add_date", "desc"));
        break;
      }
      case "price:low-high": {
        setItems(Util.sortProducts(listItems, "cost", "asc"));
        break;
      }
      case "price:high-low": {
        setItems(Util.sortProducts(listItems, "cost", "desc"));
        break;
      }
      default: {
        console.log("Invalid sort: " + sort);
      }
    }
  };

  const applyFilter = () => {
    const filteredItems = Util.filterItems(itemsApi, filterCondition);
    setItems(filteredItems);
    sortItem(filteredItems);
  };

  useEffect(() => {
    applyFilter();
  }, [filterCondition.brand]);

  useEffect(() => {
    sortItem(items);
  }, [sort]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadItem(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [loadItem]);

  useEffect(() => {
    setFilterCondition((prev) => {
      return {
        ...prev,
        gender: gender ? [gender] : [],
      };
    });
    if (gender !== "unisex" && gender) {
      setItems(itemsApi.filter((item) => item.gender === gender));
    } else {
      setItems(itemsApi);
    }
  }, [gender]);
  useEffect(() => {
    const initItem = async () => {
      const result = await Services.getDataFromApi("/api/item/all", "");
      if (result.status === 200) {
        setItemsApi(JSON.parse(result.data));
        if (gender && gender !== "unisex") {
          setItems(
            JSON.parse(result.data).filter((item) => item.gender === gender)
          );
        } else {
          setItems(JSON.parse(result.data));
        }
      }
    };
    initItem();
  }, []);
  return (
    <>
      <Header />
      <div className=" w-full  ">
        <div
          className="grid grid-cols-12 mt-5 pt-20 pl-10 pr-10 transition-all"
          style={{
            transition: ".4s",
          }}
        >
          <div
            className={` xl:w-1/4  w-1/3 pl-10 pr-10 fixed bottom-0 left-0 transition-all`}
            style={{
              transition: ".4s",
              display: showFilter ? "block" : "none",
            }}
          >
            <Filter
              setGender={setGender}
              applyFilter={applyFilter}
              filterCondition={filterCondition}
              activeHeader={activeHeader}
              setFilterCondition={setFilterCondition}
            />
          </div>

          <div
            className="xl:col-span-3 col-span-4 pt-10 p-10 transition-all"
            style={{
              transition: ".4s",
              display: showFilter ? "block" : "none",
            }}
          ></div>
          <div
            className={`${
              showFilter ? "xl:col-span-9 col-span-8" : "col-span-12"
            } transition-all`}
            style={{
              transition: ".4s",
            }}
          >
            <HeaderShop
              setFilterCondition={setFilterCondition}
              filterCondition={filterCondition}
              sort={sort}
              setSort={setSort}
              activeHeader={activeHeader}
              setActiveHeader={setActiveHeader}
              setShowFilter={setShowFilter}
              showFilter={showFilter}
            />
            <div
              className="w-full custom-scrollbar"
              style={
                {
                  // maxHeight: "calc(100vh - 9rem)",
                }
              }
            >
              <div
                className="flex justify-start p-2 flex-wrap transition-all"
                style={{
                  transition: ".4s",
                }}
              >
                {loadItem && (
                  <GridSkeleton
                    showFilter={showFilter}
                    data={
                      showFilter
                        ? items.slice(
                            (pageActive - 1) * 24,
                            (pageActive - 1) * 24 + 24
                          )
                        : items.slice(
                            (pageActive - 1) * 30,
                            (pageActive - 1) * 30 + 30
                          )
                    }
                  />
                )}
                {!loadItem && (
                  <GridItem
                    showFilter={showFilter}
                    data={
                      showFilter
                        ? items.slice(
                            (pageActive - 1) * 24,
                            (pageActive - 1) * 24 + 24
                          )
                        : items.slice(
                            (pageActive - 1) * 30,
                            (pageActive - 1) * 30 + 30
                          )
                    }
                  />
                )}
              </div>
              {items.length > 0 && (
                <div className="w-full flex justify-center p-10">
                  <PaginationCustom
                    setPageActive={setPageActive}
                    setLoadItem={setLoadItem}
                    count={
                      showFilter
                        ? Math.ceil(items.length / 24)
                        : Math.ceil(items.length / 30)
                    }
                  />
                </div>
              )}
              {items.length === 0 && <Alert severity="info">No Result</Alert>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(ShowItem);
