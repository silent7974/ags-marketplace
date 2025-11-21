// redux/services/pickupApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pickupApi = createApi({
  reducerPath: "pickupApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getPickupStations: builder.query({
      query: () => "/pickupStations",
    }),
  }),
});

export const { useGetPickupStationsQuery } = pickupApi;