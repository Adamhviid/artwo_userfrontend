import App from "./App.jsx";
import Login from "./pages/login/Login";

export default [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <Login />,
    },
];
