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
    <>
      {/* <MyMenu
        anchorEl={activeMenu}
        open={open}
        onClose={() => setActiveMenu(false)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
       
      </MyMenu> */}
      <Menu
        anchorEl={activeMenu}
        open={open}
        onClose={() => setActiveMenu(false)}
        onClick={() => setActiveMenu(false)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {data.length > 0 && renderMenu()}
      </Menu>
    </>
  );
}

export default MenuCustom;
