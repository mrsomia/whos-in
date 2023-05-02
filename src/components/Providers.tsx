// eslint-disable-next-line prettier/prettier
"use client"

import { Dispatch, createContext, useReducer } from "react";

export type TAuthorisedUser = {};

export const AuthorisedUser = createContext<TAuthorisedUser | null>(null);
export const SetUser = createContext<Dispatch<ACTIONTYPE> | null>(null);

type ProviderProps = {
  children: React.ReactNode;
};

const initialUserState: TAuthorisedUser | null = null;

type ACTIONTYPE =
  | { type: "signout" }
  | { type: "signin"; payload: TAuthorisedUser };

function userReducer(_state: typeof initialUserState, action: ACTIONTYPE) {
  switch (action.type) {
    case "signout":
      return null;
    case "signin":
      return action.payload;
  }
}

export function Providers(props: ProviderProps) {
  const [state, dispath] = useReducer(userReducer, initialUserState);

  return (
    <AuthorisedUser.Provider value={{ state }}>
      <SetUser.Provider value={dispath}>{props.children}</SetUser.Provider>
    </AuthorisedUser.Provider>
  );
}
