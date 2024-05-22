"use client";
import { ACCESS_TOKEN } from "@/constants/ENVIRONMENT_VARIABLES";
import {LOGIN_API } from "@/utils/API";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Cookies from "js-cookie"; // Import the js-cookie library


interface LoginResponse {
  access_token: string;
  user_email: string;
  user_id: string;
  refresh_token: string;
}

// Helper function to handle common async thunk logic
const createAsyncThunkHandler = <Returned, ThunkArg>(
  apiFunction: (data: ThunkArg) => Promise<Returned>,
  propName: string,
  onLoginSuccess?: (response: Returned) => void
) =>
  createAsyncThunk<Returned, ThunkArg>(
    `dashboard/${propName}`,
    async (data, thunkAPI) => {
      try {
        const response = await apiFunction(data);

        // If there's a login success callback, call it with the response
        if (onLoginSuccess && propName === "login") {
          onLoginSuccess(response);
        }

        return response;
      } catch (error: any) {
        console.error(`${propName} failed:`, error);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


  export const userlogin = createAsyncThunkHandler<LoginResponse, Record<string, any>>(
    LOGIN_API,
    "login",
    (response) => {
      const { access_token, user_email, user_id, refresh_token } = response;
      const accessTokenName: string = ACCESS_TOKEN || '';
      Cookies.set(
        accessTokenName,
        JSON.stringify({ access_token, user_email, user_id, refresh_token })
      );
      window.location.href = '/';
    }
  );
  

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    login: {},
    logout: {},
    loading: false,
    loginDetails:{}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("dashboard/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("dashboard/") &&
          action.type.endsWith("/fulfilled"),
        (state:any, action:any) => {
          state.loading = false;
          const propName = action.type.split("/")[1]; // Extract property name from action type
          state[propName] = action.payload;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("dashboard/") &&
          action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const dashboardSelector = (state:any) => state.dashboard;
export default dashboardSlice.reducer;
