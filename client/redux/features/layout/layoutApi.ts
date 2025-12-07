// redux/features/layout/layoutApi.ts
import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type: string) => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
      providesTags: ["Layout"],
    }),
    editLayout: builder.mutation({
      query: (data) => ({
        url: "edit-layout",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      invalidatesTags: ["Layout"],
    }),
  }),
});

export const { useGetHeroDataQuery, useEditLayoutMutation } = layoutApi;