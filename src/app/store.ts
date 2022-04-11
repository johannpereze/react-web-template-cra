import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
// Change Slice to Reducer because the export ir fooSlice.reducer
import counterReducer from "../components/counter/counterSlice";
import themeManagerReducer from "../components/managers/themeManagerSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    themeManager: themeManagerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
