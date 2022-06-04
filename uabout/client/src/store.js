import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./reducers/mainSlice";

// don't delete
export default configureStore({
  reducer: {
    main: mainSlice.reducer
  }
});