import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GET_MEETINGS_DETAILS_API } from "@/utils/API";

// Define the async thunk for fetching meeting details
export const getMeetingDetails = createAsyncThunk(
  'dashboard/meetings_info',
  async ({ from_date, to_date }, thunkAPI) => {
    try {
      const response = await GET_MEETINGS_DETAILS_API({ from_date, to_date });
      return response;
    } catch (error) {
      console.error("getMeetingDetails failed:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Initial state for the slice
const initialState = {
  meetings: [],
  status: 'idle',
  error: null,
};

// Create the meetings slice
const meetingsSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMeetingDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMeetingDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.meetings = action.payload;
      })
      .addCase(getMeetingDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default meetingsSlice.reducer;
