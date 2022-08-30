import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom"; //potrzebne do pobierania parametrów
import { doc, getDoc } from "firebase/firestore"; // zeby zassać email
import { db } from "../firebase.config"; // żeby zassać email
import { toast } from "react-toastify"; // wiadomości

function Contact() {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState(null);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams(); // to pozwoli nam na uzyskania parametrów wyszukiwania jako pierwotny string

  const params = useParams();
  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.userId); //tworzymy referencje do bazy danych
      const docSnap = await getDoc(docRef); // zapisujemy bazę danych

      if (docSnap.exists()) {
        setLandlord(docSnap.data()); // zapisujemy dane uzytkownika o okreśonym userId
      } else {
        toast.error("Nie można uzyskać kontaktu");
      }
    };

    getLandlord();
  }, [params.userId]);

  const onChange = (e) => setMessage(e.target.value);

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Kontakt</p>
      </header>

      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">
              Napisz do {landlord?.name}: {landlord?.email}
            </p>
          </div>

          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Treść wiadomości
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>

            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Wyślij wiadomość
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
