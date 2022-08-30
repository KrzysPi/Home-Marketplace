import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg"; // nie używamy ReactComponent ponieważ to będzie tylko żródło ikony
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" }); // zamiast tworzenia 2 odrębnych useState tworzymy obiekt z dwoma zmiennymi
  const { email, password } = formData;
  const navigate = useNavigate(); // funkcja umozliwia przeniesienie na inną podstronę

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate(`/`); // przenosimy sie na stronę startową (explore.jsx)(zadeklarowanie w App.js)
      }
    } catch (error) {
      toast.error("Bad User Credentials", {});
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Witamy</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              placeholder="Hasło"
              id="password"
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              // onClick={() => setShowPassword(!showPassword)}
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Przypomnij Hasło
          </Link>
          <div className="signInBar">
            <p className="signInText">Zalogój się</p>
            <button className="signInButton">
              <ArrowRightIcon
                fill="#ffffff"
                width="34px"
                height="34px"
              ></ArrowRightIcon>
            </button>
          </div>
        </form>
        <OAuth />
        <Link to="/sign-up" className="registerLink">
          Zarejestruj się
        </Link>
      </div>
    </>
  );
}

export default SignIn;
