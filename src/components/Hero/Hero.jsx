import "./hero.css";
import { AiOutlineArrowDown } from "react-icons/ai";
import Mountain from "../../images/hero/mountains.svg";
function hero() {
  const handleClick = () => {
    const section = document.querySelector("#section-card-geolocation");
    section.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <section className="hero-section">
        <div className="mountains">
          <img src={Mountain} alt="mountain" />
        </div>
        <div className="container-title-subtitle">
          <h1>Discover the weather forecast </h1>
          <p>Stay ahead of the weather. </p>
        </div>
        <div className="container-row-paragraph">
          <span className="row">
            <AiOutlineArrowDown
              color="#2d2d2d"
              cursor="pointer"
              onClick={handleClick}
            />
          </span>
          <p>Check your weather</p>
        </div>
      </section>
    </>
  );
}

export default hero;
