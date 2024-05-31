import React, { useContext } from "react";
import "./InputSearch.css";
import { Context } from "../context/Context";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const InputSearch = () => {
  const { city, setCity, setData } = useContext(Context);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    setCity(city.toLowerCase().trim());
    if (city === "" || !city) return;
    setCity("");
    navigate(`/section-weather/${city}`);
  };

  return (
    <>
      <div className="search-container">
        <form onSubmit={onSubmit}>
          <BiSearch
            cursor="pointer"
            type="submit"
            size="16px"
            color="#3C3C43"
            opacity="0.6"
          />
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </form>
      </div>
    </>
  );
};

export default InputSearch;
