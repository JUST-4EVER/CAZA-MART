import { IoIosArrowForward } from "react-icons/io"
import { Link } from "react-router-dom"
import { useGetCustomerOrderQuery } from "../redux/slices/orderSlices";
import { useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const CustomerOrders = () => {
  const { data: orders = [], isLoading } = useGetCustomerOrderQuery();
  const getOrders = orders?.getCustomerOrder || [];
  const [searchText, setSearchText] = useState('');
  console.log("customer orders", getOrders);
  console.log("orders", orders);
  const filteringData = getOrders?.filter(res => {
    return res?.product_name.toLowerCase().includes(searchText.toLowerCase());
  })


  const columns = [
    { field: 'product_name', headerName: 'Name', width: 150 },
    {
      field: 'thumbnail', headerName: 'Image', width: 150,
      renderCell: (params) => (
        <img className="w-10 h-10 rounded-full object-center bg-cover" src={params?.value} alt="" />
      )
    },
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
    <div className="relative">
      <div className="w-full flex flex-row justify-start items-center gap-2 md:gap-5 text-base font-light md:text-lg md:font-normal">
        <Link className=" hover:text-[#FF6F61] transition-all ease-in-out" to='/'>Home</Link>
        <IoIosArrowForward className="inline" size={14} />
        <Link className=" hover:text-[#FF6F61] transition-all ease-in-out" to='/my-account'>My account</Link>
        <IoIosArrowForward className="inline" size={14} />
        <span>My orders</span>
      </div>

      {
        getOrders.length > 0 ?
          (
            <div>
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
          )
          : (
            <div className="w-full flex flex-row justify-center items-center mt-40">
              <h1 className="w-full text-center">
                <span className="inline text-base font-light">you don't have order</span>
                <Link className="inline text-base font-medium text-red-500" to='/shop'>shop now</Link>
              </h1>
            </div>
          )
      }
    </div>
  )
}

export default CustomerOrders