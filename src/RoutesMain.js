import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

const Signupas = lazy(() => import("../src/Pages/Common/signupas"));
const SignupCoach = lazy(() => import("./Pages/Common/signup-coach"));
const SignupAthletes = lazy(() => import("../src/Pages/Common/signup-athletes"));
const SignupBusiness = lazy(() => import("../src/Pages/Common/signup-business"));
const Login = lazy(() => import("./Pages/Common/Login"));
const OtpVerification = lazy(() => import("../src/Pages/Common/otp-verification"));
const ResetPassword = lazy(() => import("./Pages/Common/reset_password"));
const AboutUs = lazy(() => import("../src/Pages/about-us"));
const ChangePassword = lazy(() => import("./Pages/ChangePassword"));
const Chat = lazy(() => import("./Pages/Chat"));
const ContactUs = lazy(() => import("../src/Pages/contact-us"));
const Deals = lazy(() => import("../src/Pages/Deals"));
const Events = lazy(() => import("../src/Pages/Events"));
const Faq = lazy(() => import("../src/Pages/Faq"));
const FavoriteAthelete = lazy(() => import("../src/Pages/favorite-athlete"));
const HelpSupport = lazy(() => import("../src/Pages/HelpSupport"));
const InviteOthers = lazy(() => import("../src/Pages/InviteOthers"));
const Latest = lazy(() => import("../src/Pages/Latest"));
const NilMarketplace = lazy(() => import("../src/Pages/nil-marketplace"));
const CoachProfile = lazy(() => import("./Pages/coach-profile"));
const FanProfile = lazy(() => import("../src/Pages/fan-profile"));
const BusinessProfile = lazy(() => import("../src/Pages/business-profile"));
const MarketDetails = lazy(() => import("../src/Pages/athlete-profile"));
const ParentProfile = lazy(() => import("../src/Pages/parent-profile"));
const Save = lazy(() => import("../src/Pages/save"));
const Service = lazy(() => import("../src/Pages/service"));
const Team = lazy(() => import("../src/Pages/Team"));
const Wallet = lazy(() => import("../src/Pages/Wallet"));
const MakeDeal = lazy(() => import("../src/Pages/make-deal"));
const MarketDetail = lazy(() => import("../src/Pages/MarketDetail"));
const StudentProfile = lazy(() => import("../src/Pages/StudentProfile"));
const StudentAthlete = lazy(() => import("../src/Pages/StudentAthlete"));
const Request = lazy(() => import("../src/Pages/Request"));
const AthleteSetting = lazy(() => import("../src/Pages/athlete-setting"));

function Authorization() {
	let token = localStorage.getItem("strusertoken");
	return token !== null && token !== undefined && token !== "" ? <Outlet /> : <Navigate to={"/login"} />;
}

export default function RoutesMain() {
	return (
		<>
			<BrowserRouter>
				<Suspense
					fallback={
						<div>
							<div className="loading">
								{/* <div className="loading-text">
									<span className="loading-text-words">L</span>
									<span className="loading-text-words">O</span>
									<span className="loading-text-words">A</span>
									<span className="loading-text-words">D</span>
									<span className="loading-text-words">I</span>
									<span className="loading-text-words">N</span>
									<span className="loading-text-words">G</span>
								</div> */}
								<div className="load"></div>
							</div>
						</div>
					}
				>
					<Routes>
						<Route path="/" exact element={<Login />} />
						<Route path="/signupas" exact element={<Signupas />} />
						<Route path="/signupcoach" exact element={<SignupCoach />} />
						<Route path="/signupathletes" exact element={<SignupAthletes />} />
						<Route path="/signupbusiness" exact element={<SignupBusiness />} />
						<Route path="/login" exact element={<Login />} />
						<Route path="/otpverification" exact element={<OtpVerification />} />
						<Route path="/reset_password" exact element={<ResetPassword />} />
						<Route path="*" element={<Navigate to={"/login"} />} />

						<Route element={<Authorization />}>
							<Route path="/aboutus" strict element={<AboutUs />} />
							<Route path="/chat" strict element={<Chat />} />
							<Route path="/change-password" strict element={<ChangePassword />} />
							<Route path="/contact-us" strict element={<ContactUs />} />
							<Route path="/deal" strict element={<Deals />} />
							<Route path="/event" strict element={<Events />} />
							<Route path="/faq" strict element={<Faq />} />
							<Route path="/favoriteathlete" strict element={<FavoriteAthelete />} />
							<Route path="/help-support" strict element={<HelpSupport />} />
							<Route path="/invite-others" strict element={<InviteOthers />} />
							<Route path="/latest" strict element={<Latest />} />
							<Route path="/nilmarketplace" strict element={<NilMarketplace />} />
							<Route path="/coach-profile" strict element={<CoachProfile />} />
							<Route path="/business-profile" strict element={<BusinessProfile />} />
							<Route path="/athlete-profile" strict element={<MarketDetail />} />
							<Route path="/fan-profile" strict element={<FanProfile />} />
							<Route path="/parent-profile" strict element={<ParentProfile />} />
							<Route path="/save" strict element={<Save />} />
							<Route path="/service" strict element={<Service />} />
							<Route path="/team" strict element={<Team />} />
							<Route path="/request" strict element={<Request />} />
							<Route path="/offers" strict element={<Request />} />
							<Route path="/wallet" strict element={<Wallet />} />
							<Route path="/make-deal" strict element={<MakeDeal />} />
							<Route path="/market-detail" strict element={<MarketDetail />} />
							<Route path="/student-profile" strict element={<StudentProfile />} />
							<Route path="/student-athlete" strict element={<StudentAthlete />} />
							<Route path="/athlete-setting" strict element={<AthleteSetting />} />
						</Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</>
	);
}
