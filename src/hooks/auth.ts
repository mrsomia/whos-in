import { AuthorisedUser, SetUser } from "$/components/Providers";
import { useContext } from "react";

export function useUser() {
  const user = useContext(AuthorisedUser);
  return user;
}

export function useSetUser() {
  const dispathUser = useContext(SetUser);
  return dispathUser;
}
