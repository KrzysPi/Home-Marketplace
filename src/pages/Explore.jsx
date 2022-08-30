import { Link } from "react-router-dom";
// import Slider from "../components/Slider";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import Slider from "../components/Slider";
function Explore() {
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Przeglądaj</p>
      </header>

      <main>
        <Slider />

        <p className="exploreCategoryHeading">Kategorie</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Nieruchomości na wynajem</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Nieruchomości na sprzedaż</p>
          </Link>
        </div>
      </main>
      <div style={{ minHeight: "2rem" }} />
    </div>
  );
}

export default Explore;
