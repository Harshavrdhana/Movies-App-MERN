import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react"; //is used to set up a listener for Redux Query.
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import moviesReducer from '../redux/features/movies/moviesSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    movies: moviesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch); //listening to store
export default store;
