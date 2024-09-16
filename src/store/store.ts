import { configureStore } from '@reduxjs/toolkit';
import userFetchReducer from './userFetchSlice';
import userFilterReducer from './userFilterSlice';

export const store = configureStore({
    reducer: {
        users: userFetchReducer,
        userFilter: userFilterReducer, 
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;