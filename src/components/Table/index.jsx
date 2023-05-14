import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function Table({
  data,
  columns,
  pageSize = 10,

  setOrderSelected,
}) {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: pageSize },
          },
        }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setOrderSelected(newRowSelectionModel);
        }}
        pageSizeOptions={[pageSize, 20]}
        checkboxSelection
      ></DataGrid>
    </div>
  );
}
