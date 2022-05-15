import classes from "./logout.module.css";

import { logout } from "../../utils/near";
import useAccount from "../../store/account.store";

const Logout = ({ color = "#888680", top = "5%", right = "5%" }) => {
  const { isWalletConnected } = useAccount();

  return (
    <div className={`d-flex flex-row ${classes.logout}`} style={{ top, right }}>
      <span style={{ color }}>ZOO.NEAR</span>
      {isWalletConnected && (
        <button type="button" onClick={logout}>
          {"(>"}
        </button>
      )}
    </div>
  );
};

export default Logout;
