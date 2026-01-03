import { createContext, useContext, useState, useEffect } from "react";

type Currency = "USD" | "GBP" | "EUR" | "JPY";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  rates: Record<Currency, number>;
  convert: (amount: number) => { amount: number; symbol: string };
}

const rates: Record<Currency, number> = {
  USD: 1,
  GBP: 0.7423,
  EUR: 0.8529,
  JPY: 156.84,
};

const symbols: Record<Currency, string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
  JPY: "¥",
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem("currency");
    return (saved as Currency) || "USD";
  });

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const convert = (amount: number) => {
    const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;
    return {
      amount: numericAmount * rates[currency],
      symbol: symbols[currency],
    };
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within CurrencyProvider");
  return context;
}
