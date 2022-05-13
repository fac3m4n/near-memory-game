import { useEffect } from "react";

// react-router
import { Route, Routes } from "react-router-dom";

// components and pages
import HomePage from "./components/home-page/home-page";
import Wallet from "./components/wallet/wallet";
import { Container, Nav, Spinner } from "react-bootstrap"; // bootstrap components

// NEAR utils
import {
  logout as destroy,
  accountBalance,
  initializeContract,
} from "./utils/near";

// store
import useAccount from "./store/account.store";
import GamePage from "./components/game-page/game-page";

const App = function AppWrapper() {
  const {
    accountId,
    balance,
    isWalletConnected,
    setAccount,
    setBalance,
    accountLoading,
  } = useAccount();

  useEffect(() => {
    initializeContract()
      .then(() => {
        const acc = window.walletConnection.account();
        setAccount(acc);

        if (acc && acc.accountId) {
          accountBalance().then((bal) => setBalance(bal));
        }
      })
      .catch((err) => console.log(err));
  }, []); /* eslint-disable-line */ /* fucking BS eslint error */

  // uncomment this to see logs
  // useEffect(() => {
  //   console.log({ account, accountId, balance, isWalletConnected });
  // });

  if (accountLoading)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  return (
    <Container>
      {isWalletConnected && (
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
      )}

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Need to add game and product paths */}
          <Route path="game" element={<GamePage />} />
          <Route path="products" element={<></>} />
        </Routes>
      </main>
    </Container>
  );
};

export default App;
