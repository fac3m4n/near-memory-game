import classes from "./logout.module.css";

import { logout } from "../../utils/near";
import useAccount from "../../store/account.store";

const Logout = ({ color = "#888680", top = "5%", right = "5%" }) => {
  const { isWalletConnected, accountId } = useAccount();

  if (!isWalletConnected || !accountId) return null;

  return (
    <div className={`d-flex flex-row ${classes.logout}`} style={{ top, right }}>
      <span style={{ color }}>{accountId}</span>

      <button type="button" onClick={logout}>
        {"(>"}
      </button>
    </div>
  );
};

export default Logout;
