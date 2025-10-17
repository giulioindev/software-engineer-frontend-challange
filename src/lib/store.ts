import { configureStore } from "@reduxjs/toolkit";
import { invoiceApi } from "@/features/invoices/invoice-service";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [invoiceApi.reducerPath]: invoiceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(invoiceApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
