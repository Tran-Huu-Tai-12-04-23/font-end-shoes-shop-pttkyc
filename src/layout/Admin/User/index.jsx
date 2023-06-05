import { useEffect, useState } from "react";

import Table from "../../../components/Table";
import { users } from "../../../Services/fectchApi";

import { Avatar, Button, Modal, Box, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ButtonCustom from "../../../components/Button";
import CustomizedMenus from "../../../components/CustomizedMenu";
import Services from "../../../Services";

import { style } from "../styleModal";
import { FcFullTrash } from "react-icons/fc";
import { AiOutlineSearch } from "react-icons/ai";
import { useContextStore } from "../../../Store";

function User({ setActive, setUserDetail }) {
  const { setAlert } = useContextStore();
  const [userSelected, setUserSelected] = useState([]);
  const [activeFilter, settActiveFilter] = useState(true);
  const [filter, setFilter] = useState("");
  const [user, setUser] = useState([]);
  const [idUserRemove, setIdUserRemove] = useState("");
  const [showModalCommitRemoveUser, setShowModalCommitRemoveUser] =
    useState(false);
  const [showCommitUserSelectRemove, setShowCommitUserSelectRemove] =
    useState(false);
  const [search, setSearch] = useState("");
  const [notificationSearch, setNotificationSearch] = useState("");

  const [userShow, setUserShow] = useState([]);

  const columns = [
    { field: "account_id", headerName: "ID", width: 70 },
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <Avatar
          src={params.row.avatar_url}
          alt={params.row.username}
          sx={{ width: 30, height: 30 }}
        />
      ),
    },
    { field: "username", headerName: "Account name", width: 150 },
    {
      field: "first_name",
      headerName: "First name",
      width: 150,
      renderCell: (params) => (
        <span>{params.value === null ? "Updating..." : params.value}</span>
      ),
    },
    {
      field: "last_name",
      headerName: "Last name",
      width: 150,
      renderCell: (params) => (
        <span>{params.value === null ? "Updating..." : params.value}</span>
      ),
    },
    {
      field: "phone_number",
      headerName: "Phone number",
      width: 150,
      renderCell: (params) => (
        <span>{params.value === null ? "Updating..." : params.value}</span>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
      renderCell: (params) => (
        <span>{params.value === null ? "Updating..." : params.value}</span>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: "300",
      renderCell: (params) => (
        <>
          <Button
            style={{
              color: "red",
              padding: ".3rem 2rem",
              fontSize: ".8rem",
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIdUserRemove(params.row.account_id);
              setShowModalCommitRemoveUser(true);
            }}
          >
            Remove
          </Button>
          <Button
            sx={{
              marginLeft: "1rem",
              background: "rgba(255, 195, 0, .2)",
              color: "orange",
              padding: ".3rem 2rem",
              fontSize: ".8rem",
              "&:hover": {
                background: "rgba(255, 195, 0, .2)",
                filter: "brightness(120%)",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleDetail(params.row.account_id);
            }}
          >
            Detail
          </Button>
        </>
      ),
    },
  ];
  // Function to handle remove action

  // Function to handle detail action
  function handleDetail(id) {
    setActive(3.1);
    const useDetail = user.filter((us) => us.account_id === id);
    setUserDetail(useDetail.length > 0 ? useDetail[0] : null);
  }
  useEffect(() => {
    const initUser = async () => {
      const result = await Services.getDataFromApi("/api/user/all");
      const usersWithId = result.data.map((user, index) => ({
        ...user,
        id: user.account_id,
      }));
      if (result.status === 200) {
        setUser(usersWithId);
        setUserShow(usersWithId);
      } else {
        console.log(result.status);
      }
    };
    initUser();
  }, []);

  const handleRemoveUser = async (account_id) => {
    try {
      const result = await Services.update("/api/user/account/delete", {
        account_id,
      });

      if (result.data.status === 200) {
        setAlert({ type: "success", message: "Delete user successfully!" });
        setShowModalCommitRemoveUser(false);
        setIdUserRemove("");
        setUserShow((prev) => {
          return prev.filter((us) => {
            return us.account_id !== idUserRemove;
          });
        });
        setUser((prev) => {
          return prev.filter((us) => {
            return us.account_id !== idUserRemove;
          });
        });
      } else {
        throw new Error("Delete user failed!");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSearch = () => {
    setNotificationSearch(search);
    if (!search) {
      setUserShow(user);
    } else {
      setUserShow(
        user.filter((us) => {
          if (!us.first_name) {
            return false;
          }
          if (!us.last_name) {
            return false;
          }
          if (!us.username) {
            return false;
          }
          if (
            us?.first_name.toLowerCase().includes(search.toLowerCase()) ||
            us?.last_name.toLowerCase().includes(search.toLowerCase()) ||
            us?.username.toLowerCase().includes(search.toLowerCase())
          ) {
            return true;
          }
          return false;
        })
      );
    }
  };

  const handleRemoveUserSelect = async () => {
    const removeUsersPromise = userSelected.map(async (account_id) => {
      let result = await Services.update("/api/user/account/delete", {
        account_id,
      });

      if (result.status === 200) {
        return account_id;
      } else {
        return null;
      }
    });

    const resultRemoveUser = await Promise.all(removeUsersPromise);
    const successfulRemoveUsers = resultRemoveUser.filter(
      (itemId) => itemId !== null
    );
    const newListUsers = user.filter(
      (us) => !successfulRemoveUsers.includes(us.account_id)
    );
    setUser(newListUsers);
    setUserShow(newListUsers);

    if (successfulRemoveUsers.length > 0) {
      setAlert({
        type: "success",
        message: "Remove users successfully!",
      });
      setShowCommitUserSelectRemove(false);
    } else {
      setAlert({
        type: "error",
        message: "Remove users failed!",
      });
    }
  };

  return (
    <div className="w-full mt-12">
      <Modal
        open={showModalCommitRemoveUser}
        onClose={(e) => showModalCommitRemoveUser(false)}
      >
        <Box sx={style}>
          <div className="flex-col flex w-full center  ">
            <FcFullTrash className="text-8xl" />
            <h1 className="font-barlow font-bold w-fit mt-5 ">
              Are you sure you want to remove user
            </h1>

            <div className="justify-between w-3/5 ml-auto mr-auto flex center mt-6">
              <Button
                sx={{
                  border: "1px solid #fb923c",
                  color: "#000",
                  marginRight: "1rem",
                }}
                onClick={(e) => showModalCommitRemoveUser(false)}
              >
                Close
              </Button>
              <Button
                sx={{
                  backgroundColor: "#ff5555",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#ff6054",
                  },
                }}
                onClick={(e) => handleRemoveUser(idUserRemove)}
              >
                Commit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal
        open={showCommitUserSelectRemove}
        onClose={(e) => setShowCommitUserSelectRemove(false)}
      >
        <Box sx={style}>
          <div className="flex-col flex w-full center  ">
            <FcFullTrash className="text-8xl" />
            <h1 className="font-barlow font-bold w-fit mt-5 ">
              Are you sure you want to remove user selected
            </h1>

            <div className="justify-between w-3/5 ml-auto mr-auto flex center mt-6">
              <Button
                sx={{
                  border: "1px solid #fb923c",
                  color: "#000",
                  marginRight: "1rem",
                }}
                onClick={(e) => setShowCommitUserSelectRemove(false)}
              >
                Close
              </Button>
              <Button
                sx={{
                  backgroundColor: "#ff5555",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#ff6054",
                  },
                }}
                onClick={handleRemoveUserSelect}
              >
                Commit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="start flex p-2">
        <input
          className="text-xl reset p-2 min-w-15 rounded-xl bg-transparent"
          placeholder="Search name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <AiOutlineSearch
          onClick={handleSearch}
          className="text-3xl hover:text-orange-500 cursor-pointer"
        ></AiOutlineSearch>
        {notificationSearch && (
          <h1 className="ml-2 font-barlow">
            Result for :<span className="font-bold">{notificationSearch}</span>{" "}
          </h1>
        )}
        {userSelected.length > 0 && (
          <ButtonCustom
            nameButton="Remove user selected"
            style={{
              color: "red",
              marginLeft: "auto",
              background: "rgba(204, 12, 0, .1)",
              "&:hover": {
                background: "rgba(204, 12, 0, .1)",
                filter: "brightness(120%)",
              },
            }}
            onClick={(e) => setShowCommitUserSelectRemove(true)}
          />
        )}
      </div>
      <Table
        data={userShow}
        columns={columns}
        pageSize={12}
        setSelection={setUserSelected}
      ></Table>
    </div>
  );
}

export default User;
