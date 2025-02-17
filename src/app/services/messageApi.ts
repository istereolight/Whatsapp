import { api } from "./api";

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessage: builder.query({
      query: ({ apiTokenInstance }) => ({
        url: `/receiveNotification/${apiTokenInstance}?receiveTimeout=5`,
        method: 'GET'
      })
    }),
    getChatHistory: builder.mutation({
      query: ({chatId, apiTokenInstance}) => ({
        url: `/getChatHistory/${apiTokenInstance}`,
        method: 'POST',
        body: {
          "chatId": chatId,
          "count": 40
      }
      })
    }),
    getLastIncomingMessages: builder.query({
      query: ({ apiTokenInstance }) => ({
        url: `/lastIncomingMessages/${apiTokenInstance}?minutes=5000`,
        method: 'GET'
      })
    }),
    getLastOutgoingMessages: builder.query({
      query: ({ apiTokenInstance }) => ({
        url: `/lastOutgoingMessages/${apiTokenInstance}?minutes=5000`,
        method: 'GET'
      })
    }),
    sendTextMessage: builder.mutation({
      query: ({ chatId, message, apiTokenInstance }) => ({
        url: `/sendMessage/${apiTokenInstance}`,
        method: 'POST',
        body: {
          "chatId": chatId,
          "message": message
        }
      })
    }),
  })
})

export const {
  useGetMessageQuery,
  useLazyGetMessageQuery,
  useGetChatHistoryMutation,
  useGetLastIncomingMessagesQuery,
  useLazyGetLastIncomingMessagesQuery,
  useGetLastOutgoingMessagesQuery,
  useLazyGetLastOutgoingMessagesQuery,
  useSendTextMessageMutation
} = messageApi;

export const {
  endpoints : { getMessage, getChatHistory, getLastIncomingMessages, getLastOutgoingMessages, sendTextMessage } 
} = messageApi;