import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import './Cover.css'

const Cover = ({ name, login }) => {
    if ((name, login)) {
        return (
            <div
                className="d-flex justify-content-center flex-column text-center coverbg"
                style={{ minHeight: "100vh" }}
            >
                <div className="mt-auto text-light mb-5">

                    <h1>{name}</h1>
                    <p>Please connect your wallet to play.</p>
                    <Button
                        onClick={login}
                        variant="outline-light"
                        className="rounded-pill px-3 mt-3"
                    >
                        Connect Wallet
                    </Button>
                </div>
                <p className="mt-auto text-white">Powered by NEAR</p>
            </div>
        );
    }
    return null;
};

Cover.propTypes = {
    name: PropTypes.string,
};

Cover.defaultProps = {
    name: "",
};

export default Cover;