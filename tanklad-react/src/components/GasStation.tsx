import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppState";
import { IGasStation } from "../domain/IGasStation";

const Logo = (props: any) => {
    if (props.url) {
        return (
            <>
                <div className="h-85 col-5">
                    <img
                        className="logo"
                        src={props.url}
                        alt="Gas station logo"
                    />
                    <p className="card-text d-none d-sm-block">
                        <small className="text-muted">
                            Last updated: {new Date().getDate()}/
                            {new Date().getUTCMonth() + 1}/
                            {new Date().getFullYear()}
                        </small>
                    </p>
                </div>
            </>
        );
    } else {
        return null;
    }
};

const GasStation = (props: {
    gasStation: IGasStation;
    addToFavorites: any;
    favorites: string[];
    removeFromFavorites: any;
}) => {
    const history = useHistory();

    const appState = useContext(AppContext);

    const showDetails = (id: string) => {
        history.push("/gasstation/" + id, props.gasStation);
    };

    const isFavorite = (gasStat: IGasStation) => {
        return props.favorites.some((e) => e === gasStat.id);
    };

    return (
        <>
            <div
                className="card h-100 gasstation-card"
                onClick={() => showDetails(props.gasStation.id)}>
                <div className="card-body row">
                    <Logo url={props.gasStation.retailer.logoUrl} />
                    <div className="h-100 col-7">
                        <h5 className="row card-title justify-content-center">
                            <div className="row col-11 justify-content-center">
                                {props.gasStation.name}
                            </div>
                            <div className="row col-1">
                                {appState.jwt
                                    ? [
                                          !isFavorite(props.gasStation) ? (
                                              <button
                                                  onClick={(e) =>
                                                      props.addToFavorites(
                                                          e,
                                                          props.gasStation.id
                                                      )
                                                  }
                                                  title="Add as favorite"
                                                  className="rounded-circle btn btn-primary btn-sm my-auto">
                                                  +
                                              </button>
                                          ) : (
                                              <button
                                                  onClick={(e) =>
                                                      props.removeFromFavorites(
                                                          e,
                                                          props.gasStation.id
                                                      )
                                                  }
                                                  title="Remove from favorites"
                                                  className="rounded-circle btn btn-danger btn-sm my-auto">
                                                  -
                                              </button>
                                          ),
                                      ]
                                    : null}
                            </div>
                        </h5>
                        {props.gasStation.fuelTypes.map((item, key) => {
                            return (
                                <div className="row" key={key}>
                                    <p className="row card-text justify-content-end col-6">
                                        <b>{item.fuelType.name}</b>
                                    </p>
                                    <p className="row card-text justify-content-end col-6">
                                        <b>{item.price} €</b>
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GasStation;
