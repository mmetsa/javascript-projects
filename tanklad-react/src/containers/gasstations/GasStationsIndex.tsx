import React, { useContext, useEffect, useState } from "react";
import GasStation from "../../components/GasStation";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppState";
import { ICustomerCard } from "../../domain/ICustomerCard";
import { IGasStation } from "../../domain/IGasStation";
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

    const loadData = async () => {
        let result = await BaseService.getAll<IGasStation>("/GasStation");
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setGasStations(result.data);
        } else {
            setPageStatus({
                pageStatus: EPageStatus.Error,
                statusCode: result.statusCode,
            });
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
    return (
        <>
            <h1 className="mb-5">Gas Stations</h1>
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
                {gasStations.map((item, key) => {
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
