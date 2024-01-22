import { Link } from 'react-router-dom'
import { useDeleteUserMutation, useGetUsersQuery } from '../redux/slices/UserSlices'
import { useState } from 'react';
import { DataGrid } from "@mui/x-data-grid"
import { styled } from '@mui/system';
import { MdDelete, MdEdit } from "react-icons/md"
import toast from 'react-hot-toast';
const Users = () => {
    const [searchText, setSearchText] = useState('');
    const { data } = useGetUsersQuery();
    console.log('data', data);
    const [deleteUser] = useDeleteUserMutation();
    const users = data?.users || [];
    const filteringData = users?.filter(res => {
        return res.username.toLowerCase().includes(searchText.toLowerCase());
    })
    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete')) {
            await deleteUser(id).then((res) => {
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
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'username', headerName: 'Username', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'role', headerName: 'Role', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 },
        {
            field: 'action', headerName: 'Actions', width: 150,
            renderCell: (params) => (
                <>
                    <Link to={`/dashboard/user-form/${params.row.id}`} state={params.row}>
                        <MdEdit size={20} className="cursor-pointer" />
                    </Link>
                    <MdDelete
                        size={20}
                        className="cursor-pointer ml-2"
                        onClick={() => handleDelete(params.row.id)}
                    />
                </>
            ),
        },
    ];
    return (
        <div className="w-full p-3">
            <div className="w-[95%] mx-auto lg:w-[80%] lg:ml-[18%] mt-10 shadow rounded border border-slate-100 p-4">
                <div className="w-full flex flex-row justify-between items-center">
                    <h1 className="text-lg font-medium tracking-widest">User Lists </h1>
                    <Link to='/dashboard/user-form' className="px-4 py-2 shadow text-base font-thin rounded bg-[#FF6F61] text-white">Add User</Link>
                </div>
                <div className="w-full md:w-[50%] mt-4">
                    <input type="text" className="w-full px-3 py-2 rounded border outline-blue-600" placeholder="search doctor name ..."
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
                        getRowId={(row) => row.id}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection />
                </div>
            </div>
        </div>
    )
}

export default Users