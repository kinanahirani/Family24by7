import {createSlice} from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    data: {},
  },
  reducers: {
    setContactData(state, action) {
      console.log('setContactData Action Payload:', JSON.stringify(action.payload));
      state.data = action.payload;
    },
  },
});

export const {setContactData} = contactSlice.actions;
export default contactSlice.reducer;