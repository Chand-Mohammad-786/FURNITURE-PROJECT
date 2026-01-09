import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hometestimonialsection = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const testimonials = [
    {
      text: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.",
      name: "Maria Jones",
      position: "CEO, Co-Founder, XYZ Inc.",
      img: "/images/person-1.png",
    },
    {
      text: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer convallis volutpat dui quis scelerisque.",
      name: "Maria Jones",
      position: "CEO, Co-Founder, XYZ Inc.",
      img: "/images/person-1.png",
    },
  ];

  return (
    <section className="testimonial-section">
      <div className="container">
        <h2 className="section-title">Testimonials</h2>

        <Slider {...settings} className="testimonial-slider">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-item">
              <p className="testimonial-text">“{t.text}”</p>

              <div className="author-pic">
                <img src={t.img} alt={t.name} />
              </div>

              <h3 className="author-name">{t.name}</h3>
              <p className="position">{t.position}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Hometestimonialsection;
