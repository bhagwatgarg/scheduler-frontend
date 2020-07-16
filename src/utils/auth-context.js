import { createContext } from "react";

export const AuthContext = createContext({
	authState: null,
	login: () => {},
	logout: () => {},
});