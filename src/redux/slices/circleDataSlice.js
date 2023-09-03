import {createSlice} from '@reduxjs/toolkit';

const circleDataSlice = createSlice({
  name: 'circleData',
  initialState: {
    data: {},
  },
  reducers: {
    setCircleData(state, action) {
      state.data = action.payload;
    },
  },
});

export const {setCircleData} = circleDataSlice.actions;
export default circleDataSlice.reducer;