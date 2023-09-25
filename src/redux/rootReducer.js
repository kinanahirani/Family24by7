import {combineReducers} from 'redux';
import userSlice from './slices/userSlice';
import circleDataSlice from './slices/circleDataSlice';
import locationSlice from './slices/locationSlice';

const rootReducer = combineReducers({
  user: userSlice,
  circle: circleDataSlice,
  location: locationSlice,
});

export default rootReducer;
