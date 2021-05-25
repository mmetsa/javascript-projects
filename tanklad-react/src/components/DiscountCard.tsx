import React from "react";
import { ICustomerCard } from "../domain/ICustomerCard";

const DiscountCard = (props: { card: ICustomerCard; handleRemove: any }) => {
    return (
        <>
            <div className="card text-white bg-primary col-5">
                <div className="card-header row">
                    <div className="col-6">
                        <p>Discount card</p>
                        {props.card.description}
                    </div>
                    <div className="col-6 row justify-content-end">
                        <button
                            onClick={() => props.handleRemove(props.card.id)}
                            className="btn btn-link text-white justify-content-end">
                            Remove
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.card.name}</h5>
                    <h6 className="card-text">
                        Discount: {props.card.discount} cents/liter
                    </h6>
                </div>
            </div>
        </>
    );
};

export default DiscountCard;
