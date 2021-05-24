import React from "react";

const HomeIndex = () => {
    return (
        <>
            <div className="row justify-content-center mt-3">
                <h1>Welcome to the Estonian gas stations web page!</h1>
                <h3>Find gas station information for these retailers</h3>
            </div>

            <div className="row justify-content-around mt-5">
                <div className="col-sm-12 col-md-6 col-lg-4 align-items-center">
                    <img
                        src="https://ehl.org.ee/wp-content/uploads/2018/10/Olerex-logo.jpg"
                        alt="Olerex"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                        }}
                    />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 align-items-center">
                    <img
                        src="https://seeklogo.com/images/A/alexela-logo-D0EC116C33-seeklogo.com.png"
                        alt="Alexela"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                        }}
                    />
                </div>
                <div className="d-flex col-sm-12 col-md-6 col-lg-4 align-items-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Circle_K_logo_2016.svg/1200px-Circle_K_logo_2016.svg.png"
                        alt="CirkleK"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                        }}
                    />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 align-items-center">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Neste_logo.png"
                        alt="Neste"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default HomeIndex;
