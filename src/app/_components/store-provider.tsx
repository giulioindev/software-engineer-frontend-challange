"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { type AppStore, makeStore } from "@/lib/store";

type StoreProviderProps = {
  children: React.ReactNode;
};

export default function StoreProvider({
  children,
}: Readonly<StoreProviderProps>) {
  const storeRef = useRef<AppStore | null>(null);
  storeRef.current ??= makeStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
}
