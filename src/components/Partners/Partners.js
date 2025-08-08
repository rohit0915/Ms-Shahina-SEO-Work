/** @format */
import {
  areolase,
  revepeel,
  cosmelan,
  dermapen,
  dmk,
  facereality,
  hydrafacial,
  JetPeel,
  kilgour,
  meditresse,
  Quanta_System,
  skinbetter,
  reshape,
} from "../../assest";
import Slider from "react-slick";
import { ImageLazyLoading } from "../../utils/helpingComponent";

const Partners = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 0,
    cssEase: "linear",
    draggable: false,
    swipe: false,
    pauseOnHover: false,
    swipeToSlide: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const ourPartners = [
    {
      title: "Aerolase",
      img: areolase,
    },
    {
      title: "Revepeel",
      img: revepeel,
    },
    {
      title: "Cosmelan",
      img: cosmelan,
    },
    {
      title: "Dermapenworld",
      img: dermapen,
    },
    {
      title: "DMK",
      img: dmk,
    },
    {
      title: "Face Reality",
      img: facereality,
    },
    {
      title: "Hydrafacial",
      img: hydrafacial,
    },
    {
      title: "Jetpeel Germanic",
      img: JetPeel,
    },
    {
      title: "kilgour md",
      img: kilgour,
    },
    {
      title: "Medi Tresse",
      img: meditresse,
    },
    {
      title: "Quanta System",
      img: Quanta_System,
    },
    {
      title: "Skinbetter Science",
      img: skinbetter,
    },
    {
      title: "Reshape",
      img: reshape,
    },
  ];

  return (
    <div className="MaxComponent our-partners">
      <h5 className="title">OUR PARTNERS</h5>

      <div className="slider-cont">
        <Slider {...settings}>
          {ourPartners?.map((i, index) => (
            <div className="swiper-slide-img-container" key={index}>
              <ImageLazyLoading
                img={i.img}
                className={"sliding-img"}
                alt={i.title}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Partners;
