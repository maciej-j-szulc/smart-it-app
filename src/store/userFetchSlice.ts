import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface User {
    id: number,
    name: string,
    username: string,
    email: string,
    phone: string
}

interface UserState{
    users: User[],
    loading: boolean,
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (state, thunkAPI) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if(!response.ok){
            return thunkAPI.rejectWithValue('Failed to fetch users');
        }
        const data: User[] = await response.json();
        return data;
    }
)

const userFetchSlice = createSlice({
    name: 'usersFetch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default userFetchSlice.reducer;