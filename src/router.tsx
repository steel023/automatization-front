import {createBrowserRouter, redirect} from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout.tsx";
import UserLayout from "./layouts/UserLayout.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import MainPage from "./pages/MainPage.tsx";

import {mainLoader} from './pages/mainPageLoader.ts'

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <></>,
        children: [
            {
                element: <AuthLayout/>,
                loader: unauthenticatedLoader,
                children: [
                    {path: '/auth/login', element: <LoginPage/>},
                    {path: '/auth/register', element: <RegisterPage/>},
                ]
            },
            {
                element: <UserLayout/>,
                loader: authenticatedLoader,
                children: [
                    {
                        path: '',
                        element: <MainPage/>,
                        loader: mainLoader,
                    },
                ]
            },
        ]
    }
])

function unauthenticatedLoader() {
    if (localStorage.getItem("access_token")) {
        return redirect("/");
    }

    return null;
}

function authenticatedLoader() {
    if (!localStorage.getItem("access_token")) {
        return redirect("/auth/login");
    }

    return null;
}