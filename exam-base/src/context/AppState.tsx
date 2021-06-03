import React from "react";

export interface IAppState {
    jwt: string | null;
    firstName: string;
    lastName: string;
    role: string | null;

    setAuthInfo: (
        jwt: string | null,
        firstName: string,
        lastName: string
    ) => void;
    setRoles: (role: string | null) => void;
}

export const initialState: IAppState = {
    jwt: null,
    firstName: "",
    lastName: "",
    role: null,

    setAuthInfo: (): void => {},
    setRoles: (): void => {},
};

export const AppContext = React.createContext<IAppState>(initialState);
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;
