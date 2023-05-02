import { AuthorisedUser } from "$/components/Providers";
import { useContext } from "react";

export function useUser() {
  const { user, setUser } = useContext(AuthorisedUser);
  return user;
}
