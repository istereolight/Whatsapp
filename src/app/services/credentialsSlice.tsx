import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  idInstance: string,
  apiTokenInstance: string,
}

const initialState: InitialState = {
  idInstance : '',
  apiTokenInstance : ''
}

export const credentialsSlice = createSlice({
  name: 'createSlice',
  initialState: initialState,
  reducers: {
    credentials: (state, action) => {
      const { idInstance, apiTokenInstance } = action.payload;
      state.idInstance = idInstance;
      state.apiTokenInstance = apiTokenInstance;
    }
  }, 
}) 

export const { credentials } = credentialsSlice.actions;

export default credentialsSlice.reducer;