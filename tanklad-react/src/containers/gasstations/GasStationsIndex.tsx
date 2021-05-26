import React, { useContext, useEffect, useState } from "react";
import GasStation from "../../components/GasStation";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppState";
import { ICustomerCard } from "../../domain/ICustomerCard";
import { IGasStation } from "../../domain/IGasStation";
import { IRetailer } from "../../domain/IRetailer";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IMessages } from "../../types/IMessages";

const GasStationsIndex = () => {
    const [gasStations, setGasStations] = useState([] as IGasStation[]);
    const [pageStatus, setPageStatus] = useState({
        pageStatus: EPageStatus.Loading,
        statusCode: -1,
    });

    const appState = useContext(AppContext);
    const [messages, setMessages] = useState<string[] | null>();
    const [favorites, setFavorites] = useState([] as string[]);
    const [retailers, setRetailers] = useState([] as IRetailer[]);
    const [shownGasStations, setShownGasStations] = useState(
        [] as IGasStation[]
    );

    const loadData = async () => {
        let result = await BaseService.getAll<IGasStation>("/GasStation");
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setGasStations(result.data);
            setShownGasStations(result.data);
        } else {
            setPageStatus({
                pageStatus: EPageStatus.Error,
                statusCode: result.statusCode,
            });
        }
        let retailersResponse = await BaseService.getAll<IRetailer>(
            "/retailer",
            appState.jwt ?? ""
        );
        if (retailersResponse.ok && retailersResponse.data) {
            setRetailers(retailersResponse.data);
        }
        if (appState.jwt) {
            let favorites = await BaseService.getAll<string>(
                "/account/favorites",
                appState.jwt ?? ""
            );
            if (favorites.ok && favorites.data) {
                setFavorites(favorites.data);
            }

            let discounts = await BaseService.getAll<ICustomerCard>(
                "/account/getusercustomercards",
                appState.jwt ?? ""
            );
            if (discounts.ok && discounts.data) {
                appState.discounts = discounts.data;
            }
        }
    };

    const addToFavorites = async (e: any, id: string) => {
        e.stopPropagation();
        let result = await BaseService.post<IMessages>(
            "/Account/Favorites",
            id,
            appState.jwt ?? ""
        );
        if (result.ok && result.data) {
            setMessages(result.data.messages);
            setFavorites([...favorites, id]);
        } else {
            if (result.statusCode === 401) {
                setMessages(["Please log in first!"]);
            } else {
                setMessages(result.messages);
            }
        }
    };

    const removeFromFavorites = async (e: any, id: string) => {
        e.stopPropagation();
        let result = await BaseService.delete<IMessages>(
            "/Account/Favorites/delete/" + id,
            appState.jwt ?? ""
        );
        if (result.ok && result.data) {
            setMessages(result.data.messages);
            setFavorites(favorites.filter((f) => f !== id));
        } else {
            if (result.statusCode === 401) {
                setMessages(["Please log in first!"]);
            } else {
                setMessages(result.messages);
            }
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFilter = (e: any) => {
        if (e.target.value === "all") {
            setShownGasStations(gasStations);
            return;
        }
        setShownGasStations(
            gasStations.filter((f) => f.retailerId === e.target.value)
        );
    };

    const handleSorting = (e: any) => {
        if (e.target.value === "none") {
            setShownGasStations(gasStations);
            return;
        }
        if (e.target.value === "price-growing") {
            setShownGasStations(
                [...shownGasStations].sort(function (a, b) {
                    if (
                        a.fuelTypes?.length === 0 ||
                        b.fuelTypes?.length === 0
                    ) {
                        return 0;
                    }
                    if (a.fuelTypes[0].price > b.fuelTypes[0].price) {
                        return 1;
                    } else if (a.fuelTypes[0].price === b.fuelTypes[0].price) {
                        return 0;
                    }
                    return -1;
                })
            );
        }
    };

    return (
        <>
            <h1 className="mb-5">Gas Stations</h1>
            <div className="row justify-content-center">
                <select
                    name="retailer"
                    className="form-select form-select-lg mb-3 col-3 mr-5 p-3"
                    onChange={(e) => handleFilter(e)}>
                    <option value="all">Kõik tanklaketid</option>
                    {retailers.map((item, index) => {
                        return (
                            <option key={index} value={item.id}>
                                {item.name}
                            </option>
                        );
                    })}
                </select>
                <select
                    id="sort"
                    className="form-select form-select-lg mb-3 col-2 p-3"
                    onChange={(e) => handleSorting(e)}>
                    <option value="none">Sorteeri</option>
                    <option value="price-growing">
                        Kütuse hinna järgi: Kasvavalt
                    </option>
                </select>
            </div>
            {messages?.map((item, key) => {
                return (
                    <div className="row justify-content-center" key={key}>
                        <div className="alert alert-info" role="alert">
                            {item}
                        </div>
                    </div>
                );
            })}
            <div className="row justify-content-around">
                {shownGasStations.map((item, key) => {
                    return (
                        <div
                            className="col-sm-12 col-md-12 col-lg-6 pb-3 gasstation-parent"
                            key={key}>
                            <GasStation
                                {...{
                                    gasStation: item,
                                    addToFavorites,
                                    favorites,
                                    removeFromFavorites,
                                }}
                            />
                        </div>
                    );
                })}
            </div>
            <Loader {...pageStatus} />
        </>
    );
};

export default GasStationsIndex;
