import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useMapEvents, useMap, markers } from "react-leaflet/hooks";
import markerIconPng from "../assets/svg/pin.svg";

import { useContext, useState, useEffect } from "react";
import LocationContext from "../context/LocationContext";

function Map() {
  //   const [position, setPosition] = useState([52.237, 21.017]);
  const { lat, setLat, lng, setLng, changeMarker } =
    useContext(LocationContext);

  const marker = new Icon({
    iconUrl: markerIconPng,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  function LocationMarker() {
    useMapEvents({
      click: (e) => {
        if (changeMarker) {
          setLat(e.latlng.lat);
          setLng(e.latlng.lng);
        }
      },
    });

    return <Marker position={[lat, lng]} icon={marker}></Marker>;
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={false}
      id="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[lat, lng]} icon={marker}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      <LocationMarker />
    </MapContainer>
  );
}

export default Map;

/*
const marker = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
  
    return position === null ? null : (
      <Marker position={position} icon={marker}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  
  function Map({ lat = 52.237, lng = 21.017 }) {
    return (
      <>
        <MapContainer
          center={{ lat: 51.505, lng: -0.09 }}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
        </MapContainer>
      </>
    );
  }
  
  export default Map;
  */
