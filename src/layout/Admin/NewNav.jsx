import { useState, memo } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import { v4 as uuid } from "uuid";
import { BiPurchaseTag } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";

import {
  GrOverview,
  GrUserManager,
  GrTransaction,
  GrEdit,
} from "react-icons/gr";
import { SiGoogletagmanager } from "react-icons/si";
import {
  MdOutlineProductionQuantityLimits,
  MdOutlineAppRegistration,
  MdBorderColor,
} from "react-icons/md";
import { FiUsers, FiBook } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import { VscPreview } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { SlNotebook } from "react-icons/sl";
import { BiDetail } from "react-icons/bi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled(({ showIcon, ...props }) => (
  <MuiAccordionSummary
    onClick={(e) => e.stopPropagation()}
    {...props}
    expandIcon={
      !showIcon ? (
        <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />
      ) : null
    }
  />
))(({ theme }) => ({
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transition: ".4s",
    transform: "rotate(90deg)",
    padding: "0",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({}));

function NewNav({ active, handleNextStep, handleLogout }) {
  const [navbar] = useState([
    {
      id: 0,
      name: "Overview",
      icon: <GrOverview className="text-md" />,
      action: () => handleNextStep(0),
    },
    {
      id: 1,
      name: "Products",
      icon: <MdOutlineProductionQuantityLimits className="text-md" />,
      submenu: [
        {
          id: 0,
          name: "Manager",
          icon: <SiGoogletagmanager />,
          action: () => handleNextStep(1),
        },
        {
          id: 1,
          name: "Product detail",
          icon: <BiDetail />,
          action: () => handleNextStep(1.1),
        },
        {
          id: 2,
          name: "Sale settings",
          icon: <MdOutlineAppRegistration />,
          action: () => handleNextStep(1.2),
        },
        {
          id: 3,
          name: "Sale Items",
          icon: <BiPurchaseTag />,
          action: () => handleNextStep(1.3),
        },
        {
          id: 4,
          name: "Trash",
          icon: <HiOutlineTrash />,
          action: () => handleNextStep(1.4),
        },
      ],
    },
    {
      id: 2,
      name: "Orders",
      icon: <CiShoppingCart className="text-md" />,
      submenu: [
        {
          id: 0,
          name: "Manager",
          icon: <FiBook />,
          action: () => handleNextStep(2),
        },
        {
          id: 1,
          name: "Order detail",
          icon: <BiDetail />,
          action: () => handleNextStep(2.1),
        },
      ],
    },
    {
      id: 3,
      name: "Users",
      icon: <FiUsers className="text-md" />,
      submenu: [
        {
          id: 0,
          name: "Manager",
          icon: <FiBook />,
          action: () => handleNextStep(3),
        },
        {
          id: 1,
          name: "User detail",
          icon: <BiDetail />,
          action: () => handleNextStep(3.1),
        },
      ],
    },
    {
      id: 4,
      name: "Transactions",
      icon: <GrTransaction className="text-md" />,
      action: () => handleNextStep(4),
    },
    {
      id: 5,
      name: "Reports",
      icon: <GoReport className="text-md" />,
      action: () => handleNextStep(5),
    },
    {
      id: 6,
      name: "Reviews",
      icon: <VscPreview className="text-md" />,
      action: () => handleNextStep(6),
    },
    {
      id: 7,
      name: "Note",
      icon: <SlNotebook className="text-md" />,
      action: () => handleNextStep(7),
    },
    {
      id: 8,
      name: "Settings",
      icon: <IoSettingsOutline className="text-md" />,
      action: () => handleNextStep(8),
    },
  ]);

  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };

  return (
    <>
      {navbar.map((nav, index) => (
        <Accordion
          key={nav.id}
          sx={{
            backgroundColor: "transparent",
            border: "none",
            borderTop: "1px solid #e0e0e0",
            transition: ".4s",
            "& > div": {
              padding: "0",
              paddingLeft: ".75rem",
            },
          }}
          expanded={expanded === nav.id}
          onChange={handleChange(nav.id)}
        >
          <AccordionSummary
            aria-controls={`${nav.id}-content`}
            id={`${nav.id}-header`}
            showIcon={nav.submenu ? false : true}
            sx={{
              backgroundColor:
                active === index && !nav.submenu
                  ? "rgba(255, 181, 102,.5)"
                  : "",
            }}
            onClick={nav.action}
          >
            {nav.icon}
            <h5 className={`${"text-md  ml-3"} font-barlow cursor-pointer`}>
              {nav.name}
            </h5>
          </AccordionSummary>
          {nav.submenu && (
            <AccordionDetails sx={{ padding: 0 }}>
              {nav.submenu.map((item, index) => {
                return (
                  <div
                    className="h-10 w-full ml-1 pl-1 hover:bg-slate-50 start flex  cursor-pointer"
                    key={uuid()}
                    style={{
                      borderTop: "1px solid #e0e0e0",
                      backgroundColor:
                        active === nav.id + index * 0.1
                          ? "rgba(255, 181, 102,.5)"
                          : "",
                    }}
                    onClick={item.action}
                  >
                    {item.icon}
                    <h5
                      className={`${"text-md  ml-3"} font-barlow cursor-pointer`}
                    >
                      {item.name}
                    </h5>
                  </div>
                );
              })}
            </AccordionDetails>
          )}
        </Accordion>
      ))}
      <button
        className="fixed bottom-4 left-10 ml-auto mr-auto center flex hover:text-orange-500 pt-1 w-32 pb-1 pr-4 pl-4 rounded-md cursor-pointer font-barlow text-md"
        onClick={() => handleLogout()}
      >
        <RiLogoutBoxLine className="text-3xl" />
        <h5 className="ml-4 cursor-pointer">Logout</h5>
      </button>
    </>
  );
}
export default memo(NewNav);
