import { useEffect } from "react";

// react-router
import { Route, Routes } from "react-router-dom";

// components and pages
import HomePage from "./components/home-page/home-page";
// import Wallet from "./components/wallet/wallet";
import { Container, Spinner } from "react-bootstrap"; // bootstrap components

// NEAR utils
import {
  // logout as destroy,
  accountBalance,
  initializeContract,
} from "./utils/near";

// store
import useAccount from "./store/account.store";
import GamePage from "./components/game-page/game-page";
import useInterval from "./hooks/use-interval";

const App = () => {
  const {
    // accountId,
    // balance,
    // isWalletConnected,
    setAccount,
    setBalance,
    setPoints,
    timeRemaining,
    setTimeRemaining,
    accountLoading,
    setAccountLoading,
  } = useAccount();

  useEffect(() => {
    (async () => {
      try {
        await initializeContract();

        const acc = window.walletConnection.account();
        setAccount(acc);

        if (acc && acc.accountId) {
          const bal = await accountBalance();
          setBalance(bal);

          // TODO: Integrate with smart contract to get points owned by user, and remaining time for the points expiry
          const accountDetails = JSON.parse(
            localStorage.getItem(acc.accountId)
          );
          const totalPoints = accountDetails?.points || 0;
          // TODO: adding arbitrary time here, not storing for now, replace with API call values
          const timeRemaining = totalPoints > 0 ? 16 * 60 * 60 : 0;

          setPoints(totalPoints);
          setTimeRemaining(timeRemaining);
        }

        setAccountLoading(false);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []); /* eslint-disable-line */ /* fucking BS eslint error */

  // uncomment this to see logs
  // useEffect(() => {
  //   console.log({ account, accountId, balance, isWalletConnected });
  // });

  useInterval(() => {
    if (accountLoading) {
      return;
    }

    setTimeRemaining(timeRemaining - 1);
  }, 1000);

  if (accountLoading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  return (
    <div className="main-container">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="game" element={<GamePage />} />

          {/* Need to add product paths */}
          <Route path="products" element={<></>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

/* eslint-disable-next-line */
{
  /* {isWalletConnected && (
        <Wallet
          address={accountId}
          amount={balance}
          symbol="NEAR"
          destroy={destroy}
        />
      )} */
}
/* eslint-disable-next-line */
{
  /* {isWalletConnected && (
  <Nav className="justify-content-end pt-3 pb-5">
    <Nav.Item>
      <Wallet
        address={accountId}
        amount={balance}
        symbol="NEAR"
        destroy={destroy}
      />
    </Nav.Item>
  </Nav>
)} */
}
