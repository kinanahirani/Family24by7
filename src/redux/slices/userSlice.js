import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
  },
  reducers: {
    setUserData(state, action) {
      state.data = action.payload;
    },
    updateActiveCircleCode(state, action) {
      state.data.activeCircleCode = action.payload.activeCircleCode;
    },
  },
});

export const {setUserData, updateActiveCircleCode} = userSlice.actions;
export default userSlice.reducer;
