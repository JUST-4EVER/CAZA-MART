import { Box, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDeleteOrderMutation, useGetOrdersQuery } from "../redux/slices/orderSlices";

const Orders = () => {
  const { data: orders = [], isLoading } = useGetOrdersQuery();
  const getOrders = orders?.getOrders || [];
  const [deleteOrder] = useDeleteOrderMutation()
  const [searchText, setSearchText] = useState('');
  const filteringData = getOrders?.filter(res => {
    return res?.product_name.toLowerCase().includes(searchText.toLowerCase());
  })
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete')) {
      await deleteOrder(id).then((res) => {
        const status = res?.data?.status;
        const message = res?.data?.message;
        if (status) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  const columns = [
    { field: 'product_name', headerName: 'Name', width: 150 },
    { field: 'thumbnail', headerName: 'Image', width: 150,
  renderCell : (params) => (
    <img className="w-10 h-10 rounded-full object-center bg-cover" src={params?.value} alt="" />
  ) },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    {
      field: 'total', headerName: 'Total', width: 150,
      renderCell: (params) => (
        <span>{params?.value / 100}</span>
      )
    },
    {
      field: 'payment_status', headerName: 'Payment_status', width: 150,
      renderCell: (params) => (
        <span className={`${params?.value == 'paid' ? 'bg-green-600 px-5 py-2 text-white rounded ' : 
        'bg-red-600 px-5 py-2 text-white rounded '}`}>{params?.value}</span>
      )
    },
    { field: 'delivery_status', headerName: 'Delivery_status', width: 150 },
    // {
    //   field: 'action', headerName: 'Actions', width: 150,
    //   renderCell: (params) => (
    //     <>
    //       <Link to={`/dashboard/order-form/${params.row.id}`} state={params.row}>
    //         <MdEdit size={20} className="cursor-pointer" />
    //       </Link>
    //       <MdDelete
    //         size={20}
    //         className="cursor-pointer ml-2"
    //         onClick={() => handleDelete(params.row.id)}
    //       />
    //     </>
    //   ),
    // },
  ];

  const LoadingSkeleton = () => (
    <Box
      sx={{
        height: "max-content"
      }}
    >
      {[...Array(10)].map((_, index) => (
        <Skeleton key={index} variant="rectangular" sx={{ my: 4, mx: 1 }} />
      ))}
    </Box>
  );


  return (
    <div className="w-full p-3">
      <div className="w-[90%] mx-auto lg:w-[80%] lg:ml-[18%] mt-10 shadow 
        rounded border border-slate100 p-4">
        <h1>Orders</h1>

        <div className="w-full md:w-[50%] mt-4">
          <input type="text" className="w-full px-3 py-2 rounded border outline-[#FF6F61]" placeholder="Search Product name  ..."
            onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <div className="mt-10 w-full h-[400px]">
          <DataGrid
            rows={filteringData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            components={{
              LoadingOverlay: LoadingSkeleton
            }}
            getRowId={(row) => row.id}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default Orders