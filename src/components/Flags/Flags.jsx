import React from "react";
import Slider from "react-slick";
import { hasFlag } from "country-flag-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Flags = () => {
  const FlagsData = [
    { code: "IN", name: "India" },
    { code: "BD", name: "Bangladesh" },
    { code: "NP", name: "Nepal" },
    { code: "CN", name: "China" },
    { code: "YE", name: "Yemen" },
    { code: "TR", name: "Turkey" },
    { code: "PK", name: "Pakistan" },
    { code: "LK", name: "Sri Lanka" },
    { code: "TH", name: "Thailand" },
    { code: "AE", name: "UAE" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplaySpeed: 2500,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="container-flags">
      <Slider className="sub-container-flags" {...settings}>
        {FlagsData.map((flag) => (
          <div className="flag-and-description" key={flag.code}>
            <div className="flex items-center">
              {hasFlag(flag.code) ? (
                <img
                  alt={flag.name}
                  src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flag.code}.svg`}
                  className="w-12 h-auto mr-2"
                />
              ) : (
                <p>No flag available for {flag.name}</p>
              )}
              <p className="text-sm">{flag.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Flags;
