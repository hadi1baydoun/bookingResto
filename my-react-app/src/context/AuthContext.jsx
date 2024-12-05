

import { createContext, useEffect, useReducer } from "react";
import axios from "axios";


// Initial state for the AuthContext
const INITIAL_STATE = {
    user: null, // User data, fetched from the API or localStorage
    loading: false, // Indicates whether a login or fetch operation is in progress
    error: null, // Stores errors from failed operations
    ready: false, // Indicates whether the app has completed the initial user fetch
};

// Create the AuthContext
export const AuthContext = createContext(INITIAL_STATE);

// Reducer to handle various actions
const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return { ...state, user: null, loading: true, error: null };
        case "LOGIN_SUCCESS":
            return { ...state, user: action.payload, loading: false, error: null };
        case "LOGIN_FAILURE":
            return { ...state, user: null, loading: false, error: action.payload };
        case "LOGOUT":
            return { ...state, user: null, loading: false, error: null };
        case "FETCH_USER_START":
            return { ...state, loading: true, error: null };
        case "FETCH_USER_SUCCESS":
            return { ...state, user: action.payload, loading: false, ready: true };
        case "FETCH_USER_FAILURE":
            return { ...state, user: null, loading: false, ready: true, error: action.payload };
        default:
            return state;
    }
};

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    // Fetch the user profile when the app initializes
    useEffect(() => {
        const fetchUserProfile = async () => {
            dispatch({ type: "FETCH_USER_START" });
            try {
                const response = await axios.get("/profile");
                dispatch({ type: "FETCH_USER_SUCCESS", payload: response.data.userData });
            } catch (error) {
                dispatch({ type: "FETCH_USER_FAILURE", payload: error.response?.data || "Failed to fetch user profile" });
            }
        };

        if (!state.user) {
            fetchUserProfile();
        }
    }, [state.user]);

    // Save the user data to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    // Login function
    const login = async (credentials) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/api/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || "Login failed" });
        }
    };

    // Logout function
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                ready: state.ready,
                dispatch,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
