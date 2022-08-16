Baza danych tworzymy z firebase s13e79 - s13e81

Aplikacja w js

1. zastaniawiamy sie jakie strony będą nam potrzebne w aplikacji
2. tworzymy katalog pages i tworzymy templety dla odpowiednich stron
   najłatwiej przez

```javascript
// rfce + enter
function Offers() {
  return (
    <div>
      <h1>Offers</h1>
    </div>
  );
}

export default Offers;
```

3. w App.js importujemy BrowserRouter i wszystkie pages

```javascript
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
```

4. W App.js Tworzymy Routs czyli odnośniki do stron

```javascript
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<SignIn />} />
          <Route path="/signe-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/ForgetPassword" element={<ForgotPassword />} />
        </Routes>
        {/*Navbar*/}
      </Router>
    </>
  );
}

export default App;
```

5. teraz wszystkie odnośniki do stron działają (mamy szkielet naszej strony) więc potzebujemy jakiejś Navbar, żeby muc sprawnie nawigować po strnie.

- w src tworzymy folder components a w nim Navbar.jsx i tworzymy szielet HTML

```javascript
import { useNavigate, useLocation } from "react-router-dom";
// nastepnie imporujemy ikony z katalogu
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";
function Navbar() {
  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem">
            <ExploreIcon fill="#2c2c2c" width="36px" height="36px" />
            <p>Explore</p>
          </li>
          <li className="navbarListItem">
            <OfferIcon fill="#2c2c2c" width="36px" height="36px" />
            <p>Offer</p>
          </li>
          <li className="navbarListItem">
            <PersonOutlineIcon fill="#2c2c2c" width="36px" height="36px" />
            <p>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
```

- Następnie importujemy do App.js

```javascript
import Navbar from "./components/Navbar";

// poniżej w return pomiędzy <Routes />  ,a <Router /> wklejamy <Navbar/>

</Routes>
    <Navbar />
</Router>

```

- Teraz żeby za pomocą kliknięcia navigować po stronach użyjemy useNavigate i useLocation z 'react-router-dom' więc W Navbar.jsx

```javascript

  const navigate=useNvigate();
//    przy kazdym <li> czyli naszych ikonach menu w navbar dodajemy funkcję onClick i wskazujemy gdzie ma przenieść
  <li className="navbarListItem" onClick={() => navigate("/")}>
```

- Zeby sprawdzić na jakim Route jesteśmy czyli na jakiej stronie uzywamy useLocation.
  Dzieki temu możemy zmienić navbar w zależności od strony na jakiej jesteśmy.
  W naszym przykładzie zmienimy kolor ikonki jezeli jesteśmy na konkretnej stronie, co da nam odpowiednik zaznaczenia w menu na jakiej stronie jestesmy.

```javascript
const location = useLocation();

// funkcja zwrca thru jezli znajdujemy sie na wybranej stronie
const pathMatchRoute = (route) => {
  if (route === location.pathname) {
    return true;
  }
};
// następnie w JSX do kazdej ikonki dodajemy fill z warukiem jezeli prawdziwy to ciemny jeżeli nie prawdziwy to jasny szary
<ExploreIcon
  fill={pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"}
  width="36px"
  height="36px"
/>;
// Podobnie robimy z napisami przez dodanie do paragrafu warunkowego className
 <p
              className={
                pathMatchRoute("/profile")
                  ? "navbarListItemNameActive"
                  : "navbarListItemName"
              }
            >

```

#################################### Zakończyliśmy Szkielet Aplikacji ####################################

#################################### Autentyfikacja Section 14 ####################################

1. SignIn.jsx tworzymy layout stony

################################### Ogólne #######################################

```javascript
import { useNavigate, useLocation, Link } from "react-router-dom";

const navigate = useNavigate() // przenosi do zadanej strony przykład
 <li onClick={() => navigate("/")} /> //po przyciśnięciu elementu listy przenosi nas na główną stronę('/') może przenieść do każdej innej ('/about')
//_------------------------------------------------------------------------------

const location = useLocation() // sprawdza na jakim route (stronie) jesteśmy
 // zazwyczaj uzywany do warunkowej zmiany np:

const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

return(
  <p
     className={
     pathMatchRoute("/profile") // sprawdza czy jesteśmy na podstonie profile
      ? "navbarListItemNameActive" // jezeli tak to css class
      : "navbarListItemName" // jeżeli nie to css class
     }
    ><p/>
)

 //---------------------------------------------------------------------------------

<Link> // działa podobnie do useNavigate jednak uzytkownik fizycznie musi klikąć w link, przeniesienie nie dzieje sie automatycznie jek w przypadku useNavigate
```
