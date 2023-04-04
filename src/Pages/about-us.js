import React from "react";
import MainLayout1 from "../Components/Layout/MainLayout1";
import OurSponser from "../Pages/Common/OurSponser";
import Slider from "react-slick";
import Aboutbg from "../assets/images/about-1.png";
import AboutbgTwo from "../assets/images/about-2.png";
import CircleTwo from "../assets/images/circle-2.png";
import Circle from "../assets/images/circle-1.png";
import Arrow from "../assets/images/arrow_line.png";
import Side from "../assets/images/side1.png";
import SideTwo from "../assets/images/side2.png";
import Join from "../assets/images/join-icon.png";
import Time from "../assets/images/time-icon.png";
import Connect from "../assets/images/connect-icon.png";
import Brain from "../assets/images/brain-icon.png";
import Teamone from "../assets/images/about-team-1.png";
import Teamtwo from "../assets/images/about-team-2.png";
import Teamthree from "../assets/images/about-team-3.png";
import Teamfour from "../assets/images/about-team-4.png";

export default function AboutUs() {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		speed: 300,
		arrows: false,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					speed: 1000,
				},
			},
			{
				breakpoint: 540,
				settings: {
					slidesToShow: 1,
					speed: 1000,
				},
			},
		],
	};

	return (
		<MainLayout1>
			<section className="row-bg-comn-btm top-diff">
				<div className="container position-relative">
					<div className="row align-items-center">
						<div className="col-lg-12">
							<div className="text-center">
								<div className="purple-bg-text mt-5 mb-0">
									<h1>About Us</h1>
									<span className="d-block mt-4">Join Starprospect.com, where college coaches find and recruit the best high school athletes!</span>
								</div>
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
						<div className="col-xl-6 col-lg-8 mx-auto">
							<div className="comn-hero-section-main text-center d-block mb-5">
								<div className="position-relative border-btm-class">
									<h2>Who We Are</h2>
								</div>
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
							</div>
						</div>
					</div>
					<div className="row align-items-center">
						<div className="col-xl-5 col-md-6 order-md-0 order-1 mt-3 mt-md-0">
							<div className="about-intro-div">
								<h4>Lorem Ipsum is simply dummy text</h4>
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>

								<p>But also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
							</div>
						</div>
						<div className="col-xl-7 col-md-6 order-md-1 order-0">
							<div className="about-team-img-div d-md-flex justify-content-end">
								<img src={Aboutbg} className="img-fluid" alt="bg" />
							</div>
						</div>
					</div>
					<div className="row align-items-center">
						<div className="col-xl-7 col-md-6 mt-md-0 mt-3">
							<div className="about-team-img-div">
								<img src={AboutbgTwo} className="img-fluid" alt="bg" />
							</div>
						</div>
						<div className="col-xl-5 col-md-6">
							<div className="about-intro-div mt-3">
								<h4>Lorem Ipsum is simply dummy text</h4>
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</p>

								<p>But also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="row-inr-space-class comn-gray-bg position-relative">
				<div className="container position-relative">
					<div className="row align-items-center">
						<div className="col-xl-6 col-lg-8 mx-auto">
							<div className="comn-hero-section-main text-center d-block">
								<div className="position-relative border-btm-class">
									<h2>Our Services</h2>
								</div>
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
							</div>
						</div>
					</div>
					<div className="row justify-content-center me-0">
						<div className="col-2 mt-3 fix-col pe-0">
							<div className="cont-box-comn text-center position-relative">
								<div className="circle-1">
									<img src={Circle} alt="circle-bg" />
								</div>
								<div className="circle-2">
									<img src={CircleTwo} alt="circle-bg" />
								</div>
								<div className="h-100">
									<span>Athletes</span>
								</div>
								<div className="box-btm-part m-auto">
									<svg width="35" height="35" viewBox="0 0 45 55" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M33.3366 13.9578C33.3366 19.9409 28.4863 24.7912 22.5033 24.7912C16.5202 24.7912 11.6699 19.9409 11.6699 13.9578C11.6699 7.97476 16.5202 3.12451 22.5033 3.12451C28.4863 3.12451 33.3366 7.97476 33.3366 13.9578Z" stroke="url(#paint0_linear_4671_8529)" strokeWidth="6.23077" strokeLinecap="round" strokeLinejoin="round" />
										<path d="M22.5033 32.9162C12.0329 32.9162 3.54492 41.4041 3.54492 51.8745H41.4616C41.4616 41.4041 32.9737 32.9162 22.5033 32.9162Z" stroke="url(#paint1_linear_4671_8529)" strokeWidth="6.23077" strokeLinecap="round" strokeLinejoin="round" />
										<defs>
											<linearGradient id="paint0_linear_4671_8529" x1="5.07541" y1="13.3949" x2="46.7889" y2="19.2273" gradientUnits="userSpaceOnUse">
												<stop stopColor="#6A58FB" />
												<stop offset="1" stopColor="#4599F4" />
											</linearGradient>
											<linearGradient id="paint1_linear_4671_8529" x1="5.07541" y1="13.3949" x2="46.7889" y2="19.2273" gradientUnits="userSpaceOnUse">
												<stop stopColor="#6A58FB" />
												<stop offset="1" stopColor="#4599F4" />
											</linearGradient>
										</defs>
									</svg>
								</div>
							</div>
						</div>
						<div className="col-2 mt-3 fix-col pe-0">
							<div className="cont-box-comn text-center position-relative">
								<div className="circle-1">
									<img src={Circle} alt="circle-bg" />
								</div>
								<div className="circle-2">
									<img src={CircleTwo} alt="circle-bg" />
								</div>
								<div className="h-100">
									<span>Business</span>
								</div>
								<div className="box-btm-part m-auto">
									<svg width="35" height="35" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M47.4564 52.875V9.54167C47.4564 6.55012 45.0313 4.125 42.0397 4.125H14.9564C11.9648 4.125 9.53971 6.55012 9.53971 9.54167V52.875M47.4564 52.875L52.873 52.8749M47.4564 52.875H33.9147M9.53971 52.875L4.12305 52.8749M9.53971 52.875H23.0814M20.373 14.9583H23.0814M20.373 25.7916H23.0814M33.9147 14.9583H36.623M33.9147 25.7916H36.623M23.0814 52.875V39.3333C23.0814 37.8375 24.2939 36.6249 25.7897 36.6249H31.2064C32.7021 36.6249 33.9147 37.8375 33.9147 39.3333V52.875M23.0814 52.875H33.9147" stroke="url(#paint0_linear_4671_8531)" strokeWidth="6.69231" strokeLinecap="round" strokeLinejoin="round" />
										<defs>
											<linearGradient id="paint0_linear_4671_8531" x1="6.09082" y1="14.3954" x2="59.0592" y2="23.9175" gradientUnits="userSpaceOnUse">
												<stop stopColor="#6A58FB" />
												<stop offset="1" stopColor="#4599F4" />
											</linearGradient>
										</defs>
									</svg>
								</div>
							</div>
						</div>
						<div className="col-2 mt-3 fix-col pe-0">
							<div className="cont-box-comn text-center position-relative">
								<div className="circle-1">
									<img src={Circle} alt="circle-bg" />
								</div>
								<div className="circle-2">
									<img src={CircleTwo} alt="circle-bg" />
								</div>
								<div className="h-100">
									<span>Coach</span>
								</div>
								<div className="box-btm-part m-auto">
									<svg width="35" height="35" viewBox="0 0 55 49" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M19.3743 0.125C11.8955 0.125 5.83268 6.18781 5.83268 13.6667C5.83268 21.1455 11.8955 27.2083 19.3743 27.2083C26.8532 27.2083 32.916 21.1455 32.916 13.6667C32.916 6.18781 26.8532 0.125 19.3743 0.125ZM11.2493 13.6667C11.2493 9.17935 14.887 5.54167 19.3743 5.54167C23.8617 5.54167 27.4993 9.17935 27.4993 13.6667C27.4993 18.154 23.8617 21.7917 19.3743 21.7917C14.887 21.7917 11.2493 18.154 11.2493 13.6667Z" fill="url(#paint0_linear_4671_8449)" />
										<path d="M40.793 14.2578C40.031 13.8694 39.1879 13.6668 38.3327 13.6668V8.25016C40.0433 8.25016 41.7295 8.65507 43.2534 9.43205C43.4213 9.51763 43.5866 9.60745 43.7493 9.70139C45.064 10.4604 46.2063 11.4883 47.1004 12.7203C48.1051 14.1047 48.7677 15.7073 49.034 17.397C49.3002 19.0868 49.1626 20.8155 48.6323 22.4418C48.102 24.0681 47.1941 25.5457 45.983 26.7537C44.7718 27.9617 43.2918 28.8657 41.6642 29.3917C40.2158 29.8598 38.687 30.0168 37.1777 29.8549C36.9909 29.8349 36.8044 29.81 36.6184 29.7802C34.9305 29.5097 33.3306 28.8436 31.9495 27.8364L31.9467 27.8343L35.1397 23.4588C35.8305 23.963 36.6311 24.2962 37.4755 24.4316C38.32 24.5669 39.1846 24.5004 39.9984 24.2374C40.8122 23.9743 41.5522 23.5224 42.1577 22.9184C42.7633 22.3144 43.2172 21.5756 43.4823 20.7625C43.7475 19.9494 43.8163 19.085 43.6832 18.2402C43.55 17.3954 43.2187 16.5941 42.7164 15.9019C42.214 15.2097 41.5549 14.6463 40.793 14.2578Z" fill="url(#paint1_linear_4671_8449)" />
										<path d="M49.1609 48.875C49.1609 47.453 48.8808 46.045 48.3366 44.7312C47.7925 43.4175 46.9949 42.2238 45.9894 41.2183C44.9839 40.2128 43.7902 39.4152 42.4765 38.8711C41.1627 38.3269 39.7547 38.0468 38.3327 38.0468V32.625C40.18 32.625 42.0116 32.94 43.7493 33.5544C44.019 33.6497 44.2864 33.7523 44.5513 33.862C46.5228 34.6786 48.3142 35.8756 49.8232 37.3845C51.3321 38.8935 52.5291 40.6849 53.3457 42.6564C53.4554 42.9212 53.558 43.1887 53.6533 43.4583C54.2677 45.1961 54.5827 47.0277 54.5827 48.875H49.1609Z" fill="url(#paint2_linear_4671_8449)" />
										<path d="M38.3327 48.875H32.916C32.916 41.3961 26.8532 35.3333 19.3743 35.3333C11.8955 35.3333 5.83268 41.3961 5.83268 48.875H0.416016C0.416016 38.4046 8.90395 29.9167 19.3743 29.9167C29.8447 29.9167 38.3327 38.4046 38.3327 48.875Z" fill="url(#paint3_linear_4671_8449)" />
										<defs>
											<linearGradient id="paint0_linear_4671_8449" x1="2.60243" y1="10.3954" x2="61.0271" y2="22.0654" gradientUnits="userSpaceOnUse">
												<stop stopColor="#6A58FB" />
												<stop offset="1" stopColor="#4599F4" />
											</linearGradient>
											<linearGradient id="paint1_linear_4671_8449" x1="2.60243" y1="10.3954" x2="61.0271" y2="22.0654" gradientUnits="userSpaceOnUse">
												<stop stopColor="#6A58FB" />
												<stop offset="1" stopColor="#4599F4" />
											</linearGradient>
											<linearGradient id="paint2_linear_4671_8449" x1="2.60243" y1="10.3954" x2="61.0271" y2="22.0654" gradientUnits="userSpaceOnUse">
												<stop stopColor="#6A58FB" />
												<stop offset="1" stopColor="#4599F4" />
											</linearGradient>
											<linearGradient id="paint3_linear_4671_8449" x1="2.60243" y1="10.3954" x2="61.0271" y2="22.0654" gradientUnits="userSpaceOnUse">
												<stop stopColor="#6A58FB" />
												<stop offset="1" stopColor="#4599F4" />
											</linearGradient>
										</defs>
									</svg>
								</div>
							</div>
						</div>
						<div className="col-2 mt-3 fix-col pe-0">
							<div className="cont-box-comn text-center position-relative">
								<div className="circle-1">
									<img src={Circle} alt="circle-bg" />
								</div>
								<div className="circle-2">
									<img src={CircleTwo} alt="circle-bg" />
								</div>
								<div className="h-100">
									<span>Parent</span>
								</div>
								<div className="box-btm-part m-auto">
									<svg width="35" height="35" viewBox="0 0 53 61" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path fillRule="evenodd" clipRule="evenodd" d="M14.4194 0.686568C9.74144 1.69124 6.68685 6.35077 7.64811 11.0156C8.34947 14.4199 11.0919 17.1934 14.4244 17.8689L15.2367 18.0335L13.8338 18.1104C10.1879 18.3102 7.13626 19.6673 4.5872 22.2227C2.60318 24.2117 1.32182 26.5683 0.726259 29.3239C0.425675 30.7148 0.424389 33.6328 0.72357 35.2427C1.14785 37.5249 2.19329 40.1084 3.41854 41.9025L3.95458 42.6873V50.8952C3.95458 58.8899 3.96066 59.1149 4.18993 59.5654C4.34145 59.8632 4.58977 60.1122 4.88685 60.2641C5.34433 60.498 5.53128 60.5 26.7527 60.5C47.9741 60.5 48.161 60.498 48.6185 60.2641C48.9156 60.1122 49.1639 59.8632 49.3154 59.5654C49.5447 59.1149 49.5508 58.8899 49.5508 50.8952V42.6873L50.0868 41.9025C51.273 40.1655 52.2292 37.855 52.7219 35.5357C53.0628 33.9307 53.097 30.6895 52.7873 29.3429C51.7968 25.0376 49.2079 21.6021 45.5118 19.6884C43.5993 18.6981 41.8126 18.2183 39.6131 18.1039L38.2686 18.0341L39.0675 17.8719C42.2267 17.2305 44.9035 14.6886 45.7532 11.5228C45.8505 11.1607 45.9627 10.3623 46.0027 9.74861C46.371 4.09718 41.1053 -0.470229 35.5455 0.678012C30.8083 1.65631 27.7229 6.31034 28.6925 11.0156C29.3935 14.418 32.1126 17.1704 35.4688 17.8747C36.2597 18.0408 36.1875 18.0464 32.7152 18.0911C28.7706 18.142 28.6088 18.1684 27.3683 18.964L26.7527 19.3587L26.137 18.964C24.906 18.1745 24.7288 18.1451 20.7901 18.0761C18.4671 18.0356 17.428 17.9823 17.8088 17.9233C20.4475 17.5149 23.0719 15.432 24.2487 12.8121C24.6742 11.8651 24.8776 10.9866 24.9583 9.74861C25.2827 4.77134 21.1642 0.44888 16.1477 0.501504C15.6466 0.506661 14.8689 0.589993 14.4194 0.686568ZM17.3062 4.13868C18.319 4.35222 19.1573 4.81529 19.9184 5.5818C22.9336 8.61831 21.2899 13.7342 17.0658 14.4604C15.4069 14.7456 13.7698 14.2095 12.5426 12.9792C10.4661 10.8977 10.4647 7.65642 12.5393 5.5845C13.8377 4.28776 15.55 3.76831 17.3062 4.13868ZM38.3506 4.13868C39.3634 4.35222 40.2017 4.81529 40.9628 5.5818C43.978 8.61831 42.3343 13.7342 38.1102 14.4604C36.4513 14.7456 34.8142 14.2095 33.587 12.9792C31.5105 10.8977 31.5091 7.65642 33.5837 5.5845C34.8821 4.28776 36.5944 3.76831 38.3506 4.13868ZM23.9719 21.7773L24.3361 21.9661L23.5276 22.3879C22.3729 22.9904 21.0724 24.3148 20.5149 25.4562C19.7395 27.0437 19.5548 28.6859 19.9688 30.3089C20.3067 31.6328 20.8256 32.532 21.8383 33.5472C22.8368 34.548 23.7429 35.0798 25.0226 35.4159L25.8758 35.64L24.239 35.6479C22.5121 35.6561 21.7913 35.7831 20.82 36.2504C20.0656 36.6134 18.9062 37.7944 18.5592 38.5537C18.2793 39.1658 18.2751 39.169 17.7405 39.169C16.9724 39.169 15.5172 38.769 14.6739 38.3261C13.7255 37.828 12.3071 36.406 11.8102 35.4553C11.3613 34.5964 10.9694 33.1478 10.9694 32.3478C10.9694 31.2469 10.1962 30.3787 9.21568 30.3787C8.62013 30.3787 7.96237 30.7927 7.68178 31.344C7.46151 31.7769 7.43942 31.9599 7.50173 32.8369C7.82453 37.3748 10.9644 41.1767 15.3536 42.3442C16.0528 42.53 16.776 42.6082 18.218 42.6535C20.4626 42.724 20.8656 42.8521 21.2562 43.6197C21.7164 44.5241 21.4063 45.5321 20.5297 45.9804C20.0658 46.2176 19.9259 46.2277 17.9885 46.1638C16.8098 46.125 15.599 46.0188 15.1404 45.9143C12.3478 45.2775 10.0641 44.0253 8.0946 42.0509C6.10976 40.0611 4.88124 37.7992 4.22723 34.9307C3.9229 33.5955 3.95494 30.7233 4.28779 29.4997C5.37508 25.503 8.60645 22.4941 12.5868 21.7722C13.254 21.6511 14.7765 21.6069 18.5454 21.599C22.985 21.5898 23.6524 21.6117 23.9719 21.7773ZM41.6591 21.9184C45.3874 22.954 48.2059 25.7811 49.2176 29.4997C49.5504 30.7233 49.5824 33.5955 49.2781 34.9307C48.2847 39.2878 45.6036 42.7744 41.7507 44.7195C39.7996 45.7044 38.1985 46.0754 35.5168 46.1638C33.5795 46.2277 33.4395 46.2176 32.9756 45.9804C32.1105 45.5379 31.7889 44.524 32.2356 43.6464C32.634 42.8635 33.0751 42.7197 35.2873 42.6519C36.7337 42.6076 37.4505 42.5306 38.1517 42.3442C42.541 41.1767 45.6808 37.3748 46.0036 32.8369C46.0659 31.9599 46.0438 31.7769 45.8236 31.344C45.6566 31.0159 45.4181 30.7717 45.1111 30.6147C43.842 29.9657 42.536 30.8446 42.536 32.3478C42.536 33.1478 42.1441 34.5964 41.6951 35.4553C41.1982 36.406 39.7798 37.828 38.8314 38.3261C37.9878 38.7692 36.5328 39.169 35.7639 39.169C35.229 39.169 35.2239 39.1652 34.9386 38.5537C34.5841 37.7937 33.4345 36.6256 32.676 36.2545C31.7099 35.7821 31.0025 35.6562 29.2663 35.6479L27.6295 35.64L28.4828 35.4159C29.7625 35.0798 30.6686 34.548 31.667 33.5472C33.4228 31.7869 34.0945 29.5566 33.5916 27.1557C33.1861 25.2192 31.7352 23.3047 29.9785 22.3883L29.1709 21.9669L29.5109 21.7784C29.8123 21.6112 30.4679 21.5938 35.2873 21.6242C40.4845 21.6572 40.765 21.6701 41.6591 21.9184ZM28.3236 25.506C29.5464 26.1059 30.1968 27.1872 30.1968 28.6207C30.1968 29.6192 29.954 30.287 29.3336 30.9954C28.3824 32.0814 26.5608 32.4154 25.2115 31.7512C23.3379 30.8288 22.6974 28.4958 23.8275 26.7095C24.7602 25.235 26.7081 24.7137 28.3236 25.506ZM31.016 39.3665C31.2433 39.4751 31.4291 39.5939 31.429 39.6302C31.4289 39.6666 31.1934 39.8455 30.9057 40.0277C30.243 40.4473 29.4181 41.3629 29.0895 42.0434C28.3209 43.635 28.3267 45.2628 29.1065 46.865C29.4766 47.6255 30.6419 48.7779 31.4 49.1333L32.0138 49.421V53.2025V56.9839H26.7527H21.4916L21.492 53.2041L21.4924 49.4243L22.2519 49.0306C24.305 47.9664 25.4277 45.4233 24.833 43.1839C24.4791 41.8513 23.613 40.6356 22.5887 40.0338C22.3068 39.8682 22.0761 39.6945 22.0761 39.6479C22.0761 39.6012 22.2472 39.4778 22.4561 39.3735C22.7822 39.2108 23.387 39.1829 26.7195 39.1765C30.1298 39.1699 30.6532 39.193 31.016 39.3665ZM10.2094 47.8731C12.2137 48.875 14.5627 49.5118 16.8443 49.6719L17.9842 49.7519V53.3679V56.9839H12.7231H7.46198V51.5899V46.1958L8.3096 46.7715C8.77574 47.0881 9.63072 47.5838 10.2094 47.8731ZM46.0434 51.5926V56.9839H40.7823H35.5212V53.3679V49.7519L36.6611 49.6719C38.0989 49.571 39.8356 49.2215 41.1915 48.7602C42.4496 48.3322 44.4862 47.3115 45.3568 46.6725C45.7023 46.4191 45.9981 46.2093 46.0141 46.2064C46.0301 46.2035 46.0434 48.6273 46.0434 51.5926Z" fill="url(#paint0_linear_4289_36161)" />
										<defs>
											<linearGradient id="paint0_linear_4289_36161" x1="2.61914" y1="13.1405" x2="60.0836" y2="22.1796" gradientUnits="userSpaceOnUse">
												<stop stopColor="#6A58FB" />
												<stop offset="1" stopColor="#4599F4" />
											</linearGradient>
										</defs>
									</svg>
								</div>
							</div>
						</div>
						<div className="col-2 mt-3 fix-col pe-0">
							<div className="cont-box-comn text-center position-relative">
								<div className="circle-1">
									<img src={Circle} alt="circle-bg" />
								</div>
								<div className="circle-2">
									<img src={CircleTwo} alt="circle-bg" />
								</div>
								<div className="h-100">
									<span>Fan</span>
								</div>
								<div className="box-btm-part m-auto">
									<svg width="35" height="35" viewBox="0 0 57 49" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M7.69464 7.11114C2.93512 11.8707 2.93512 19.5874 7.69464 24.3469L28.5001 45.1524L49.3054 24.3469C54.0649 19.5873 54.0649 11.8707 49.3054 7.11114C44.5458 2.35163 36.8291 2.35163 32.0696 7.11114L28.5001 10.6809L24.9304 7.11114C20.1708 2.35163 12.4542 2.35163 7.69464 7.11114Z" stroke="url(#paint0_linear_4671_8532)" strokeWidth="6.69" strokeLinecap="round" strokeLinejoin="round" />
										<defs>
											<linearGradient id="paint0_linear_4671_8532" x1="6.09277" y1="12.3078" x2="58.4505" y2="23.3351" gradientUnits="userSpaceOnUse">
												<stop stopColor="#6A58FB" />
												<stop offset="1" stopColor="#4599F4" />
											</linearGradient>
										</defs>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="row-inr-space-class comn-white-bg position-relative">
				<div className="container position-relative">
					<div className="row align-items-center">
						<div className="col-xl-6 col-lg-8 mx-auto">
							<div className="comn-hero-section-main text-center d-block mb-5">
								<div className="position-relative border-btm-class">
									<h2>How We Works</h2>
								</div>
								<p>Sports Scholarship Consulting Since 2008 Find out more about our unique Sports Scholarship Consulting offering; We promise you will not regret it!</p>
							</div>
						</div>
					</div>
					<div className="row aline-items-center position-relative">
						<div className="arrow-line-img">
							<img src={Arrow} className="img-fluid" alt="arrow" />
						</div>
						<div className="col-lg-3 col-sm-6 col-index pe-0 mb-lg-0 mb-3">
							<div className="work-main-div">
								<div>
									<div className="work-innr-img ">
										<img src={Join} alt="icon" className="img-fluid" />
									</div>
									<div className="work-inner-class mt-3">
										<span className="d-block">Join For Free</span>
										<p className="mt-auto">Lorem Ipsum is simply dummy text of theprinting and typesetting industry.</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-sm-6 col-index mb-lg-0 pe-0 mb-3">
							<div className="work-main-div">
								<div>
									<div className="work-innr-img ">
										<img src={Time} alt="icon" className="img-fluid" />
									</div>
									<div className="work-inner-class mt-3">
										<span className="d-block">Post Your Profile</span>
										<p className="mt-auto">Get Recruited. Find Your Next Contract. Play At Your Highest Level!</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-sm-6 col-index mb-lg-0 pe-0 mb-3">
							<div className="work-main-div">
								<div>
									<div className="work-innr-img ">
										<img src={Connect} alt="icon" className="img-fluid" />
									</div>
									<div className="work-inner-class mt-3">
										<span className="d-block">Connect</span>
										<p className="mt-auto">Gain access to a network of relationships across the world! Connecting together athletes, coaches, teams, universities, scouts, businesses, agents, managers, and fans!</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-sm-6 col-index mb-lg-0 pe-0 mb-3">
							<div className="work-main-div">
								<div>
									<div className="work-innr-img">
										<img src={Brain} alt="icon" className="img-fluid" />
									</div>
									<div className="work-inner-class mt-3">
										<span className="d-block">Gain Brand Exposure</span>
										<p className="mt-auto">Promote your Name, Image, and Likeness!</p>
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
						<div className="col-xl-6 col-lg-8 mx-auto">
							<div className="comn-hero-section-main text-center d-block">
								<div className="position-relative border-btm-class">
									<h2>Our Team</h2>
								</div>
								<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
							</div>
						</div>
						<div className="col-12 pt-md-5 pt-3 cust-team-slider">
							<Slider {...settings}>
								<div className="team-section-box">
									<img src={Teamone} className="w-100" alt="team-member" />
									<div className="team-tab">
										<span className="d-block">Lorem Ipsum</span>
										<bdi>Chief Executive Officer</bdi>
									</div>
								</div>
								<div className="team-section-box">
									<img src={Teamtwo} className="w-100" alt="team-member" />
									<div className="team-tab">
										<span className="d-block">Lorem Ipsum</span>
										<bdi>Chief Executive Officer</bdi>
									</div>
								</div>
								<div className="team-section-box">
									<img src={Teamthree} className="w-100" alt="team-member" />
									<div className="team-tab">
										<span className="d-block">Lorem Ipsum</span>
										<bdi>Chief Executive Officer</bdi>
									</div>
								</div>
								<div className="team-section-box">
									<img src={Teamfour} className="w-100" alt="team-member" />
									<div className="team-tab">
										<span className="d-block">Lorem Ipsum</span>
										<bdi>Chief Executive Officer</bdi>
									</div>
								</div>
								<div className="team-section-box">
									<img src={Teamone} className="w-100" alt="team-member" />
									<div className="team-tab">
										<span className="d-block">Lorem Ipsum</span>
										<bdi>Chief Executive Officer</bdi>
									</div>
								</div>
							</Slider>
						</div>
					</div>
				</div>
			</section>
			<section className="row-inr-space-class comn-white-bg position-relative">
				<OurSponser />
			</section>
		</MainLayout1>
	);
}
