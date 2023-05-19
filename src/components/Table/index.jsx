import { memo } from "react";
import { DataGrid } from "@mui/x-data-grid";

function Table({ data, columns, pageSize = 10, setSelection }) {
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
          setSelection(newRowSelectionModel);
        }}
        pageSizeOptions={[pageSize, 20]}
        checkboxSelection
        sx={{
          fontFamily: '"Barlow Condensed", "sans-serif"',
        }}
      ></DataGrid>
    </div>
  );
}

export default memo(Table);
