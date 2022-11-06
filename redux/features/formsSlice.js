import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

export const sendFiles = createAsyncThunk("forms/sendFiles", async (data) => {
    const { token, files } = data;
    console.log(files);
    const formData = new FormData();
    files.map(file => {
        formData.append('files', file);
    });
    
    const response = await fetch('http://localhost:3002/files/upload/1', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}` 
        },
        body: formData
    });

    const result = await response.json();
    // console.log(result);
    return result;
});

const formSlice = createSlice({
  name: "forms",
  initialState: {
    formFiles: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendFiles.fulfilled, (state, action) => {
        console.log(action);
    })
    builder.addCase(sendFiles.rejected, (state, action)=> {
        console.log(action);
    })
  },
});

export default formSlice;
