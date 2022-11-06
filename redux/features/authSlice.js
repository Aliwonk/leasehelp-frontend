import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserLogin = createAsyncThunk(
  "auth/fetchUserLogin",
  async (userData) => {
    const response = await fetch("http://unigi.site/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  }
);

export const fetchAdminLogin = createAsyncThunk(
  "auth/fetchAdminLogin",
  async (adminData) => {
    const response = await fetch("http://unigi.site/api/auth/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(adminData),
    });
    const result = await response.json();
    return result;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    role: typeof document !== 'undefined' ? document.cookie.replace(/(?:(?:^|.*;\s*)role\s*\=\s*([^;]*).*$)|^.*$/, "$1") : undefined,
    token: typeof document !== 'undefined' ? document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1") : undefined,
    isLoading: false,
  },
  reducers: {
    changeToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    // USER

    builder.addCase(fetchUserLogin.pending, (state, action) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.isLoading = false;
      }),
      builder.addCase(fetchUserLogin.rejected, (state, action) => {
        state.isLoading = false;
      });


    // ADMIN

    builder.addCase(fetchAdminLogin.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(fetchAdminLogin.fulfilled, (state, action) => {
        const { token, role, tokenExpires } = action.payload;
        if (token) {
          state.role = role;
          state.token = token;
          document.cookie = `role=${role}; max-age=${parseInt(tokenExpires.match(/\d+/))}; path=/admin; `;
          document.cookie = `token=${token}; max-age=${parseInt(tokenExpires.match(/\d+/))}; path=/admin; `;
        }
        state.isLoading = false;
      }),
      builder.addCase(fetchAdminLogin.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { changeToken } = authSlice.actions;
export default authSlice;
