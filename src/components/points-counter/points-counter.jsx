import useAccount from "../../store/account.store";
import { convertToHours } from "../../utils/date-time";
import classes from "./points-counter.module.css";

const PointsCounter = ({ page = "home" }) => {
  const { totalPoints, timeRemaining, isWalletConnected } = useAccount();

  if (!isWalletConnected) return null;

  return (
    <div
      className={`d-flex flex-column ${classes.pointsCounter} ${
        page === "game" && classes.game
      }`}
    >
      <div className="d-flex flex-row">
        <div
          className={classes.imgContainer}
          // style={{
          //   width: "47px",
          //   height: "66px",
          //   position: "relative",
          //   marginRight: "9px",
          // }}
        >
          <img
            src="/img/point-diamond.png"
            alt="points"
            style={{
              position: "absolute",
              width: "100%",
              maxHeight: "100%",
              top: 0,
              left: 0,
            }}
          />
        </div>
        <div>
          <span>{totalPoints}</span>
        </div>
      </div>

      {totalPoints > 0 && timeRemaining > 0 && page !== "game" && (
        <div>{convertToHours(timeRemaining)}</div>
      )}
    </div>
  );
};

export default PointsCounter;
