import {createSlice} from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    data: {},
  },
  reducers: {
    setLocationData(state, action) {
      state.data = action.payload;
    },
  },
});

export const {setLocationData} = locationSlice.actions;
export default locationSlice.reducer;