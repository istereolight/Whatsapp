import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = async (args, api, extraOptions) => {
  const state = api.getState();
  const idInstance = state.credentials.idInstance; 

  const adjustedBaseQuery = fetchBaseQuery({
    baseUrl: `https://1103.api.green-api.com/waInstance${idInstance}`,
  });

  return adjustedBaseQuery(args, api, extraOptions);
};

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});