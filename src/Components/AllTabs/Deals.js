import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FetchPostApi } from "../../Api/apiServices";
import { API_Path } from "../../Api/Const";
import DefaultPro from "../../assets/images/defaultProPic.png";
import SocOne from "../../assets/images/soc-p-1.png";
import SocTwo from "../../assets/images/soc-p-4.png";
import SocThree from "../../assets/images/soc-p-5.png";
import SocFour from "../../assets/images/soc-p-6.png";
import SocFive from "../../assets/images/soc-p-3.png";
import SocSix from "../../assets/images/soc-p-2.png";

export default function Deals(props) {
	const [open, setOpen] = useState(false);
	const [Deals, setDeals] = useState([]);
	const [nicheRecord, setNicheRecord] = useState([]);
	const [niche, setNiche] = useState("");
	const [search, setSearch] = useState("");
	const [timer, setTimer] = useState(null);
	const [limit, setLimit] = useState(9);
	const [totalDeal, setTotalDeal] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getNiches();
	}, []);

	useEffect(() => {
		getDeal();
	}, [niche, limit]);

	const inputChanged = (e) => {
		setSearch(e.target.value);
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			getDeal();
		}, 1000);
		setTimer(newTimer);
	};

	const getDeal = async () => {
		setLoading(true);
		let data = {
			DealName: search,
			status: "",
			niche: niche,
			limit: limit,
		};
		let result = await FetchPostApi(API_Path.searchDeal, data);
		let allDeals = await result.json();
		if (result.status === 200) {
			setDeals(allDeals.data.deal);
			setTotalDeal(allDeals?.data?.totalDeal);
			setLoading(false);
		} else {
			toast.error(allDeals?.message);
		}
	};

	const getNiches = async () => {
		let result = await FetchPostApi(API_Path.getAllNiche);
		let allNiche = await result.json();
		if (result.status === 200) {
			setNicheRecord(allNiche?.data);
		} else {
			toast.error(allNiche?.message);
		}
	};

	const handleNiche = (e) => {
		if (e.target.checked) {
			if (e.target.value === "All") {
				setNiche("");
			} else {
				setNiche(e.target.value);
			}
		}
	};

	return (
		<div className="row">
			<div className="col-12">
				<div className="row">
					<div className="col-sm-6">
						<div className="position-relative">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
								<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
							</svg>
							<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" value={search} onChange={(e) => inputChanged(e)} />
						</div>
					</div>
					{/* <div className=" col-sm-6 text-sm-end mt-sm-0 mt-3">
						<button className="btn filter-btn me-3" onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
							<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
								<path d="M1.125 2.125C1.125 1.57272 1.57272 1.125 2.125 1.125H18.875C19.4273 1.125 19.875 1.57272 19.875 2.125V4.87745C19.875 5.14267 19.7696 5.39702 19.5821 5.58456L12.8762 12.2904C12.6887 12.478 12.5833 12.7323 12.5833 12.9975V15.7083L8.41667 19.875V12.9975C8.41667 12.7323 8.31131 12.478 8.12377 12.2904L1.41789 5.58456C1.23036 5.39702 1.125 5.14267 1.125 4.87745V2.125Z" stroke="#7B838A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							Filter
						</button>
						<button className="btn filter-btn">
							<svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
								<path d="M1.125 1.16663H14.6667M1.125 5.33329H10.5M1.125 9.49996H10.5M15.7083 5.33329V17.8333M15.7083 17.8333L11.5417 13.6666M15.7083 17.8333L19.875 13.6666" stroke="#7B838A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							Sort
						</button>
					</div> */}
				</div>
			</div>
			<div className="col-12 filtr-title mt-3 border-0 d-flex align-items-center">
				<span>Categories </span>
				{/* <bdi className="ms-auto">See All</bdi> */}
			</div>
			<div className="row">
				<div className="col-12 mt-3">
					<div className="top-trending-custom-check mb-4 d-flex">
						{nicheRecord.length > 0 &&
							nicheRecord?.map((item) => {
								return (
									<label className="cust-chk-bx-soc p-0" key={item?.id}>
										<input type="radio" name="field" value={item?.name} onClick={(e) => handleNiche(e)} />
										<span className="cust-trend-chkbox">{item?.name}</span>
									</label>
								);
							})}
					</div>
				</div>
			</div>
			{Deals?.length > 0 ? (
				Deals?.map((item) => {
					return (
						<div className="col-lg-4 col-md-6 mb-3" key={item?._id}>
							<div className="deal-personal-box-div p-3">
								<div className="row">
									<div className="col-xl-4 col-md-12 col-sm-3">
										<div className="deal-personal-img ">
											<img src={item?.Activities?.length > 0 ? item?.Activities[0]?.image[0] : require({ DefaultPro })} alt="" className="img-fluid" />
										</div>
									</div>
									<div className="col-xl-8 col-md-12 col-sm-9 mt-3 mt-xl-0">
										<div className="deal-profile-img-class d-flex">
											<span className="energy-div">
												<img src={item?.details?.profile_img ? item?.details?.profile_img : require({ DefaultPro })} className="deal_Profile" alt="" />
											</span>
											<div className="ms-3">
												<bdi>{item?.details?.company_name?.length < 20 ? item?.details?.company_name : item?.details?.company_name.slice(0, 20) + "..."}</bdi>
												{item?.status == "pending" && <span className="comn-status-class pending-class">{item?.status}</span>}
												{item?.status == "inProgress" && <span className="comn-status-class inprogress-class">{item?.status}</span>}
												{item?.status == "inReview" && <span className="comn-status-class review-class">{item?.status}</span>}
												{item?.status == "canceled" && <span className="comn-status-class cancel-class">{item?.status}</span>}
												{item?.status == "completed" && <span className="comn-status-class complete-class">{item?.status}</span>}
												{item?.status == "Payment_Process" && <span className="comn-status-class progress-class">{item?.status}</span>}
												{item?.status == "offerClose" && <span className="comn-status-class offerclose-class">{item?.status}</span>}
											</div>
										</div>
										<div className="deal-personal-detail">
											<ul>
												<li className="d-flex">
													<span>Price : </span>
													<bdi className="ms-auto">{item?.payment && "$" + item?.payment?.toLocaleString()}</bdi>
												</li>
												<li className="d-flex">
													<span>Content Duration :</span>
													<bdi className="ms-auto">{item?.duration > 1 ? item?.duration + " days" : item?.duration + " day"}</bdi>
												</li>
												<li className="d-flex">
													<span>Deals :</span>
													<bdi className="ms-auto">{item?.NegotiableDeal ? "Negotiable" : "" || item?.NonNegotiableDeal ? "Non-Negotiable" : ""}</bdi>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="deal-personal-box-body">
									<p>{item?.DealName?.length < 30 ? item?.DealName : item?.DealName.slice(0, 20) + "..."}</p>
									<span>{item?.Description.slice(0, 60)}...</span>
									<div className="d-flex align-items-center mt-2">
										<span>Platform :</span>
										<span className="ms-auto">
											<div className="d-flex align-items-center mt-3">
												{item?.Activities?.length > 0 &&
													item?.Activities?.map((data, i) => {
														return (
															<div>
																{data?.name == "instagram" && <div className="deal-cust-soc"> <img src={require({SocOne})} alt="insta" /></div>}
																{data?.name == "facebook" && <div className="deal-cust-soc"> <img src={require({SocTwo})} alt="fb" /> </div>}
																{data?.name == "tiktok" && <div className="deal-cust-soc"> <img src={require({SocThree})} alt="tik-tok"/> </div>}
																{data?.name == "youtube" && <div className="deal-cust-soc"> <img src={require({SocFour})} alt="youtube" /> </div>}
																{data?.name == "linkedin" && <div className="deal-cust-soc"> <img src={require({SocFive})} alt="linkedin" /> </div>}
																{data?.name == "twitter" && <div className="deal-cust-soc"> <img src={require({SocSix})} alt="discord" /> </div>}
																{/* {data.name == "discord" && <div className="deal-cust-soc"> <img src={Discord} alt="discord" className="img-fluid social_Athlete" /> </div>} */}
															</div>
														);
													})}
											</div>
										</span>
									</div>
								</div>
							</div>
						</div>
					);
				})
			) : (
				<div className="div-content-center h-350">
					<h4>No Deals Found</h4>
				</div>
			)}
			{totalDeal >= limit && (
				<div className="text-center">
					<button className="comn-btn-class w-auto" disabled={loading} onClick={() => setLimit(limit + 9)}>
						{loading ? "Loading..." : "Load More"}
					</button>
				</div>
			)}
		</div>
	);
}
