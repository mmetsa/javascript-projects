import React, { useContext, useEffect, useState } from "react";
import DiscountCard from "../../components/DiscountCard";
import { AppContext } from "../../context/AppState";
import { ICustomerCard } from "../../domain/ICustomerCard";
import { BaseService } from "../../services/base-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { IRetailer } from "../../domain/IRetailer";

const AddNew = (props: { retailers: IRetailer[]; loadData: any }) => {
    const appState = useContext(AppContext);

    const [form, setForm] = useState({
        retailerId: "",
        name: "",
        discount: 0,
        description: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let response = await BaseService.post(
            "/account/addcustomercard",
            form,
            appState.jwt ?? ""
        );
        if (response.ok && response.data) {
            setForm({
                ...form,
                retailerId: "",
                name: "",
                discount: 0,
                description: "",
            });
            props.loadData();
        }
    };

    return (
        <>
            <div className="row mt-5 justify-content-center">
                <form>
                    <div className="form-group">
                        <label className="col-12 p-0" htmlFor="retailerId">
                            Retailer
                        </label>
                        <select
                            className="col-12 p-0"
                            name="retailerId"
                            id="selectRetailer"
                            value={form.retailerId}
                            onChange={(e) => handleChange(e)}>
                            {props.retailers.map((item, key) => {
                                return (
                                    <option key={key} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="col-12 p-0" htmlFor="name">
                            Card name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={form.name}
                            onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="form-group">
                        <label className="col-12 p-0" htmlFor="discount">
                            Discount (cents/liter)
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="discount"
                            value={form.discount}
                            onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="form-group">
                        <label className="col-12 p-0" htmlFor="description">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            value={form.description}
                            onChange={(e) => handleChange(e)}></input>
                    </div>

                    <button
                        onClick={(e) => handleSubmit(e)}
                        className="btn btn-primary">
                        Add
                    </button>
                </form>
            </div>
        </>
    );
};

const Discounts = () => {
    const appState = useContext(AppContext);

    const [discounts, setDiscounts] = useState<ICustomerCard[]>();
    const [retailers, setRetailers] = useState<IRetailer[]>([]);

    const loadData = async () => {
        let result = await BaseService.getAll<ICustomerCard>(
            "/account/getusercustomercards",
            appState.jwt ?? ""
        );
        if (result.ok && result.data) {
            setDiscounts(result.data);
        }

        let res = await BaseService.getAll<IRetailer>(
            "/retailer",
            appState.jwt ?? ""
        );
        if (res.ok && res.data) {
            setRetailers(res.data);
        }
    };

    const handleRemove = async (id: string) => {
        let response = await BaseService.delete(
            "/account/removecustomercard/" + id,
            appState.jwt ?? ""
        );
        if (response.ok && response.data) {
            loadData();
        } else {
            console.log(response);
        }
    };

    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>My discount cards</h1>
            {discounts?.map((item, index) => {
                return (
                    <div
                        className="row mt-5 justify-content-center"
                        key={index}>
                        <DiscountCard {...{ card: item, handleRemove }} />
                    </div>
                );
            })}
            {isAdding && <AddNew {...{ retailers, loadData }} />}
            <div className="row mt-5 justify-content-center">
                <FontAwesomeIcon
                    icon={faPlusSquare}
                    size="3x"
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => setIsAdding(true)}
                />
            </div>
        </>
    );
};

export default Discounts;
