"use client";

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';

/**
 * This is a client-side component that provides the Redux store to its children.
 * It's used in the root layout to wrap the application with Redux.
 */
export function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
