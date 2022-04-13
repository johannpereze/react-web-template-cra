import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../components/counter/counterSlice";
// Change Slice to Reducer because the export ir fooSlice.reducer
import themeManagerReducer from "../components/managers/themeManagerSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  themeManager: themeManagerReducer,
});

export default rootReducer;
