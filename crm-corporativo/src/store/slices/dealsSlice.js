import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchDeals = createAsyncThunk(
  'deals/fetchDeals',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/deals', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch deals');
    }
  }
);

export const createDeal = createAsyncThunk(
  'deals/createDeal',
  async (dealData, { rejectWithValue }) => {
    try {
      const response = await api.post('/deals', dealData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create deal');
    }
  }
);

export const updateDeal = createAsyncThunk(
  'deals/updateDeal',
  async ({ id, ...dealData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/deals/${id}`, dealData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update deal');
    }
  }
);

export const deleteDeal = createAsyncThunk(
  'deals/deleteDeal',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/deals/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete deal');
    }
  }
);

export const updateDealStage = createAsyncThunk(
  'deals/updateDealStage',
  async ({ id, stage }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/deals/${id}/stage`, { stage });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update deal stage');
    }
  }
);

const dealsSlice = createSlice({
  name: 'deals',
  initialState: {
    items: [],
    selectedDeal: null,
    loading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 10,
    filters: {
      stage: '',
      value_min: '',
      value_max: '',
      search: '',
    },
    stages: [
      { id: 'prospecting', name: 'Prospecção', color: 'bg-blue-100 text-blue-800', order: 1 },
      { id: 'qualification', name: 'Qualificação', color: 'bg-yellow-100 text-yellow-800', order: 2 },
      { id: 'proposal', name: 'Proposta', color: 'bg-purple-100 text-purple-800', order: 3 },
      { id: 'negotiation', name: 'Negociação', color: 'bg-orange-100 text-orange-800', order: 4 },
      { id: 'closed_won', name: 'Fechado (Ganho)', color: 'bg-green-100 text-green-800', order: 5 },
      { id: 'closed_lost', name: 'Fechado (Perdido)', color: 'bg-red-100 text-red-800', order: 6 },
    ],
  },
  reducers: {
    setSelectedDeal: (state, action) => {
      state.selectedDeal = action.payload;
    },
    clearSelectedDeal: (state) => {
      state.selectedDeal = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        stage: '',
        value_min: '',
        value_max: '',
        search: '',
      };
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateDealLocal: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Deals
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data || action.payload;
        state.total = action.payload.total || action.payload.length;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Deal
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Deal
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedDeal?.id === action.payload.id) {
          state.selectedDeal = action.payload;
        }
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Deal
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.total -= 1;
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Deal Stage
      .addCase(updateDealStage.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedDeal?.id === action.payload.id) {
          state.selectedDeal = action.payload;
        }
      });
  },
});

export const {
  setSelectedDeal,
  clearSelectedDeal,
  setFilters,
  clearFilters,
  setPage,
  clearError,
  updateDealLocal,
} = dealsSlice.actions;

export default dealsSlice.reducer;