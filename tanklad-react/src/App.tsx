import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Switch } from "react-router-dom";
import HomeIndex from "./containers/home/HomeIndex";
import GasStationsIndex from "./containers/gasstations/GasStationsIndex";
import Login from "./containers/account/Login";
import Register from "./containers/account/Register";
import PageNotFound from "./containers/Page404";
import GasStationDetails from "./containers/gasstations/GasStationDetails";
import { AppContextProvider, initialState } from "./context/AppState";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import FavoriteGasStations from "./containers/gasstations/FavoriteGasStations";
import Profile from "./containers/account/Profile";
import Discounts from "./containers/account/Discounts";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

function App() {
    library.add(fab);
    const setAuthInfo = (
        jwt: string | null,
        firstName: string,
        lastName: string
    ): void => {
        let user: any = "";
        let roles: string | null = null;
        if (jwt) {
            user = jwtDecode(jwt ?? "");
            roles =
                user[
                    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ] ?? null;
        }
        setAppState({
            ...appState,
            jwt,
            firstName,
            lastName,
            isAdmin: roles?.includes("Admin") ?? false,
        });
    };

    const setAdminStatus = (isAdmin: boolean) => {
        setAppState({ ...appState, setAdminStatus });
    };

    const [appState, setAppState] = useState({
        ...initialState,
        setAuthInfo,
        setAdminStatus,
    });

    return (
        <>
            <AppContextProvider value={appState}>
                <Header></Header>
                <main id="main" role="main" className="pb-3">
                    <Switch>
                        <Route exact path="/" component={HomeIndex} />
                        <Route
                            path="/gasstation/:id"
                            component={GasStationDetails}
                        />
                        <Route
                            path="/gasstations"
                            component={GasStationsIndex}
                        />
                        <Route
                            path="/favoritegasstations"
                            component={FavoriteGasStations}
                        />
                        <Route path="/account/login" component={Login} />
                        <Route path="/account/register" component={Register} />
                        <Route path="/account/cards" component={Discounts} />
                        <Route path="/account" component={Profile} />
                        <Route component={PageNotFound} />
                    </Switch>
                </main>
                <Footer></Footer>
            </AppContextProvider>
        </>
    );
}

export default App;
