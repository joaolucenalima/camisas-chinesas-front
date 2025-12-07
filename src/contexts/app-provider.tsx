import { useCallback, useEffect, useRef, useState } from "react";
import { AppContext } from "./app-context";

type AppProviderProps = {
  children: React.ReactNode;
  targetCurrency?: string;
};

const CACHE_KEY = "dollar-rate";
const CACHE_TTL = 8 * 60 * 60 * 1000;

export const AppProvider: React.FC<AppProviderProps> = ({ children, targetCurrency = "BRL" }) => {
  const [dollarRate, setDollarRate] = useState<number | null>(null);

  const socketRef = useRef<WebSocket>(null);

  const fetchRate = useCallback(async () => {
    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
      const { value, timestamp } = JSON.parse(cached);

      const isExpired = Date.now() - timestamp > CACHE_TTL;

      if (!isExpired && typeof value === "number") {
        setDollarRate(value);
        return;
      }
    }

    const url = `https://v6.exchangerate-api.com/v6/${
      import.meta.env.VITE_EXCHANGE_RATE_KEY
    }/latest/USD`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const rate = data.conversion_rates[targetCurrency];

    if (typeof rate !== "number") throw new Error("Invalid response: missing rate");

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        value: rate,
        timestamp: Date.now(),
      })
    );

    setDollarRate(rate);
  }, [targetCurrency]);

  const refresh = useCallback(async () => {
    await fetchRate();
  }, [fetchRate]);

  useEffect(() => {
    fetchRate();
  }, [fetchRate]);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3333");
    return () => socketRef.current?.close();
  }, []);

  return (
    <AppContext.Provider value={{ dollarRate, refresh, socket: socketRef.current }}>
      {children}
    </AppContext.Provider>
  );
};
