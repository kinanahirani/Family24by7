import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import {persistReducer, persistStore} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whiteList: ['user'],
};

const persistedReducer = persistReducer(persistConfig, userSlice);

const rootReducer = combineReducers({
  user: persistedReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export const persistVal = persistStore(store);