import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { login } from "../../utils/near";
import classes from "./home-page.module.css";

const Cover = ({ name = "ZOO Memory" }) => {
  return (
    <div
      className={`d-flex justify-content-center flex-column text-center ${classes.coverbg}`}
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
};

Cover.propTypes = {
  name: PropTypes.string,
};

Cover.defaultProps = {
  name: "ZOO Memory",
};

export default Cover;
