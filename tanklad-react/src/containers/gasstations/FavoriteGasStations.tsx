import React, { useContext, useEffect, useState } from "react";
import GasStation from "../../components/GasStation";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppState";
import { IGasStation } from "../../domain/IGasStation";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { IMessages } from "../../types/IMessages";

const FavoriteGasStations = () => {
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

        let favs = await BaseService.getAll<string>(
            "/account/favorites",
            appState.jwt ?? ""
        );
        if (favs.ok && favs.data) {
            setFavorites(favs.data);
            let gasStats: IGasStation[] = [];
            for (let gasStation of result.data!) {
                if (favs.data.includes(gasStation.id)) {
                    gasStats.push(gasStation);
                }
            }
            setGasStations(gasStats);
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
            setGasStations(gasStations.filter((f) => f.id !== id));
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
            <h1 className="mb-5">Favorite Gas Stations</h1>
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

export default FavoriteGasStations;
