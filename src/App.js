import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { login, logout as destroy, accountBalance } from "./utils/near";
import Wallet from "./components/wallet/wallet";
// import { Notification } from "./components/utils/Notifications";
// import Products from "./components/marketplace/Products";
import HomePage from "./components/home-page/home-page";
import "./App.css";
import useAccount from "./store/account";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
  }, []);

  // const [balance, setBalance] = useState("0");
  // const getBalance = useCallback(async () => {
  //   if (account.accountId) {
  //     setBalance(await accountBalance());
  //   }
  // }, [account.accountId]);

  // useEffect(() => {
  //   getBalance();
  // }, [getBalance]);

  return (
    // <>
    //   {/* <Notification /> */}
    //   {account.accountId ? (
    //     <Container fluid="md">
    //       <Nav className="justify-content-end pt-3 pb-5">
    //         <Nav.Item>
    //           <Wallet
    //             address={account.accountId}
    //             amount={balance}
    //             symbol="NEAR"
    //             destroy={destroy}
    //           />
    //         </Nav.Item>
    //       </Nav>
    //       <main>{/* <Products /> */}</main>
    //     </Container>
    //   ) : (
    //     <Cover name="ZOO Memory" login={login} />
    //   )}
    // </>
    <BrowserRouter>
      {/* <Container fluid="md"> */}
      {/* Navbar */}
      {isWalletConnected && (
        <Nav className="justify-content-end pt-3 pb-5">
          <Nav.Item>
            {isWalletConnected && (
              <Wallet
                address={account?.accountId}
                amount={balance}
                symbol="NEAR"
                destroy={destroy}
              />
            )}
          </Nav.Item>
        </Nav>
      )}

      <main>
        <Routes>
          <Route
            path="/"
            element={<HomePage name="ZOO Memory" login={login} />}
          />
        </Routes>
      </main>
      {/* </Container> */}
    </BrowserRouter>
  );
};

export default App;
