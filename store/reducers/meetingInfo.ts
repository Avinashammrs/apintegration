import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { GET_MEETINGS_DETAILS_API } from "@/utils/API";
import { MeetingInfoState } from "./type"; 


export const getMeetingDetails = createAsyncThunk<
  Record<string, any>[], // Return type of the payload
  { from_date: string; to_date: string }, // Argument type passed to the thunk
  { rejectValue: string } // Type of the rejection value
>(
  'dashboard/meetings_info',
  async ({ from_date, to_date }, thunkAPI) => {
    try {
      const response = await GET_MEETINGS_DETAILS_API({ from_date, to_date });
      return response;
    } catch (error: any) {
      console.error("getMeetingDetails failed:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Initial state for the slice
const initialState: MeetingInfoState = {
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
      .addCase(getMeetingDetails.fulfilled, (state, action: PayloadAction<Record<string, any>[]>) => {
        state.status = 'succeeded';
        state.meetings = action.payload;
      })
      .addCase(getMeetingDetails.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || "An unknown error occurred.";
      });
  },
});

export default meetingsSlice.reducer;