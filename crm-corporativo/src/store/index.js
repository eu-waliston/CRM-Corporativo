import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import leadsReducer from './slices/leadsSlice';
import contactsReducer from './slices/contactsSlice';
import dealsReducer from './slices/dealsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        // reducer: authReducer,
        auth: authReducer,
        leads: leadsReducer,
        contacts: contactsReducer,
        deals: dealsReducer,
        ui: uiReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializable: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;