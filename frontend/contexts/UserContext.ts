import { createContext } from "react";

interface UserContext {
  address: string | null;
}

export const UserContext = createContext<[UserContext | null, any]>([
  null,
  null,
]);
