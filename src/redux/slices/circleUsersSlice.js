import {createSlice} from '@reduxjs/toolkit';

const circleUsersSlice = createSlice({
  name: 'circleUsers',
  initialState: {
    data: {},
  },
  reducers: {
    setCircleUsersData(state, action) {
      state.data = action.payload;
    },
  },
});

export const {setCircleUsersData} = circleUsersSlice.actions;
export default circleUsersSlice.reducer;