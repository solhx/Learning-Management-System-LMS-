import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import { AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from "../../../../redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import {format} from "timeago.js"
import toast from "react-hot-toast";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const[open,setOpen] =useState(false)
  const[courseID,setCourseID] =useState("")
  const[courseTitle,setCourseTitle] =useState("") // Added to store course title
  const [deleteCourse,{isSuccess,error}] =useDeleteCourseMutation();


  const{isLoading,data ,refetch} =useGetAllCoursesQuery({},{refetchOnMountOrArgChange:true})

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
    },
    {
      field: "title",
      headerName: "Course Title",
      flex: 1,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      flex: 0.5,
    },
    {
      field: "purchased",
      headerName: "Purchased",
      flex: 0.5,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 0.5,
    },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Link href={`/admin/edit-course/${params.row.id}`}>
            <Button
              sx={{
                minWidth: "auto",
                padding: "6px",
                "&:hover": {
                  backgroundColor: theme === "dark" ? "#dc262620" : "#fee2e2",
                },
              }}
            >
              <FiEdit2
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </Link>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
            onClick={()=>{
              setOpen(!open);
              setCourseID(params.row.id);
              setCourseTitle(params.row.title); // Also store course title
            }}
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
          </>
        );
      },
    },
  ];

  
  const rows:any = [];
  {
    data && data.courses.forEach((item:any) =>{
        rows.push({
      id: item._id,
      title: item.name,
      purchased: item.purchased,
      ratings: item.ratings,
      created_at: format (item.createdAt),
        })
    })
  }

  useEffect(() => {
   if(isSuccess){
    refetch();
    toast.success("Course Deleted Successfully");
    setOpen(false);
    setCourseID("");
    setCourseTitle("");
   }
   if(error){
    if("data" in error){
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
   }
  }, [isSuccess,error])
  

  const handleDelete =async()=>{
    const id = courseID;
    await deleteCourse(id)
  }


  return (
    <div className="mt-[120px]">
     {
        isLoading ?(
            <Loader/>
        ):(
             <Box m="20px">
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
            // Selected row styling
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
            // Header styling
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
            // Pagination hover
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
        )

     }

      {/* ============================================ */}
      {/* DELETE CONFIRMATION POPUP DIALOG */}
      {/* ============================================ */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: theme === "dark" ? "#1F2A40" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
            borderRadius: 2,
          },
        }}
      >
        {/* Dialog Header */}
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom:
              theme === "dark" ? "1px solid #ffffff30" : "1px solid #e5e7eb",
            pb: 2,
            fontSize: "1.25rem",
            fontWeight: 600,
          }}
        >
          <span className="text-xl font-semibold">⚠️ Confirm Delete</span>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              color: theme === "dark" ? "#fff" : "#000",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#ffffff20" : "#f3f4f6",
              },
            }}
          >
            <AiOutlineClose size={20} />
          </IconButton>
        </DialogTitle>

        {/* Dialog Content - Warning Message */}
        <DialogContent sx={{ mt: 3, mb: 2 }}>
          <Alert
            severity="warning"
            sx={{
              backgroundColor: theme === "dark" ? "#78350f20" : "#fef3c7",
              color: theme === "dark" ? "#fbbf24" : "#92400e",
              border: theme === "dark" ? "1px solid #fbbf2440" : "1px solid #f59e0b40",
              "& .MuiAlert-icon": {
                color: theme === "dark" ? "#fbbf24" : "#f59e0b",
              },
            }}
          >
            <div>
              <p className="font-semibold mb-2">
                Are you sure you want to delete this course?
              </p>
              <p className="mb-2">
                Course: <strong className="text-lg">{courseTitle}</strong>
              </p>
              <p className="text-sm">
                ⚠️ This action cannot be undone. All course data will be permanently removed.
              </p>
            </div>
          </Alert>
        </DialogContent>

        {/* Dialog Actions - Buttons */}
        <DialogActions
          sx={{
            borderTop:
              theme === "dark" ? "1px solid #ffffff30" : "1px solid #e5e7eb",
            pt: 2,
            px: 3,
            pb: 2,
            gap: 1,
          }}
        >
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            sx={{
              color: theme === "dark" ? "#9ca3af" : "#6b7280",
              borderColor: theme === "dark" ? "#4b5563" : "#d1d5db",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#ffffff10" : "#f3f4f6",
                borderColor: theme === "dark" ? "#6b7280" : "#9ca3af",
              },
            }}
          >
            ✕ No, Cancel
          </Button>
          <Button
            onClick={()=>handleDelete()}
            variant="contained"
            sx={{
              backgroundColor: "#dc2626",
              color: "#fff",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#b91c1c",
              },
            }}
          >
            ✓ Yes, Delete Course
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AllCourses;