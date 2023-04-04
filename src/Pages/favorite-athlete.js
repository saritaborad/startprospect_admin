import React, { useEffect, useState } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import { FetchPostApi } from "../Api/apiServices";
import { API_Path } from "../Api/Const";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader.js";
import DefaultPro from "../assets/images/defaultProPic.png";

export default function FavoriteAthlete() {
	const navigate = useNavigate();

	const [timer, setTimer] = useState(null);
	const [flag, setFlag] = useState(true);
	const [loading, setLoading] = useState(false);
	const [total, setTotal] = useState();
	const [favoriteAthlete, setfavoriteAthlete] = useState([]);
	const [option, setOption] = useState({ sizePerPage: 6, search: { name: '' }, page: 0, sort: "name", order: "DESC" });

	useEffect(() => {
		getFavoriteAthelete(option);
	}, [option.page]);

	const getFavoriteAthelete = async (option) => {
		setLoading(true);
		let result = await FetchPostApi(API_Path.getAllFavoriteAthlete, { options: option });
		let getAthlete = await result.json();
		if (result.status === 200) {
			setfavoriteAthlete([...favoriteAthlete, ...getAthlete.data.data]);
			setTotal(getAthlete.data.totalRecord);
			setLoading(false);
			setFlag(false);
		} else {
			toast.error(getAthlete.message);
		}
	};

	const handleFavorite = async (id) => {
		let result = await FetchPostApi(API_Path.addToFav, { favorite_user_id: id });
		let getAthlete = await result.json();
		if (result.status === 200) {
			getFavoriteAthelete(option);
			toast.success(getAthlete.message);
		} else {
			toast.error(getAthlete.message);
		}
	};

	const inputChanged = async (e) => {
		setOption({ ...option, search: { name: e.target.value } })
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			getFavoriteAthelete({ ...option, search: { name: e.target.value } });
		}, 1000);
		setTimer(newTimer);
	};

	return (
		<>
			<MainLayout>
				{flag && loading ? (
					<Loader />
				) : (
					<section className="gray-bg-section">
						<div className="container position-relative">
							<div className="row">
								<div className="col-12 my-3">
									<div className="tabs-heading-txt">
										<h5>Favorite Athlete</h5>
									</div>
								</div>
								<div className="col-sm-6 mb-3 mt-2">
									<div className="position-relative">
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
											<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
										</svg>
										<input type="search" className="form-control login-comn-input searchbar ps-5" placeholder="Search" value={option.search.name} onChange={(e) => inputChanged(e)} />
									</div>
								</div>
							</div>
							<div className="row">
								{favoriteAthlete.length > 0 ? (
									favoriteAthlete.map((item, i) => {
										return (
											<div className="col-lg-4 col-sm-6 mb-4" key={i}>
												<div className="customer-page-box">
													<div className="img-div-main position-relative">
														<div className="feature-plan-img">
															<img src={item.cover_img ? item.cover_img : require( DefaultPro)} className="img-fluid w-100" alt="customers" />
														</div>
													</div>
													<div className="customer-page-box-body">
														<div className="player-detail mb-2">
															<div className="athlete-profile pointer" onClick={() => navigate("/market-detail", { state: { athletesId: item._id, favAthlete: "favorite Athlete" } })}>
																<img src={item.profile_img ? item.profile_img : require( DefaultPro)} alt="profile" />
															</div>
															<div className="athelete-name-txt">
																<label className="d-block">{item.name}</label>
																<p className="mb-0">{item.team_name ? item.sports[0] + "-" + item.team_name : <p> </p>}</p>
															</div>
															<div className="mt-2">
																<span className="d-block">
																	Sports : {item.sports > 1 ? <b>{item.sports.slice(0, 4).join(" | ")}</b> : <b>{item.sports[0]}</b>}
																</span>
															</div>
															<div>
																<button className="comn-unfav-btn w-100 mt-3" onClick={() => handleFavorite(item._id)}>
																	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart me-2" viewBox="0 0 16 16">
																		<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
																	</svg>
																	Unfavorite
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										);
									})
								) : (
									<div className="div-content-center h-350">
										<h4>No Favorite Athletes Found</h4>
									</div>
								)}
								{total > favoriteAthlete.length && (
									<div className="text-center">
										<button className="comn-btn-class w-auto" disabled={loading} onClick={() => setOption({ ...option, page: option.page + 1 })}>
											{loading ? "Loading..." : "Load More"}
										</button>
									</div>
								)}
							</div>
							<div className="col-md-12 text-center my-3"></div>
						</div>
					</section>
				)}
			</MainLayout>
		</>
	);
}
