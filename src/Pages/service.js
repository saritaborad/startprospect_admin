import React from "react";
import MainLayout1 from "../Components/Layout/MainLayout1";
import { useNavigate } from "react-router-dom";
import OurSponser from "../Pages/Common/OurSponser";
import Side from "../assets/images/side1.png";
import ServiceOne from "../assets/images/service_icn_1.svg";
import ServiceTwo from "../assets/images/service_icn_2.svg";
import ServiceThree from "../assets/images/service_icn_3.svg";
import ServiceFour from "../assets/images/service_icn_4.svg";
import SideTwo from "../assets/images/side2.png";
import AthleteMain from "../assets/images/service-athlete-img.png";
import Business from "../assets/images/Make-deal-phone.png";
import Coach from "../assets/images/service-coach-img.png";
import Parents from "../assets/images/service-parent-img.png";
import Fan from "../assets/images/service-fan-img.png";

export default function Services() {
  const navigate = useNavigate();

  return (
    <>
      <MainLayout1>
        <section className="row-bg-comn-btm top-diff">
          <div className="container position-relative">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="text-center">
                  <div className="purple-bg-text mt-5 mb-0">
                    <h1>Services</h1>
                    <span className="d-block mt-4">Join Starprospect.com, where college coaches find and recruit the best high school athletes!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="service-provide-oppotunity position-relative">
          <div className="container position-relative">
            <div className="row">
              <div className="col-md-8 m-auto">
                <div className="text-center service-opportunity-div">
                  <h2>We Provides Great Opportunity For Athletes And Business 👍🏼</h2>
                  <span className="d-block mt-5">
                    STRPROSPECT is a platform from which local athletes celebrities and businesses get an opportunity to meet both's needs and make money for athletes by advertising business on their social media
                    profiles with great deals.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="row-inr-space-class comn-white-bg position-relative">
          <div className="side-1">
            <img src={Side} className="img-fluid" alt="side-bg" />
          </div>
          <div className="side-2">
            <img src={SideTwo} className="img-fluid" alt="side-bg" />
          </div>
          <div className="container position-relative">
            <div className="row align-items-center">
              <div className="col-xl-5 col-lg-6">
                <div className="text-lg-start text-center pb-5 pb-lg-0 position-relative">
                  <img src={AthleteMain} className="img-fluid" alt="Nil Market" />
                </div>
              </div>
              <div className="col-lg-6 mx-lg-auto">
                <div className="comn-hero-section-main d-block">
                  <div className="service-auth-class d-flex align-items-center mb-3">
                    <bdi>
                      <img src={ServiceOne} alt="athlete-icn" />
                    </bdi>
                    <span>Athletes</span>
                  </div>
                  <div className="position-relative explor-border-btm">
                    <h2>get online deals for your social media profiles and make money</h2>
                  </div>
                  <p>
                    Get benefits of STARPROSPECT by getting online NILDEALS of endorse business on your social media profiles and earning money as an athlete celebrity. We assure you would praise your decision of coming
                    on starprospect.
                  </p>
                  <div className="row">
                    <div className="col-sm-6 my-3">
                      <button className="comn-btn-class" type="button" onClick={() => navigate("/signupas")}>
                        Start As an athelete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="row-inr-space-class comn-gray-bg position-relative">
          <div className="container position-relative">
            <div className="row align-items-center">
              <div className="col-lg-6 mx-lg-auto order-lg-0 order-1">
                <div className="comn-hero-section-main d-block">
                  <div className="service-auth-class d-flex align-items-center mb-3">
                    <bdi>
                      <img src={ServiceTwo} alt="business-icn" />
                    </bdi>
                    <span>Business</span>
                  </div>
                  <div className="position-relative txt-border-btm">
                    <h2>Make deal in a Minutes for your business</h2>
                  </div>
                  <p className="mt-5">Endorse your business online with help of local famous athletes by posting sponsor posts on their social media profiles.</p>
                  <p className="mt-0">Find the best athletes according to your business with various filters and directly hire them for sponsor posts of your business.</p>
                  <div className="row">
                    <div className="col-sm-6 my-3">
                      <button className="comn-btn-class" type="button" onClick={() => navigate("/signupas")}>
                        start as a business
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 order-lg-1 order-0">
                <div className="text-lg-start text-center pb-5 pb-lg-0 position-relative">
                  <img src={Business} className="img-fluid" alt="business" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="row-inr-space-class comn-white-bg position-relative">
          <div className="side-1">
            <img src={Side} className="img-fluid" alt="side-bg" />
          </div>
          <div className="side-2">
            <img src={SideTwo} className="img-fluid" alt="side-bg" />
          </div>
          <div className="container position-relative">
            <div className="row align-items-center">
              <div className="col-xl-5 col-lg-6">
                <div className="text-lg-start text-center pb-5 pb-lg-0 position-relative">
                  <img src={Coach} className="img-fluid" alt="Nil Market" />
                </div>
              </div>
              <div className="col-lg-6 mx-lg-auto">
                <div className="comn-hero-section-main d-block">
                  <div className="service-auth-class d-flex align-items-center mb-3">
                    <bdi>
                      <img src={ServiceThree} alt="coach-icn" />
                    </bdi>
                    <span>Coach</span>
                  </div>
                  <div className="position-relative txt-border-btm">
                    <h2>Create teams and handle players</h2>
                  </div>
                  <p>Create teams as a coach and handle your school’s athelets in your team with facilities of creating events and other.</p>
                  <div className="row">
                    <div className="col-sm-6 my-3">
                      <button className="comn-btn-class" type="button">
                        start as a coach
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="row-inr-space-class comn-gray-bg position-relative">
          <div className="container position-relative">
            <div className="row align-items-center">
              <div className="col-lg-6 mx-lg-auto order-lg-0 order-1">
                <div className="comn-hero-section-main d-block">
                  <div className="service-auth-class d-flex align-items-center mb-3">
                    <bdi>
                      <img src={ServiceFour} alt="parents-icn" />
                    </bdi>
                    <span>Parents</span>
                  </div>
                  <div className="position-relative txt-border-btm">
                    <h2>Manage your child’s profile as a guardian</h2>
                  </div>
                  <p className="mt-5">Connect with your children’s profile and you can manage their profile as well as market your child to coaches to play in their teams.</p>
                  <p className="mt-0">Observe other young athletes on starprospect and improve the profile of your children with edit and viewing all deals.</p>
                  <div className="row">
                    <div className="col-sm-6 my-3">
                      <button className="comn-btn-class" type="button" onClick={() => navigate("/signupas")}>
                        start as a parent
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 order-lg-1 order-0">
                <div className="text-lg-start text-center pb-5 pb-lg-0 position-relative">
                  <img src={Parents} className="img-fluid" alt="Nil Market" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="row-inr-space-class comn-white-bg position-relative">
          <div className="side-1">
            <img src={Side} className="img-fluid" alt="side-bg" />
          </div>
          <div className="side-2">
            <img src={SideTwo} className="img-fluid" alt="side-bg" />
          </div>
          <div className="container position-relative">
            <div className="row align-items-center">
              <div className="col-xl-5 col-lg-6">
                <div className="text-lg-start text-center pb-5 pb-lg-0 position-relative">
                  <img src={Fan} className="img-fluid" alt="Nil Market" />
                </div>
              </div>
              <div className="col-lg-6 mx-lg-auto">
                <div className="comn-hero-section-main d-block">
                  <div className="service-auth-class d-flex align-items-center mb-3">
                    <bdi>
                      <img src={ServiceThree} alt="fan-icn" />
                    </bdi>
                    <span>Fan</span>
                  </div>
                  <div className="position-relative explor-border-btm">
                    <h2>Support and see your favorite athlete on starprospect</h2>
                  </div>
                  <p>
                    Login on the starprospect as a fan and you can view all the deals available for athletes and also can support your favorite celebrity by donating to them as well as get up to date with news related to
                    that.
                  </p>
                  <div className="row">
                    <div className="col-sm-6 my-3">
                      <button className="comn-btn-class" type="button" onClick={() => navigate("/signupas")}>
                        start as a fan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="row-inr-space-class position-relative">
          <OurSponser />
        </section>
      </MainLayout1>
    </>
  );
}
