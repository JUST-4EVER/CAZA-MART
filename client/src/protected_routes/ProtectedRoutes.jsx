import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
export const globalRoutes = () => {
    const [auth, setAuth] = useState(false);
    const userToken = Cookies.get('userToken')
    const customerToken = Cookies.get('customerToken')

    useEffect(() => {
        if (userToken || customerToken) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, [])


    if (!auth) {
        return <Navigate to='/customer-login' />
    }
    return <Outlet />
}
export const specialRoutes = () => {
    const [auth, setAuth] = useState(false);
    const userToken = Cookies.get('userToken')

    useEffect(() => {
        if (userToken) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, [])

    if (!auth) {
        return <Navigate to='/user-login' />
    }

    return <Outlet />

}