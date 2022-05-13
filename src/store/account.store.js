import create from "zustand";

export const useAccount = create((set) => ({
  account: null,
  accountId: "",
  isWalletConnected: false,
  balance: "0",
  balanceNumber: 0,
  accountLoading: true,

  setAccount(account) {
    set({
      account,
      accountId: account.accountId,
      isWalletConnected: Boolean(account.accountId),
      accountLoading: false,
    });
  },
  setBalance(balance) {
    set({ balance, balanceNumber: +balance });
  },
}));

export default useAccount;
