import React from "react";

export interface IAppState {
    jwt: string | null;
    firstName: string;
    lastName: string;
    isAdmin: boolean;

    setAuthInfo: (
        jwt: string | null,
        firstName: string,
        lastName: string
    ) => void;
    setAdminStatus: (isAdmin: boolean) => void;
}

export const initialState: IAppState = {
    jwt: null,
    firstName: "",
    lastName: "",
    isAdmin: false,

    setAuthInfo: (): void => {},
    setAdminStatus: (): void => {},
};

export const AppContext = React.createContext<IAppState>(initialState);
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;
