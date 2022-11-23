import { createContext } from "react";

interface UserContext {
  accountAddress: string | null;
}

export const UserContext = createContext<[UserContext | null, any]>([
  null,
  null,
]);
