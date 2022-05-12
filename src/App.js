import { useEffect } from "react";

// react-router
import { BrowserRouter, Route, Routes } from "react-router-dom";

// components and pages
import HomePage from "./components/home-page/home-page";
import Wallet from "./components/wallet/wallet";
import { Nav } from "react-bootstrap"; // bootstrap components

// NEAR utils
import { logout as destroy, accountBalance } from "./utils/near";

// store
import useAccount from "./store/account.store";

const App = function AppWrapper() {
  const {
    account,
    accountId,
    balance,
    isWalletConnected,
    setAccount,
    setBalance,
  } = useAccount();

  useEffect(() => {
    const acc = window.walletConnection.account();
    if (acc && acc.accountId) {
      setAccount(acc);
      accountBalance().then((bal) => setBalance(bal));
    }
  }, []); /* eslint-disable-line */ /* fucking BS eslint error */

  // uncomment this to see logs
  // useEffect(() => {
  //   console.log({ account, accountId, balance, isWalletConnected });
  // });

  return (
    <BrowserRouter>
      {/* <Container fluid="md"> */}

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
          <Route path="game" element={<></>} />
          <Route path="products" element={<></>} />
        </Routes>
      </main>
      {/* </Container> */}
    </BrowserRouter>
  );
};

export default App;
