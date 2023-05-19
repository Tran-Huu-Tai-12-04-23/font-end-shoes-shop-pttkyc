import { useState, useEffect } from "react";
import Services from "../../../Services";
import PreviewItemSale from "./PreviewItemSaleEdit";

import { v4 as uuid } from "uuid";
import EditSale from "./EditSale";

import ModalCustom from "../../../components/ModalCustom";

function ItemSaleing() {
  const [itemSales, setItemSales] = useState([]);
  const [openEditSale, setOpenEditSale] = useState(false);
  const [itemSaleEdit, setItemSaleEdit] = useState([]);

  useEffect(() => {
    const initSaleItem = async () => {
      const res = await Services.getDataFromApi("/api/item/sale/all");
      if (res.status === 200) {
        setItemSales(JSON.parse(res.data));
      }
    };
    initSaleItem();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full center flex flex-col mt-10">
        <div className="w-full center mt-10 pb-40 flex-col">
          <div
            className="w-5/6 p-4 rounded-xl h-16 center flex bg-orange-400 relative"
            style={{
              zIndex: 1,
            }}
          >
            <div className="text-md text-white center font-barlow font-bold">
              Sale Items
            </div>
          </div>
          <div className="w-full pt-12 rounded-xl p-4 bg-slate-100 -translate-y-6 grid-cols-2 grid gap-5">
            {itemSales &&
              itemSales.map((item) => {
                return (
                  <PreviewItemSale
                    key={uuid()}
                    data={item}
                    setItemSales={setItemSales}
                    setOpenEditSale={setOpenEditSale}
                    setItemSaleEdit={setItemSaleEdit}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <ModalCustom
        open={openEditSale}
        handleClose={(e) => setOpenEditSale(false)}
      >
        <EditSale
          data={itemSaleEdit}
          setOpenEditSale={setOpenEditSale}
          setItemSales={setItemSales}
        />
      </ModalCustom>
    </div>
  );
}

export default ItemSaleing;
