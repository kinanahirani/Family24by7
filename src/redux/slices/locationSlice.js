import {createSlice} from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    latitude: null,
    longitude: null,
    address: '',
  },
  reducers: {
    setLocationData(state, action) {
      const { latitude, longitude, address } = action.payload;
      console.log(latitude, longitude, address,"..latitude, longitude, address in redux");
      state.latitude = latitude;
      state.longitude = longitude;
      state.address = address;
    },
  },
});

export const {setLocationData} = locationSlice.actions;
export default locationSlice.reducer;