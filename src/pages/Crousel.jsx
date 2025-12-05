import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { SliderData } from "../projectData/CarouselData";
import "./Crousel.css";
import { Link } from "react-router-dom";

export default function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        cssEase: "linear",
        appendDots: dots => (
            <div>
                <ul style={{ margin: "0px" }}>{dots}</ul>
            </div>
        ),
        customPaging: i => <div className="custom-dot" />
    };

    return (
        <div className="carousel-wrapper">
            <Slider {...settings}>
                {SliderData.map((item, index) => (
                    <div key={index} className="relative">
                        {/* Background Type Label */}
                        <h2 className="type-bg-text">
                            {item.type}
                        </h2>

                        {/* Foreground Content */}
                        <div className="slide-content flex flex-col md:flex-row items-center max-w-7xl mx-auto px-6 py-12 relative z-10">
                            {/* LEFT TEXT BLOCK */}
                            <div className="w-full md:w-1/2 flex flex-col items-start text-left p-6">
                                <h5 className="text-3xl md:text-6xl font-bold text-white mb-4">{item.title}</h5>
                                <h1 className="text-lg md:text-2xl font-semibold text-white mb-4">{item.tagline}</h1>
                                <h3 className="text-white text-xl md:text-2xl mb-6">
                                    ₹{item.finalPrice}{" "}
                                    <span className="text-gray-500 line-through ml-3">{item.originalPrice}</span>
                                </h3>
                                <Link to={`/product/${item.id}`}>
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 mt-3 py-3 rounded-md font-bold">
                                        Shop Now
                                    </button>
                                </Link>
                            </div>

                            {/* RIGHT IMAGE BLOCK */}
                            <div className="flex md:w-[45%] w-full justify-end ml-auto -mr-8">
                                <img
                                    src={item.images}
                                    alt={item.title}
                                    className="w-full object-contain md:h-[600px] h-[500px]"
                                />
                            </div>


                        </div>

                    </div>
                ))}
            </Slider>
        </div>
    );
}
