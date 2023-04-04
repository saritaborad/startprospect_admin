import React from 'react';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Spn_1 from "../../assets/images/sponser-1.png";
import Spn_2 from "../../assets/images/sponser-2.png";
import Spn_3 from "../../assets/images/sponser-3.png";
import Spn_4 from "../../assets/images/sponser-4.png";
import Spn_5 from "../../assets/images/sponser-5.png";
import Spn_6 from "../../assets/images/sponser-6.png";
import Spn_7 from "../../assets/images/sponser-7.png";

export default function OurSponser() {

    const slider = {
        centerMode: true,
        arrows: false,
        infinite: true,
        slidesToShow: 7,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        initialSlide: 0,
        swipeToSlide: true,

        responsive: [
            {
                breakpoint: 1599,
                settings: {
                    centerMode: false,
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1199,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    centerMode: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    centerMode: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container-fluid position-relative">
            <div className="row align-items-center">
                <div className="col-xl-6 col-lg-8 mx-auto">
                    <div className="comn-hero-section-main text-center d-block">
                        <div className="position-relative border-btm-class">
                            <h2>Our Sponsors</h2>
                        </div>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                </div>
                <div className="col-12 p-0 mt-3">
                    <div className="slider-comn-part slide-cust-sponcer">
                        <Slider {...slider}>
                            <div className="sponser-main-div">
                                <Link to="/" className="">
                                    <img src={Spn_1} alt="sponsor" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="sponser-main-div">
                                <Link to="/" className="">
                                    <img src={Spn_2} alt="sponsor" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="sponser-main-div">
                                <Link to="/" className="">
                                    <img src={Spn_3} alt="sponsor" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="sponser-main-div">
                                <Link to="/" className="">
                                    <img src={Spn_4} alt="sponsor" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="sponser-main-div">
                                <Link to="/" className="">
                                    <img src={Spn_5} alt="sponsor" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="sponser-main-div">
                                <Link to="/" className="">
                                    <img src={Spn_6} alt="sponsor" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="sponser-main-div">
                                <Link to="/" className="">
                                    <img src={Spn_7} alt="sponsor" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="sponser-main-div">
                                <Link to="/" className="">
                                    <img src={Spn_4} alt="sponsor" className="img-fluid" />
                                </Link>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}