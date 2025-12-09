import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Loader from "../../Loader/Loader";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices: React.FC<Props> = ({ isDashboard }) => {
  const { theme } = useTheme();
  const { data, isLoading } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    if (!data) return;

    const temp = data?.orders.map((item: any) => {
      const user = usersData?.users.find((u: any) => u._id === item.userId);
      const course = coursesData?.courses.find((c: any) => c._id === item.courseId);

      return {
        ...item,
        userName: user?.name || "N/A",
        userEmail: user?.email || "N/A",
        title: course?.name || "N/A",
        price: "$" + (course?.price || 0),
      };
    });

    setOrderData(temp);
  }, [data, usersData, coursesData]);

  const columns: any = [
    { 
      field: "id", 
      headerName: "ID", 
      flex: 0.8,
      minWidth: 90
    },
    { 
      field: "userName", 
      headerName: "Name", 
      flex: 0.8,
      minWidth: 100
    },
    ...(isDashboard
      ? []
      : [
          { 
            field: "userEmail", 
            headerName: "Email", 
            flex: 1,
            minWidth: 200
          },
          { 
            field: "title", 
            headerName: "Course Title", 
            flex: 1,
            minWidth: 200
          },
        ]),
    { 
      field: "price", 
      headerName: "Price", 
      flex: 0.5,
      minWidth: 80,
      align: "right",
      headerAlign: "right"
    },
    ...(isDashboard
      ? []
      : [
          { 
            field: "created_at", 
            headerName: "Created At", 
            flex: 0.8,
            minWidth: 150
          },
        ]),
    {
      field: "email",
      headerName: "Action",
      flex: 0.4,
      minWidth: 70,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: any) => (
        <a 
          href={`mailto:${params.row.userEmail}`}
          className="flex items-center justify-center w-full h-full hover:opacity-70 transition-opacity"
        >
          <AiOutlineMail
            className="dark:text-white text-black"
            size={18}
          />
        </a>
      ),
    },
  ];

  const rows: any[] = orderData.map((item: any) => ({
    id: item._id,
    userName: item.userName,
    userEmail: item.userEmail,
    title: item.title,
    price: item.price,
    created_at: item.createdAt ? format(item.createdAt) : "",
  }));

  return (
    <div className={!isDashboard ? "mt-[120px]" : ""}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box height={isDashboard ? "400px" : "90vh"}>
          <Box
            height="100%"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
                fontSize: isDashboard ? "12px" : "14px",
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
                    ? "1px solid #ffffff15!important"
                    : "1px solid #e5e7eb!important",
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
                padding: "8px 12px",
                "&:focus": {
                  outline: "none",
                },
                "&:focus-within": {
                  outline: "none",
                },
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor:
                  theme === "dark" ? "#3e4396 !important" : "#A4A9FC !important",
                borderBottom: "none !important",
                color: theme === "dark" ? "#fff" : "#000",
                minHeight: "45px !important",
                maxHeight: "45px !important",
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
                fontSize: isDashboard ? "11px" : "13px",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F9FAFB",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                minHeight: "45px !important",
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
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                fontSize: isDashboard ? "11px" : "13px",
                margin: 0,
              },
            }}
          >
            <DataGrid
              checkboxSelection={!isDashboard}
              rows={rows}
              columns={columns}
              slots={isDashboard ? {} : { toolbar: GridToolbar }}
              disableRowSelectionOnClick
              rowHeight={isDashboard ? 40 : 52}
              hideFooterPagination={isDashboard}
              hideFooterSelectedRowCount={isDashboard}
              pageSizeOptions={isDashboard ? [5] : [5, 10, 20]}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: isDashboard ? 5 : 10 },
                },
              }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;