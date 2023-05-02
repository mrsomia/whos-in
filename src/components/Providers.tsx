// eslint-disable-next-line prettier/prettier
"use client"

import { createContext, useState } from "react";

export type TAuthorisedUser = {};

export const AuthorisedUser = createContext<TAuthorisedUser | null>(null);

type ProviderProps = {
  children: JSX.Element | JSX.Element[];
};

export function Providers(props: ProviderProps) {
  const [user, setUser] = useState<TAuthorisedUser | null>(null);

  return (
    <AuthorisedUser.Provider value={{ user, setUser }}>
      {props.children}
    </AuthorisedUser.Provider>
  );
}
