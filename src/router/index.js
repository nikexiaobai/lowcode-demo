import React from "react";
import { createBrowserRouter } from "react-router-dom";
const Lowcode = React.lazy(() => import("../pages/Lowcode.jsx"))
const NotFund = React.lazy(() => import("../pages/NotFund.jsx"));

export const router = createBrowserRouter([
    {
        path: "/lowcode",
        element: (
            <Lowcode />
        ),
    },
    {
        path: "*",
        element: <NotFund />,
    },
]);
