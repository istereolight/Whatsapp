import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import apiReducer from "./services/apiSlice";
import addCredentials from "./services/credentialsSlice";
import addNewChats from "./services/newChatSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    addChatHistory: apiReducer,
    credentials: addCredentials,
    newChats: addNewChats
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(api.middleware)
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>