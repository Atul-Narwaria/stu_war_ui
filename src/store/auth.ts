import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const AuthState = {
    admin: Cookies.get("admin") || null,

}

const authSlice = createSlice({
    name: "authentication",
    initialState: AuthState,
    reducers: {
        adminlogin(state: any) {
            state.admin = "admin"
        }
    }
})

export const authAction = authSlice.actions;
export default authSlice.reducer;