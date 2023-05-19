import { useEffect, useState } from "react";

import Services from "../Services";
import { createContext, useContext } from "react";

const ContextStore = createContext();
function checkSaleIsOut(date) {
  const end = new Date(date);
  if (isNaN(end.getTime())) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (end < today) {
    return false;
  }

  return true;
}
function Store({ children }) {
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(null);
  const [gender, setGender] = useState("");
  const [idProductDetail, setIdProductDetail] = useState(null);
  const [itemsBag, setItemsBag] = useState([]);
  const [itemSale, setItemSale] = useState([]);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const initItemSale = async () => {
      const result = await Services.getDataFromApi("/api/item/sale/all");
      if (result.status === 200) {
        const data = JSON.parse(result.data);
        setItemSale(
          data.filter((item) => {
            if (checkSaleIsOut(item.date_end)) {
              return true;
            }
            return false;
          })
        );
      }
    };
    initItemSale();
  }, []);

  useEffect(() => {
    const initProduct = async () => {
      const result = await Services.getDataFromApi("/api/item/all");
      if (result.status === 200) {
        const data = JSON.parse(result.data);
        setProduct(data);
      }
    };
    initProduct();
  }, []);

  useEffect(() => {
    const bags = localStorage.getItem("bag");
    if (bags) {
      setItemsBag(JSON.parse(bags));
    }
  }, []);

  return (
    <ContextStore.Provider
      value={{
        itemsBag,
        setItemsBag,
        idProductDetail,
        setIdProductDetail,
        search,
        setSearch,
        alert,
        setAlert,
        gender,
        setGender,
        itemSale,
        setItemSale,
        product,
        setProduct,
      }}
    >
      {children}
    </ContextStore.Provider>
  );
}

export const useContextStore = () => {
  return useContext(ContextStore);
};

export default Store;
