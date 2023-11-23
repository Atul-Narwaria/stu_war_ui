import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  isLoggedIn: boolean;
  role: any;
  isInstituteLogin: boolean;
  isTeacherLogin: boolean;
  isStudentLogin: boolean;
}

const initialState: AuthState = {
  isLoggedIn:
    Cookies.get("token") && Cookies.get("role") === "admin" ? true : false,
  role: Cookies.get("role") ? Cookies.get("role") : "null",
  isInstituteLogin:
    Cookies.get("token") && Cookies.get("role") === "institute" ? true : false,
  isTeacherLogin:
    Cookies.get("token") && Cookies.get("role") === "teacher" ? true : false,
  isStudentLogin:
    Cookies.get("token") && Cookies.get("role") === "student" ? true : false,
};

const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      if (Cookies.get("role") === "admin") {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    logout: (state) => {
      state.isInstituteLogin = false;
      state.isTeacherLogin = false;
      state.isStudentLogin = false;
      state.isLoggedIn = false;
    },
    instituteLogin: (state) => {
      if (Cookies.get("role") === "institute") {
        state.isInstituteLogin = true;
      } else {
        state.isInstituteLogin = false;
      }
    },
    teacherLogin: (state) => {
      if (Cookies.get("role") === "teacher") {
        state.isTeacherLogin = true;
      } else {
        state.isTeacherLogin = false;
      }
    },
    studentLogin: (state) => {
      if (Cookies.get("role") === "student") {
        state.isStudentLogin = true;
      } else {
        state.isStudentLogin = false;
      }
    },
    role: (state) => {
      state.role = Cookies.get("role") ? Cookies.get("role") : "null";
    },
  },
});

export const { login, logout, instituteLogin, teacherLogin, studentLogin } =
  authSlice.actions;
export default authSlice.reducer;
