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

function App() {
    const setAuthInfo = (
        jwt: string,
        firstName: string,
        lastName: string
    ): void => {
        setAppState({ ...appState, jwt, firstName, lastName });
        console.log("setauthinfo called");
    };

    const [appState, setAppState] = useState({ ...initialState, setAuthInfo });

    return (
        <>
            <AppContextProvider value={appState}>
                <Header></Header>
                <main role="main" className="pb-3">
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
                        <Route path="/account/login" component={Login} />
                        <Route path="/account/register" component={Register} />

                        <Route component={PageNotFound} />
                    </Switch>
                </main>
                <Footer></Footer>
            </AppContextProvider>
        </>
    );
}

export default App;
