import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducers/mainSlice";

// don't delete
export default configureStore({
  reducer: {
    main: mainReducer
  }
});