import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './features/charactersSlice';

const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});

export default store;
