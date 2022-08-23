import { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom"; /*useParams do zassania  z url danych dotyczących kategorii i ID*/
// import { Helmet } from "react-helmet";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate(); // nawiguje po podstronach
  const params = useParams(); // pobiera parametry
  const auth = getAuth(); // autentyfikacja

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  // Wgrywa spiner jak ustawimy setLoading(true)
  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      {/* SLIDER */}
      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href); // navigator.clipboard kopije zawartość do schowka, uzywana do kopiowania zawartości strony
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="" />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link skopiowany</p>}

      <div className="listingDetails">
        <div className="listingName">
          <p>
            {" "}
            {listing.name} {""}
          </p>
          <p id="price">
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            zł
          </p>
        </div>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          Na {listing.type === "rent" ? "Wynajem" : "Sprzedaż"}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            {(listing.regularPrice - listing.discountedPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            zł Taniej
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} sypialni`
              : "1 sypialnia"}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Łazienki`
              : "1 Łazienka"}
          </li>
          <li>{listing.parking && "Parking"}</li>
          <li>{listing.furnished && "Umeblowane"}</li>
        </ul>

        <p className="listingLocationTitle">Lokalizacja</p>

        <div className="leafletContainer">
          {/* <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />

            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer> */}
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className="primaryButton"
          >
            Kontakt
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;
