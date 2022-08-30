import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";
function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // na tym etapie uzyskujemy user z google

      // sprawdzamy czy są referencje do tego uzytkownika (dokumentu)
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // Jeżeli uzytkownik nie istnieje to go tworzymy
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Brak autoryzacji Google");
    }
  };

  return (
    <div className="socialLogin">
      <p>
        {location.pathname === "/sign-up" ? "Zarejstuj się" : "Zaloguj się "}
        przez
      </p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="google" />
      </button>
    </div>
  );
}

export default OAuth;
