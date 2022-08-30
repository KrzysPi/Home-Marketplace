import { useState, useEffect, useContext } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom"; /*useParams do zassania  z url danych dotyczących kategorii i ID*/

import Map from "../components/Map";
import LocationContext from "../context/LocationContext";
// import { Helmet } from "react-helmet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const { lat, setLat, lng, setLng, setChangeMarker } =
    useContext(LocationContext);

  const navigate = useNavigate(); // nawiguje po podstronach
  const params = useParams(); // pobiera parametry z adresu strony
  const auth = getAuth(); // autentyfikacja z firebase
  //   console.log(params); // {categoryName: "sale"/"rent", ListingId:....}
  useEffect(() => {
    const fetchListing = async () => {
      // zaciagamy z zewnątrz
      const docRef = doc(db, "listings", params.listingId); // doc(baza danych, jej kolekcja, klucz ) to funkcja firebase definująca co chemy z bazy danych
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
        setLat(docSnap.data().geolocation.lat);
        setLng(docSnap.data().geolocation.lng);
        setChangeMarker(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId, setLat, setLng, setChangeMarker]);

  // Wgrywa spiner jak ustawimy setLoading(true)
  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
      >
        {listing.imgUrls.map((_, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
                minHeight: "20rem",
              }}
              className="swiperSlideDiv"
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
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
          <p> {listing.name}</p>
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
              ? `${listing.bedrooms} sypialnie`
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

        <Map lat={lat} lng={lng} />

        {/* <div className="leafletContainer"></div> */}

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
