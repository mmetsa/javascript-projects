import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppState";
import { IFuelTypeInGasStation } from "../domain/IFuelTypeInGasStation";
import { IGasStation } from "../domain/IGasStation";
import { BaseService } from "../services/base-service";

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

const Price = (props: {
    gasStation: IGasStation;
    fuelType: IFuelTypeInGasStation;
}) => {
    const appState = useContext(AppContext);

    const [editing, setEditing] = useState(false);
    const [editingPrice, setEditingPrice] = useState(0);

    const editPrice = async (e: any) => {
        e.stopPropagation();
        setEditing(true);
        console.log("Editing price");
    };

    const savePrice = async (e: any) => {
        e.stopPropagation();
        setEditing(false);
        props.gasStation.fuelTypes.find(
            (x) => x.fuelTypeId === props.fuelType.fuelTypeId
        )!.price = editingPrice;
        let response = await BaseService.put(
            "/gasstation/" + props.gasStation.id,
            props.gasStation,
            appState.jwt ?? ""
        );
        if (!response.ok) {
            window.location.reload();
        }
    };

    let discount = null;
    if (appState.discounts) {
        discount = appState.discounts.find(
            (e) => e.retailerId === props.gasStation.retailerId
        );
    }
    if (discount) {
        return (
            <>
                <p className="row card-text justify-content-end col-6">
                    <b>{props.fuelType.fuelType.name}</b>
                </p>
                {editing && (
                    <>
                        <input
                            className="ml-1 row col-4"
                            type="number"
                            step={0.1}
                            placeholder="Set price"
                            value={editingPrice}
                            onChange={(e) =>
                                setEditingPrice(e.target.valueAsNumber)
                            }
                            onClick={(e) => e.stopPropagation()}></input>

                        <button
                            className="pl-5 btn btn-link m-0 p-0"
                            onClick={(e) => savePrice(e)}>
                            Save
                        </button>
                    </>
                )}
                {!editing && (
                    <>
                        <p className="row card-text justify-content-end col-6">
                            <b>
                                {(
                                    props.fuelType.price -
                                    discount.discount / 100
                                ).toFixed(3)}{" "}
                                €
                            </b>
                        </p>
                        <a
                            className="pl-2 btn btn-link m-0 p-0"
                            onClick={(e) => editPrice(e)}>
                            Edit
                        </a>
                    </>
                )}
            </>
        );
    }
    return (
        <>
            <p className="row card-text justify-content-end col-6">
                <b>{props.fuelType.fuelType.name}</b>
            </p>
            {editing && (
                <>
                    <input
                        className="ml-1 row col-4"
                        type="number"
                        step={0.1}
                        placeholder="Set price"
                        value={editingPrice}
                        onChange={(e) =>
                            setEditingPrice(e.target.valueAsNumber)
                        }
                        onClick={(e) => e.stopPropagation()}></input>

                    <button
                        className="pl-5 btn btn-link m-0 p-0"
                        onClick={(e) => savePrice(e)}>
                        Save
                    </button>
                </>
            )}
            {!editing && appState.jwt !== null && (
                <>
                    <p className="row card-text justify-content-end col-6">
                        <b>{props.fuelType.price} €</b>
                    </p>
                    <a
                        className="pl-2 btn btn-link m-0 p-0"
                        onClick={(e) => editPrice(e)}>
                        Edit
                    </a>
                </>
            )}
            {!editing && appState.jwt == null && (
                <>
                    <p className="row card-text justify-content-end col-6">
                        <b>{props.fuelType.price} €</b>
                    </p>
                </>
            )}
        </>
    );
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
                    {props.gasStation.fuelTypes.map((item, index) => {
                        return (
                            <div className="row" key={index}>
                                <Price
                                    {...{
                                        gasStation: props.gasStation,
                                        fuelType: item,
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default GasStation;
