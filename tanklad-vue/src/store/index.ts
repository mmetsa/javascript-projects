import { createStore } from "vuex";
import axios from "axios";
import { IGasStation } from "@/domain/IGasStation";
import { IAppState } from "@/domain/IAppState";
import { ILoginInfo } from "@/domain/ILoginInfo";
import { IJwtResponse } from "@/domain/IJwtResponse";

export const initialState: IAppState = {
    token: null,
    firstname: "",
    lastname: "",
    gasstations: []
};

export default createStore({
    state: initialState,
    getters: {},
    mutations: {
        logOut: (state: IAppState) => {
            state.token = null;
            state.firstname = "";
            state.lastname = "";
        },
        logIn: (state: IAppState, jwtResponse: IJwtResponse) => {
            state.token = jwtResponse.token;
            state.firstname = jwtResponse.firstname;
            state.lastname = jwtResponse.lastname;
        },
        loadGasStations: (state: IAppState, gasStations: IGasStation[]) => {
            state.gasstations = gasStations;
        }
    },
    actions: {
        async logIn(context, login: ILoginInfo) {
            const loginData = JSON.stringify(login);
            const response = await axios.post(
                "https://localhost:5001/api/v1/Account/login",
                loginData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            if (response.status === 200) {
                context.commit("logIn", response.data);
            }
        },
        async loadGasStations(context) {
            const response = await axios.get(
                "https://localhost:5001/api/v1/gasstation/",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + this.state.token
                    }
                }
            );
            if (response.status === 200) {
                context.commit("loadGasStations", response.data);
            }
        }
    },
    modules: {}
});
