import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'


interface AuthState {
    isLoggedIn: boolean;
    role: any;
    isInstituteLogin: boolean;
}

const initialState: AuthState = {
    isLoggedIn: (Cookies.get("token") && Cookies.get("role") === 'admin') ? true : false,
    role: Cookies.get("role") ? Cookies.get("role") : "null",
    isInstituteLogin: (Cookies.get("token") && Cookies.get("role") === 'institute') ? true : false,

};

const authSlice: any = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            if (Cookies.get("role") === "admin") {
                state.isLoggedIn = true;
            } else {
                state.isLoggedIn = false
            }

        },
        logout: (state) => {
            state.isInstituteLogin = false;
            state.isLoggedIn = false;
        },
        instituteLogin: (state) => {
            if (Cookies.get("role") === "institute") {
                state.isInstituteLogin = true
            } else {
                state.isInstituteLogin = false
            }
        },

        role: (state) => {
            state.role = Cookies.get("role") ? Cookies.get("role") : "null"
        }
    },
});

export const { login, logout, instituteLogin } = authSlice.actions;
export default authSlice.reducer;