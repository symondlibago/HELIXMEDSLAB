import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "helixmd.account.v1";
const PENDING_UNLOCKS_PRICING = true;

const AccountContext = createContext(null);

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Guard against a half-written or stale-shaped record.
    return parsed && parsed.email && parsed.accountType ? parsed : null;
  } catch {
    return null;
  }
}

export function AccountProvider({ children }) {
  const [account, setAccount] = useState(() =>
    typeof window === "undefined" ? null : readStored(),
  );

  // Keep other tabs in step — registering in one shouldn't leave another
  // showing locked prices.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === STORAGE_KEY) setAccount(readStored());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const register = useCallback((record) => {
    const next = {
      email: record.email,
      firstName: record.firstName || "",
      lastName: record.lastName || "",
      accountType: record.accountType,
      referralCode: record.referralCode || "",
      team: record.team || "",
      status: record.status || "pending",
      registeredAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Private browsing can refuse writes — the session still works in memory.
    }
    setAccount(next);
    return next;
  }, []);

  const signOut = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* nothing to clean up */
    }
    setAccount(null);
  }, []);

  const value = useMemo(() => {
    const approved = account?.status === "approved";
    return {
      account,
      register,
      signOut,
      isRegistered: Boolean(account),
      accountType: account?.accountType ?? null,
      /* The one flag the catalog cares about. */
      canSeePricing: Boolean(
        account && (approved || PENDING_UNLOCKS_PRICING),
      ),
    };
  }, [account, register, signOut]);

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used inside an <AccountProvider>");
  }
  return context;
}
