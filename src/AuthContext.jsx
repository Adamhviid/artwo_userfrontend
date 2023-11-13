import { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const initialState = {
    isAuthenticated: false,
    user: null,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            axios
                .get(`${import.meta.env.VITE_URL}/user/verify`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                })
                .then((response) => {
                    login(response.data);
                });
        }
    }, []);

    const login = (user) => {
        dispatch({
            type: LOGIN,
            payload: user,
        });
    };

    const logout = () => {
        dispatch({
            type: LOGOUT,
        });
    };

    return (
        <AuthContext.Provider value={{ state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};
