import { useEffect } from "react";

// react-router
import { Route, Routes } from "react-router-dom";

// components and pages
import HomePage from "./components/home-page/home-page";
import Wallet from "./components/wallet/wallet";
import { Container, Spinner } from "react-bootstrap"; // bootstrap components

// NEAR utils
import {
  logout as destroy,
  accountBalance,
  initializeContract,
} from "./utils/near";

// store
import useAccount from "./store/account.store";
import GamePage from "./components/game-page/game-page";

const App = () => {
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
    <div className="main-container">
      {/* {isWalletConnected && (
        <Wallet
          address={accountId}
          amount={balance}
          symbol="NEAR"
          destroy={destroy}
        />
      )} */}

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
