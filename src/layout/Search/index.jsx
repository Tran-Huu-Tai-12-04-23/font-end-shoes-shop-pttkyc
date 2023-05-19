import { useState, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import Utils from "../../util";

import GridItem from "../../components/GridItem";
import Header from "../../components/Header";
import Footer from "../../layout/Home/Footer";
import { itemsApi } from "../../Services/fectchApi";

import GridSkeleton from "../../components/GridSkeleton";
import PaginationCustom from "../../components/PaginationCustom";
import { useContextStore } from "../../Store";

function Search() {
  const { product } = useContextStore();
  const [pageActive, setPageActive] = useState(1);
  const [loadItem, setLoadItem] = useState(false);
  const { search, setSearch } = useContextStore();
  const [searchText, setSearchText] = useState(search);
  const history = useNavigate();
  const [itemResult, setItemsResult] = useState(product ? product : []);
  const Util = new Utils();
  console.log(product);
  useEffect(() => {
    setSearchText(search);
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadItem(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [loadItem]);

  useEffect(() => {
    if (!search) {
      history("/");
    }
  }, []);

  useEffect(() => {
    setItemsResult(Util.searchItems(product, search));
    setLoadItem(true);
  }, [search]);

  return (
    <div>
      <Header />
      <div className="pt-12 w-full center flex flex-wrap flex-col">
        <h1 className="text-xl font-barlow pt-12">
          Result for :
          <span className="text-2xl font-bold font-barlow ml-2 italic text-orange-500">
            {searchText}
          </span>
        </h1>

        <div className="xl:w-5/6 w-full flex flex-wrap mt-12">
          <>
            {loadItem && (
              <GridSkeleton
                data={itemResult.slice(
                  (pageActive - 1) * 30,
                  (pageActive - 1) * 30 + 30
                )}
              />
            )}
            {!loadItem && (
              <GridItem
                data={itemResult.slice(
                  (pageActive - 1) * 30,
                  (pageActive - 1) * 30 + 30
                )}
              />
            )}
            {itemResult.length > 0 && (
              <div className="w-full flex justify-center p-10">
                <PaginationCustom
                  setPageActive={setPageActive}
                  setLoadItem={setLoadItem}
                  count={Math.ceil(itemResult.length / 30)}
                />
              </div>
            )}
            {itemResult.length === 0 && (
              <Alert
                severity="info"
                sx={{
                  width: "100%",
                  fontSize: "1.5rem",
                }}
              >
                No Result for :
                <span className="text-orange-400 font-barlow font-bold text-2xl pl-2 pr-5 italic">
                  {search}
                </span>
              </Alert>
            )}
          </>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default memo(Search);
