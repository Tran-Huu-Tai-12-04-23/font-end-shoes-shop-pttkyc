import { useState, useEffect } from "react";

import { Alert, Button, Avatar, Modal, Box } from "@mui/material";
import Services from "../../../Services";
import Table from "../../../components/Table";
import { useContextStore } from "../../../Store";
import { style } from "../styleModal";
import { FcFullTrash } from "react-icons/fc";

const UserTrash = () => {
  const { setAlert } = useContextStore();
  const [user, setUser] = useState([]);
  const [userSelected, setUserSelected] = useState([]);
  const [showCommitDestroyUser, setShowCommitDestroyUser] = useState(false);
  const [idUserDestroy, setIdUserDestroy] = useState("");

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
            sx={{
              color: "red",
              padding: ".3rem 2rem",
              fontSize: ".8rem",
              "&:hover": {
                filter: "brightness(120%)",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIdUserDestroy(params.row.account_id);
              setShowCommitDestroyUser(true);
            }}
          >
            Destroy
          </Button>
          <Button
            style={{
              padding: ".3rem 2rem",
              fontSize: ".8rem",
              background: "rgba(37, 134, 248, .1)",
              marginLeft: "1rem",

              "&:hover": {
                background: "rgba(37, 134, 248, .1)",
                filter: "brightness(120%)",
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              restore(params.row.account_id);
            }}
          >
            Restore
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    const initUserTrash = async () => {
      const result = await Services.getDataFromApi("/api/user/account/trash");
      if (result.status === 200) {
        const usersWithId = result.data.map((user) => ({
          ...user,
          id: user.account_id, // Use the user_id as the unique identifier
        }));
        setUser(usersWithId);
      } else {
        console.error(result);
      }
    };
    initUserTrash();
  }, []);
  const restore = async (account_id) => {
    const result = await Services.update("/api/user/account/restore", {
      account_id,
    });

    if (result.status === 200) {
      setAlert({
        type: "success",
        message: "Restore user successfully !",
      });
      setUser(user.filter((user) => user.account_id !== account_id));
      setUserSelected((prev) => {
        return prev.filter((acId) => acId !== account_id);
      });
    } else {
      setAlert({
        type: "error",
        message: "Restore user failed !",
      });
    }
  };

  const handleRestoreUserSelected = async () => {
    const restorePromises = userSelected.map(async (acId) => {
      const result = await Services.update("/api/user/account/restore", {
        account_id: acId,
      });
      if (result.status === 200) {
        return acId;
      }
      return null;
    });
    const restoreUser = await Promise.all(restorePromises);
    const successfulRestoreUsers = restoreUser.filter(
      (userId) => userId !== null
    );
    setUser(
      user.filter((user) => !successfulRestoreUsers.includes(user.account_id))
    );
    if (successfulRestoreUsers.length > 0) {
      setAlert({
        type: "success",
        message: "Restore users successfully!",
      });
    } else {
      setAlert({
        type: "error",
        message: "Restore users failed!",
      });
    }
  };

  const destroyUser = async (account_id) => {
    const result = await Services.remove(
      "/api/user/account/destroy/",
      `?account_id=${account_id}`
    );

    if (result.data.status === 200) {
      setAlert({
        type: "success",
        message: "Destroy user successfully !",
      });
      setUser(user.filter((user) => user.account_id !== account_id));
      setUserSelected((prev) => {
        return prev.filter((acId) => acId !== account_id);
      });
      setShowCommitDestroyUser(false);
    } else {
      setAlert({
        type: "error",
        message: "Destroy user failed !",
      });
    }
  };

  return (
    <div>
      <Modal
        open={showCommitDestroyUser}
        onClose={(e) => setShowCommitDestroyUser(false)}
      >
        <Box sx={style}>
          <div className="flex-col flex w-full center  ">
            <FcFullTrash className="text-8xl" />
            <h1 className="font-barlow font-bold w-fit mt-5 ">
              Are you sure you want to destroy user with account id is{" "}
              {idUserDestroy}
            </h1>

            <div className="justify-between w-3/5 ml-auto mr-auto flex center mt-6">
              <Button
                sx={{
                  border: "1px solid #fb923c",
                  color: "#000",
                  marginRight: "1rem",
                }}
                onClick={(e) => setShowCommitDestroyUser(false)}
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
                onClick={(e) => destroyUser(idUserDestroy)}
              >
                Commit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <div className="justify-between items-center flex">
        <h1 className="text-xl font-barlow mt-5 mb-5">All user deleted</h1>
        {userSelected.length > 0 && (
          <div className="end flex ">
            <Button
              sx={{
                color: "red",
                marginLeft: "auto",
                marginRight: "1rem",
                background: "rgba(204, 12, 0, .1)",
                "&:hover": {
                  background: "rgba(204, 12, 0, .1)",
                  filter: "brightness(120%)",
                },
              }}
              onClick={handleRestoreUserSelected}
            >
              Destroy user selected
            </Button>
            <Button
              sx={{
                marginLeft: "auto",
                background: "rgba(37, 134, 248, .1)",
                "&:hover": {
                  background: "rgba(37, 134, 248, .1)",
                  filter: "brightness(120%)",
                },
              }}
              onClick={handleRestoreUserSelected}
            >
              Restore user selected
            </Button>
          </div>
        )}
      </div>
      {user.length > 0 && (
        <Table
          data={user}
          columns={columns}
          pageSize={12}
          setSelection={setUserSelected}
        ></Table>
      )}
      {user.length <= 0 && <Alert severity="info">Haven't user on trash</Alert>}
    </div>
  );
};

export default UserTrash;
