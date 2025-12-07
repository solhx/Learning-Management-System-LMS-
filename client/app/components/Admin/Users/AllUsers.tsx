import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserRoleMutation,
} from "../../../../redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Alert,
  IconButton,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  isTeam: boolean;
};

const AllCourses: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();

  // State management
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");

  // API hooks
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();

  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  // Effects
  useEffect(() => {
    // Role update error
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    // Role update success
    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setAddMemberOpen(false);
      setEmail("");
      setRole("admin");
    }

    // Delete success
    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully!");
      setDeleteDialogOpen(false);
      setSelectedUserId("");
      setSelectedUserName("");
    }

    // Delete error
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError]);

  // Handlers
  const handleAddMember = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }
    // Find the user by email from fetched user data
    const user = data?.users.find((user: any) => user.email === email);
    if (!user) {
      toast.error("User with this email not found");
      return;
    }
    // Call updateUserRole with id and role
    await updateUserRole({ id: user._id, role });
  };

  const handleDeleteClick = (userId: string, userName: string) => {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await deleteUser({ id: selectedUserId });
  };

  const handleCloseAddMember = () => {
    setAddMemberOpen(false);
    setEmail("");
    setRole("admin");
  };

  const handleCloseDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedUserId("");
    setSelectedUserName("");
  };

  // Columns definition
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
    {
      field: "courses",
      headerName: "Purchased Courses",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Joined At",
      flex: 0.5,
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => handleDeleteClick(params.row.id, params.row.name)}
            sx={{
              minWidth: "auto",
              padding: "6px",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#dc262620" : "#fee2e2",
              },
            }}
          >
            <AiOutlineDelete
              className="dark:text-white text-black"
              size={20}
            />
          </Button>
        );
      },
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            href={`mailto:${params.row.email}`}
            sx={{
              minWidth: "auto",
              padding: "6px",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#3e439620" : "#e0e7ff",
              },
            }}
          >
            <AiOutlineMail className="dark:text-white text-black" size={20} />
          </Button>
        );
      },
    },
  ];

  // Rows data
  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <div className="w-full flex justify-end">
            
            <div
              className={`${styles.button} !w-[200px] dark:bg-[#57c7a3] !h-[35px] dark:border dark:border-[#ffffff6c]`}
              onClick={() => setAddMemberOpen(true)}
            >
              Add New Member
            </div>
          </div>
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-menuIconButton": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
                "&:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? "#3e4396 !important"
                      : "#e0e7ff !important",
                  cursor: "pointer",
                },
              },
              "& .MuiDataGrid-row.Mui-selected": {
                backgroundColor:
                  theme === "dark"
                    ? "#2d3561 !important"
                    : "#c7d2fe !important",
                "&:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? "#3e4396 !important"
                      : "#a5b4fc !important",
                },
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                "&:focus": {
                  outline: "none",
                },
                "&:focus-within": {
                  outline: "none",
                },
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor:
                  theme === "dark" ? "#3e4396 !important" : "#A4A9FC !important",
                borderBottom: "none !important",
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor:
                  theme === "dark" ? "#3e4396 !important" : "#A4A9FC !important",
                color: theme === "dark" ? "#fff !important" : "#000 !important",
                "&:focus": {
                  outline: "none",
                },
                "&:focus-within": {
                  outline: "none",
                },
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: theme === "dark" ? "#fff !important" : "#000 !important",
                fontWeight: "600",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
              "& .MuiTablePagination-actions button": {
                color: theme === "dark" ? "#fff" : "#000",
                "&:hover": {
                  backgroundColor:
                    theme === "dark" ? "#ffffff20" : "#00000010",
                },
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        </Box>
      )}

      {/* Add Member Dialog */}
      <Dialog
        open={addMemberOpen}
        onClose={handleCloseAddMember}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme === "dark" ? "#1F2A40" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom:
              theme === "dark" ? "1px solid #ffffff30" : "1px solid #e5e7eb",
            pb: 2,
          }}
        >
          <span className="text-xl font-semibold">Add New Member</span>
          <IconButton
            onClick={handleCloseAddMember}
            sx={{
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            <AiOutlineClose />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                color: theme === "dark" ? "#fff" : "#000",
                "& fieldset": {
                  borderColor: theme === "dark" ? "#ffffff30" : "#d1d5db",
                },
                "&:hover fieldset": {
                  borderColor: theme === "dark" ? "#ffffff50" : "#9ca3af",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme === "dark" ? "#57c7a3" : "#3e4396",
                },
              },
              "& .MuiInputLabel-root": {
                color: theme === "dark" ? "#9ca3af" : "#6b7280",
                "&.Mui-focused": {
                  color: theme === "dark" ? "#57c7a3" : "#3e4396",
                },
              },
            }}
          />
          <TextField
            select
            margin="dense"
            label="Role"
            fullWidth
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: theme === "dark" ? "#fff" : "#000",
                "& fieldset": {
                  borderColor: theme === "dark" ? "#ffffff30" : "#d1d5db",
                },
                "&:hover fieldset": {
                  borderColor: theme === "dark" ? "#ffffff50" : "#9ca3af",
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme === "dark" ? "#57c7a3" : "#3e4396",
                },
              },
              "& .MuiInputLabel-root": {
                color: theme === "dark" ? "#9ca3af" : "#6b7280",
                "&.Mui-focused": {
                  color: theme === "dark" ? "#57c7a3" : "#3e4396",
                },
              },
              "& .MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: {
                    backgroundColor: theme === "dark" ? "#1F2A40" : "#fff",
                    color: theme === "dark" ? "#fff" : "#000",
                    "& .MuiMenuItem-root": {
                      "&:hover": {
                        backgroundColor:
                          theme === "dark" ? "#3e4396" : "#e0e7ff",
                      },
                      "&.Mui-selected": {
                        backgroundColor:
                          theme === "dark" ? "#3e4396" : "#c7d2fe",
                        "&:hover": {
                          backgroundColor:
                            theme === "dark" ? "#4c51bf" : "#a5b4fc",
                        },
                      },
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions
          sx={{
            borderTop:
              theme === "dark" ? "1px solid #ffffff30" : "1px solid #e5e7eb",
            pt: 2,
            px: 3,
            pb: 2,
          }}
        >
          <Button
            onClick={handleCloseAddMember}
            sx={{
              color: theme === "dark" ? "#9ca3af" : "#6b7280",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#ffffff10" : "#f3f4f6",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddMember}
            variant="contained"
            sx={{
              backgroundColor: theme === "dark" ? "#57c7a3" : "#3e4396",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#45b890" : "#4c51bf",
              },
            }}
          >
            Add Member
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDelete}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme === "dark" ? "#1F2A40" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom:
              theme === "dark" ? "1px solid #ffffff30" : "1px solid #e5e7eb",
            pb: 2,
          }}
        >
          <span className="text-xl font-semibold">Confirm Delete</span>
          <IconButton
            onClick={handleCloseDelete}
            sx={{
              color: theme === "dark" ? "#fff" : "#000",
            }}
          >
            <AiOutlineClose />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <Alert
            severity="warning"
            sx={{
              backgroundColor: theme === "dark" ? "#78350f20" : "#fef3c7",
              color: theme === "dark" ? "#fbbf24" : "#92400e",
              "& .MuiAlert-icon": {
                color: theme === "dark" ? "#fbbf24" : "#f59e0b",
              },
            }}
          >
            Are you sure you want to delete user{" "}
            <strong>{selectedUserName}</strong>? This action cannot be undone.
          </Alert>
        </DialogContent>
        <DialogActions
          sx={{
            borderTop:
              theme === "dark" ? "1px solid #ffffff30" : "1px solid #e5e7eb",
            pt: 2,
            px: 3,
            pb: 2,
          }}
        >
          <Button
            onClick={handleCloseDelete}
            sx={{
              color: theme === "dark" ? "#9ca3af" : "#6b7280",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#ffffff10" : "#f3f4f6",
              },
            }}
          >
            No, Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{
              backgroundColor: "#dc2626",
              "&:hover": {
                backgroundColor: "#b91c1c",
              },
            }}
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllCourses;