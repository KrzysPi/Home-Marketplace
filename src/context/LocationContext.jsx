import { useState, createContext } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  //   const [position, setPosition] = useState([52.237, 21.017]);
  const [lat, setLat] = useState(52.237);
  const [lng, setLng] = useState(21.017);
  const [changeMarker, setChangeMarker] = useState(true);

  return (
    <LocationContext.Provider
      /*value={{ position, setPosition }}>*/ value={{
        lat,
        setLat,
        lng,
        setLng,
        changeMarker,
        setChangeMarker,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
