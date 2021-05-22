import React from "react";

export interface IAppState {
    jwt: string | null;
    firstName: string;
    lastName: string;

    setAuthInfo: (jwt: string, firstName: string, lastName: string) => void;
}

export const initialState: IAppState = {
    jwt: null,
    firstName: "",
    lastName: "",

    setAuthInfo: (): void => {},
};

export const AppContext = React.createContext<IAppState>(initialState);
export const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;
