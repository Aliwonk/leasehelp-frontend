import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import formSlice from './features/formsSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        forms: formSlice.reducer,
    }
})