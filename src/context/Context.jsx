import { createContext, useState } from "react";
export const Context = createContext();

function ContextProvider({ children }) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const [location, setLocation] = useState({ lat: 0, lon: 0 });

  return (
    <Context.Provider
      value={{
        data,
        setData,
        loading,
        setLoading,
        error,
        setError,
        city,
        setCity,
        location,
        setLocation,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;
