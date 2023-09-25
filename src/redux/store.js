import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import {persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
import circleDataSlice from './slices/circleDataSlice';
import contactSlice from './slices/contactSlice';
import locationSlice from './slices/locationSlice';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whiteList: ['user', 'circleData'],
};

// const persistedReducer = persistReducer(persistConfig, userSlice);
// const persistedContactReducer = persistReducer(persistConfig, contactSlice);
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const persistedCircleDataReducer = persistReducer(persistConfig, circleDataSlice);

// const rootReducer = combineReducers({
//   user: persistedReducer,
//   // circleData: persistedCircleDataReducer,
//   circleData: circleDataSlice,
//   location:locationSlice
//   // contactData: persistedContactReducer
// });

// const store = configureStore({
//   reducer: rootReducer,
// });
const store = configureStore({
  reducer: persistedReducer,
});


export default store;
export const persistVal = persistStore(store);
