import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/system";
import { v4 as uuid } from "uuid";

function MenuCustom({
  activeMenu,
  setActiveMenu = () => {},
  data = [],
  backgroundColor,
  color,
  sx = {},
}) {
  const open = Boolean(activeMenu);
  const MyMenu = styled(Menu)({
    "& .css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper": {
      backgroundColor: backgroundColor,
    },
    "& li ": {
      fontFamily: '"Barlow Condensed", "sans-serif"',
      color: color,
    },
  });

  const renderMenu = () => {
    return data.map((menuItem) => {
      return (
        <MenuItem key={uuid()} onClick={menuItem?.action} sx={sx}>
          {menuItem.icon}
          <span>{menuItem.name}</span>
        </MenuItem>
      );
    });
  };
  return (
    <MyMenu
      anchorEl={activeMenu}
      open={open}
      onClose={() => setActiveMenu(false)}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      {data.length > 0 && renderMenu()}
    </MyMenu>
  );
}

export default MenuCustom;
