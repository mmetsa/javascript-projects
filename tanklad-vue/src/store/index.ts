import { createStore } from "vuex";
import axios from "axios";
import { IGasStation } from "@/domain/IGasStation";
import { IAppState } from "@/domain/IAppState";
import { ILoginInfo } from "@/domain/ILoginInfo";
import { IJwtResponse } from "@/domain/IJwtResponse";
import { IRetailer } from "@/domain/IRetailer";
import { IEditProfile } from "@/domain/IEditProfile";
import { IRegisterInfo } from "@/domain/IRegisterInfo";

export const initialState: IAppState = {
    token: null,
    firstname: "",
    lastname: "",
    gasstations: [],
    retailers: [],
    favorites: []
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
        },
        loadRetailers: (state: IAppState, retailers: IRetailer[]) => {
            state.retailers = retailers;
        },
        loadFavorites: (state: IAppState, favorites: IGasStation[]) => {
            state.favorites = favorites;
        },
        addFavorite: (state: IAppState, favorite: IGasStation) => {
            state.favorites = [...state.favorites, favorite];
        },
        removeFavorite: (state: IAppState, favorite: IGasStation) => {
            state.favorites = state.favorites.filter(x => x.id !== favorite.id);
        },
        editProfile: (state: IAppState, profile: IJwtResponse) => {
            state.firstname = profile.firstname;
            state.lastname = profile.lastname;
            state.token = profile.token;
        }
    },
    actions: {
        async logIn(context, login: ILoginInfo) {
            const loginData = JSON.stringify(login);
            try {
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
                    return true;
                }
            } catch (error) {
                return error.response.data.messages;
            }
        },
        async register(context, register: IRegisterInfo) {
            const loginData = JSON.stringify(register);
            try {
                const response = await axios.post(
                    "https://localhost:5001/api/v1/Account/register",
                    loginData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                );
                if (response.status === 200) {
                    context.commit("logIn", response.data);
                    return true;
                }
            } catch (error) {
                return error.response.data.messages;
            }
        },
        async loadGasStations(context) {
            try {
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
            } catch (error) {
                return error.message;
            }
        },
        async loadRetailers(context) {
            try {
                const response = await axios.get(
                    "https://localhost:5001/api/v1/retailer/",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + this.state.token
                        }
                    }
                );
                if (response.status === 200) {
                    context.commit("loadRetailers", response.data);
                }
            } catch (error) {
                return error.message;
            }
        },
        async loadFavorites(context) {
            try {
                const response = await axios.get(
                    "https://localhost:5001/api/v1/gasstation/favorites",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + this.state.token
                        }
                    }
                );
                if (response.status === 200) {
                    context.commit("loadFavorites", response.data);
                }
            } catch (error) {
                return error.message;
            }
        },
        async addFavorite(context, gasStation: IGasStation) {
            try {
                const response = await axios.post(
                    "https://localhost:5001/api/v1/gasstation/favorites",
                    JSON.stringify(gasStation),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + this.state.token
                        }
                    }
                );
                if (response.status === 200) {
                    context.commit("addFavorite", response.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async removeFavorite(context, gasStation: IGasStation) {
            const response = await axios.delete(
                "https://localhost:5001/api/v1/gasstation/favorites/" + gasStation.id,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + this.state.token
                    }
                }
            );
            if (response.status === 200) {
                context.commit("addFavorite", response.data);
            }
        },
        async editProfile(context, profile: IEditProfile) {
            try {
                const response = await axios.post(
                    "https://localhost:5001/api/v1/account/updateuser",
                    JSON.stringify(profile),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + this.state.token
                        }
                    }
                );
                if (response.status === 200) {
                    context.commit("editProfile", response.data);
                }
            } catch (error) {
                return error.response.data.messages;
            }
        },
    },
    modules: {}
});
