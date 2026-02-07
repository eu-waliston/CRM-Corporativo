import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { mockApi } from '../../api/mock'

// export const login = createAsyncThunk(
//     'auth/login',
//     async ({ email, password }, { rejectWithValue }) => {
//         try {
//             console.log('🚀 LOGIN THUNK START', email, password);
//             console.log('🌍 NODE_ENV:', process.env.NODE_ENV);
//             // Em desenvolvimento, usa o mock
//             if (process.env.NODE_ENV === 'true') {
//                 const response = await mockApi.login({ email, password });
//                 const { token, user } = response;
//                 localStorage.setItem('token', token);
//                 localStorage.setItem('user', JSON.stringify(user));
//                 return { token, user };
//             } else {
//                 // Em produção, usa a API real
//                 const response = await api.post('/auth/login', { email, password });
//                 const { token, user } = response.data;
//                 localStorage.setItem('token', token);
//                 localStorage.setItem('user', JSON.stringify(user));
//                 return { token, user };
//             }
//         } catch (error) {
//             return rejectWithValue(error.message || error.response?.data?.message || 'Login failed');
//         }
//     }
// );

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log('🚀 LOGIN THUNK START', email, password);
      console.log('🌍 NODE_ENV:', process.env.NODE_ENV);

      if (process.env.NODE_ENV === 'development') {
        const response = await mockApi.login({ email, password });
        console.log('✅ MOCK RESPONSE:', response);

        const { token, user } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        return { token, user };
      }

      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };

    } catch (error) {
      console.error('❌ LOGIN ERROR:', error);
      return rejectWithValue(
        error.message || error.response?.data?.message || 'Login failed'
      );
    }
  }
);


export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;