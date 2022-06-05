import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducers/mainSlice";
import { getDefaultMiddleware } from '@reduxjs/toolkit';

// don't delete
export default configureStore({
  reducer: {
    main: mainReducer
  },
  middleware: getDefaultMiddleware({serializableCheck: false})
});