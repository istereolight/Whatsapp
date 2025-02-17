import { api } from "./api";


export const serviceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContactData: builder.mutation({
      query: ({chatId, apiTokenInstance}) => ({
        url: `/GetContactInfo/${apiTokenInstance}`,
        method: 'POST',
        body: {
          "chatId": chatId
      }
      })
    }),
    getAvatar: builder.mutation({
      query: ({chatId, apiTokenInstance}) => ({
        url: `/getAvatar/${apiTokenInstance}`,
        method: 'POST',
        body : {
          "chatId": chatId
        }
      })
    }),
    getGroupData: builder.mutation({
      query: ({groupId, apiTokenInstance}) => ({
        url: `/getGroupData/${apiTokenInstance}`,
        method: 'POST',
        body: {
          "groupId": groupId
        }
      })
    }),
    getAccountSettings: builder.query({
      query: ({ apiTokenInstance }) => ({
        url: `/getSettings/${apiTokenInstance}`,
        method: 'GET'
      })
    }),
  })
})

export const {
  useGetContactDataMutation,
  useGetAvatarMutation,
  useGetGroupDataMutation,
  useGetAccountSettingsQuery,
  useLazyGetAccountSettingsQuery
} = serviceApi;

export const {
  endpoints : { getContactData, getAvatar, getGroupData, getAccountSettings } 
} = serviceApi;