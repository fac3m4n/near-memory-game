import PropTypes from "prop-types";

// components and pages
import { Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

// NEAR utils
import { login } from "../../utils/near";

// styles
import classes from "./home-page.module.css";

// state
import { useAccount } from "../../store/account.store";
import PointsCounter from "../points-counter/points-counter";

const HomePage = ({ name = "ZOO Memory" }) => {
  const { isWalletConnected } = useAccount();

  return (
    <div className={`${classes.coverbg}`}>
      <PointsCounter page="home" />
      <div
        className={`d-flex justify-content-center flex-column text-center ${classes.coverbgContent}`}
      >
        <div className="mt-auto text-light mb-5">
          {isWalletConnected ? (
            <Stack gap={4} className="mt-5 pt-5">
              <Link to="game" className={classes.link}>
                START GAME
              </Link>
              <Link to="products" className={classes.link}>
                COLLECTION
              </Link>
              <Link to="/" className={classes.link}>
                HOW TO PLAY
              </Link>
            </Stack>
          ) : (
            <>
              <h1>{name}</h1>
              <p>Please connect your wallet to play.</p>
              <Button
                onClick={login}
                variant="outline-light"
                className="rounded-pill px-3 mt-3"
              >
                Connect Wallet
              </Button>
            </>
          )}
        </div>
        <p className="mt-auto text-white">Powered by NEAR</p>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  name: PropTypes.string,
};

HomePage.defaultProps = {
  name: "ZOO Memory",
};

export default HomePage;
