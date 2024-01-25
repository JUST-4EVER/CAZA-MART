import { Box, Skeleton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid"
import { useGetCustomersQuery } from "../redux/slices/CustomerSlices";
import { useState } from "react";

const Customers = () => {
    const [searchText, setSearchText] = useState('');
    const { data, isLoading } = useGetCustomersQuery();
    const customers = data?.customers || [];
    console.log('customers', customers);
    const filteringData = customers?.filter(res => {
        return res.username.toLowerCase().includes(searchText.toLowerCase());
    })

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'username', headerName: 'Username', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        {
            field: 'fullName', headerName: 'Full Name', width: 150,
            valueGetter: (params) => {
                return params.row.customerProfiles.map(profile => `${profile.fname} ${profile.lname}`).join(', ');
            }
        },
        {
            field: 'address', headerName: 'Address', width: 150,
            valueGetter: (params) => {
                return params.row.customerProfiles.map(profile => profile.address).join(', ');
            }
        },
        {
            field : 'phone', headerName: 'Phone', width: 150,
            valueGetter: (params) => {
                return params.row.customerProfiles.map(profile => profile.phone).join(',')
            }
        },{
            field : 'sex', headerName : 'Sex', width:150,
            valueGetter : (params) => {
                return params.row.customerProfiles.map( profile => profile.sex).join(',')
            }
        }
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
            <div className="w-[95%] mx-auto lg:w-[80%] lg:ml-[18%] mt-10 shadow rounded border border-slate-100 p-4">
                <div className="w-full flex flex-row justify-start items-center">
                    <h1 className="text-lg font-medium tracking-widest">Customer Lists </h1>
                </div>
                <div className="w-full md:w-[50%] mt-4">
                    <input type="text" className="w-full px-3 py-2 rounded border outline-[#FF6F61]" placeholder="Search Customer's username ..."
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

export default Customers