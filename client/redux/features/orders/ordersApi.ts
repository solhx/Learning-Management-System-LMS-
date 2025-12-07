import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => ({
        url: "get-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "payment/stripepublishablekey",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
   getPaymentIntent: builder.mutation({
  query: (amount) => ({
    url: "payment",
    method: "POST",
    body: {
      amount,  // ✅ This is correct
    },
    credentials: "include" as const,
  }),
}),
    CreateOrder: builder.mutation({
      query: ({courseId,payment_info}) => ({
        url: "create-order",
        method: "POST",
        body: {
          courseId,
          payment_info,
        },
        credentials: "include" as const,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetStripePublishableKeyQuery,
  useGetPaymentIntentMutation,
  useCreateOrderMutation
} = ordersApi;
