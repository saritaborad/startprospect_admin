import React, { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { FetchPostApi } from "../../Api/apiServices";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import { API_Path, formatTimeSince } from "../../Api/Const";
import ShareModal from "../AllModals/ShareModal";
import ReportPostModal from "../AllModals/ReportPostModal";
import CommentModal from "../AllModals/CommentModal";
import RePostModal from "../AllModals/RePostModal";
import LikesModal from "../AllModals/LikesModal";
import roleContext from "../../contexts/roleContext";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import DefaultPro from "../../assets/images/defaultProPic.png";
import TeamUser from "../../assets/images/team-user-icon.svg";

export default function LatestTab() {
	const context = useContext(roleContext);
	const story = { className: "", centerMode: false, infinite: true, slidesToShow: 1, initialSlide: 0, speed: 1000, arrows: false, autoplay: true, autoplaySpeed: 4000 };

	const [reportpost, setReportPost] = useState(false);
	const [rePost, setRePost] = useState(false);
	const [sendPostData, setsendPostData] = useState("");
	const [allPost, setAllPost] = useState([]);
	const [topAthlete, setTopAthlete] = useState([]);
	const [comment, setComment] = useState(false);
	const [ids, setIds] = useState({});
	const [selectedPostCommentId, setselectedPostCommentId] = useState();
	const [likes, setLikes] = useState(false);
	const [ShortUrl, setShortUrl] = useState("");
	const [sharemodalShow, setShareModalShow] = useState(false);
	const [reportValue, setReportValue] = useState("");
	const [SomethingElse, SetSomethingElse] = useState("");
	const [loading, setLoading] = useState(false);
	const [user_id, setuser_id] = useState("");
	const [loader, setloader] = useState(false);
	const [flag, setFlag] = useState(true);
	const [getAllPostOption, setgetAllPostOption] = useState({ sizePerPage: 40, search: "", page: 0, sort: "time", order: "DESC" });
	const [getTopAthletesOption, setgetTopAthletesOption] = useState({ sizePerPage: 20, search: {}, page: 0, sort: "createdAt", order: "ASC" });
	const [totalPost, setTotalPost] = useState('');

	const [getSelectPostId, setGetSelectPostId] = useState('');

	useEffect(() => {
		setuser_id(context.user_id);
	}, [context.user_id]);

	useEffect(() => {
		getAllPost();
	}, []);

	useEffect(() => {
		getTopAthletes();
	}, [getTopAthletesOption.page]);

	useEffect(() => {
		window.addEventListener("scroll", onscroll);
		return () => {
			window.removeEventListener("scroll", onscroll);
		};
	}, [getAllPostOption.page, allPost]);

	const onscroll = () => {
		if ((window.scrollY + window.innerHeight >= document.body.scrollHeight) && totalPost > allPost?.length) {
			setgetAllPostOption({ ...getAllPostOption, ...getAllPostOption.page + 1 });
			// setgetAllPostOption((prevState) => ({ ...prevState, page: getAllPostOption.page + 40 }));
			getAllPost();
		}
	};

	const likePost = async (id) => {
		let result = await FetchPostApi(API_Path.postLike, { postid: id, liketype: "post_like" });
		let likePost = await result.json();
		if (result.status === 200) {
			getAllPost();
		} else {
			toast.error(likePost.message);
		}
	};

	const dislikePost = async (id, uid) => {
		let result = await FetchPostApi(API_Path.postLike, { postid: id, liketype: "post_like", p_id: uid });
		let dislikePost = await result.json();
		if (result.status === 200) {
			getAllPost();
		} else {
			toast.error(dislikePost.message);
		}
	};

	const getAllPost = async () => {
		setloader(true);
		let data = { options: getAllPostOption };
		let result = await FetchPostApi(API_Path.getAllPost, data);
		setloader(false);
		setFlag(false);
		let getPost = await result.json();
		if (result.status === 200) {
			setAllPost([...allPost, ...getPost.data.data]);
			setTotalPost(getPost.data.totalRecord)
		} else {
			toast.error(getPost.message);
		}
	};

	const getTopAthletes = async () => {
		setLoading(true);
		let result = await FetchPostApi(API_Path.topAthletes, { options: getTopAthletesOption });
		let getTopAthletes = await result.json();
		if (result.status === 200) {
			setTopAthlete(getTopAthletes?.data);
			setLoading(false);
		} else {
			toast.error(getTopAthletes.message);
			setLoading(false);
		}
	};

	const addtoFavAthletes = async (id) => {
		let result = await FetchPostApi(API_Path.addToFav, { favorite_user_id: id });
		let addToFvaTopAthletes = await result.json();
		if (result.status === 200) {
			toast.success(addToFvaTopAthletes.message);
			getTopAthletes();
		} else {
			toast.error(addToFvaTopAthletes.message);
		}
	};

	const savePost = async (id) => {
		let result = await FetchPostApi(API_Path.savePost, { save_post_id: id });
		let savepost = await result.json();
		if (result.status === 200) {
			toast.success(savepost.message);
			getAllPost();
		} else {
			toast.error(savepost.message);
		}
	};

	const allComments = (id) => {
		setComment(true);
		setselectedPostCommentId(id);
	};

	const getAllLikesModalClose = () => {
		setLikes(false);
	};
	const handleAllLike = (id) => {
		setGetSelectPostId(id)
		setLikes(true);
	}

	const handleCommentModalClose = () => {
		getAllPost();
		setComment(false);
		setIds("");
	};

	const closeReportPostModal = () => {
		setReportPost(false);
		setReportValue("");
	};

	const closeRePostModal = () => {
		setRePost(false);
		setsendPostData("");
	};

	const handleReport = async (mcId, userId, postId) => {
		setComment(false)
		setReportPost(true);
		setIds({ mainCommentId: mcId, user_Id: userId, postId: postId });
	};

	const postRepost = (postId, userId) => {
		setRePost(true);
		setsendPostData({ postId: postId, userId: userId });
	};

	const closeSharePostModal = () => {
		setShareModalShow(false);
		setShortUrl("");
	};

	const shareLink = async (id) => {
		let result = await FetchPostApi(API_Path.shareLink, { type_id: id, share_type: "post" });
		let shareLink = await result.json();
		if (result.status === 200) {
			setShortUrl(shareLink.data.shortLink);
			setShareModalShow(true);
		} else {
			toast.error(shareLink.message);
		}
	};

	const doReportPost = async () => {
		if (ids.mainCommentId) {
			let data = { type: "main_comment", main_com_id: ids.mainCommentId, report: [{ mainComReportUser: ids.user_Id, reason: reportValue, customReason: "" }] };
			if (reportValue !== "") {
				let result = await FetchPostApi(API_Path.reportSubCommet, data);
				let subcommentReport = await result.json();
				if (result.status === 200) {
					setReportPost(false);
					toast.success(subcommentReport.message);
					setReportValue("");
				} else {
					toast.error(subcommentReport.message);
				}
			} else {
				toast.error("Please select any report value");
			}
		} else {
			let data = { reason: reportValue === "Something else" ? SomethingElse : reportValue, post_id: ids.postId, user_id: ids.userId };
			if (reportValue !== "") {
				let result = await FetchPostApi(API_Path.reportPost, data);
				let report = await result.json();
				if (result.status === 200) {
					setReportPost(false);
					setIds("");
					toast.success(report.message);
				} else {
					toast.error(report.message);
				}
			} else {
				toast.error("Please select any report value");
			}
		}
	};

	const reportPostHandleChange = (pId, uId) => {
		setIds({ postId: pId, userId: uId });
		setReportPost(true);
	};

	return (
		<>
			<div className="row">
				<div className="col-md-7 mb-3">
					{loader && flag ? (
						<Loader />
					) : (
						allPost && allPost?.length > 0 && allPost?.map((post, i) => {
							return (
								<div className="latest-main-box mb-3" key={i}>
									<div className="row">
										<div className="col-12">
											<div className="latest-box-prof d-flex align-items-center">
												<img src={post.userdata.profile_img ? post.userdata.profile_img : require("../../assets/images/defaultProPic.png")} alt="" />
												<div className="ms-3 text-start">
													<span>{post.userdata.user_name}</span>
													<p>
														{(post.userdata.signupType === 1 && "business") || (post.userdata.signupType === 2 && "athletes") || (post.userdata.signupType === 3 && "coach") || (post.userdata.signupType === 4 && "parent") || (post.userdata.signupType === 5 && "fan")} Starprospect<bdi></bdi>
														{formatTimeSince(new Date(post.time))}
													</p>
												</div>
												{post.user_id != user_id && (
													<div className="ms-auto">
														<Dropdown drop="left" autoClose="outside">
															<Dropdown.Toggle className="table-dropdown-btn " id="dropdown-basic">
																<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#333333" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
																	<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
																</svg>
															</Dropdown.Toggle>
															<Dropdown.Menu>
																<Dropdown.Item onClick={() => reportPostHandleChange(post._id, post.user_id)}>
																	<span>Report Post</span>
																</Dropdown.Item>
															</Dropdown.Menu>
														</Dropdown>
													</div>
												)}
											</div>
										</div>
										<div className="col-12 comn-gray-bg latest-img text-center p-0 mt-3">
											<div>
												<Slider {...story}>
													{post.images.length > 0 &&
														post.images.map((item, i) => {
															return <div  className="d-flex justify-content-center" key={i}>{item.includes(".mp4") ? <video src={item} alt="error" className="img-fluid" controls /> : <img src={item} alt="error" className="img-fluid" />}</div>;
														})}
												</Slider>
											</div>
										</div>
										<div className="col-12 mt-3">
											<div className="latest-box-rght-txt h-100">
												<div className="latest-box-body">
													{post?.tag_user?.length > 0 && (
														<p>
															By <span>@{post.tag_user?.map((tag) => tag).join(", @")}</span>
														</p>
													)}
													<p className="latest-box-fix-content">{post.description}</p>
													{post.link && (
														<Link target="_blank" rel="noreferrer" href={post.link}>
															<span>apnews.com</span>
														</Link>
													)}
												</div>
												<div className="my-3 latest-box-ftr d-flex align-items-center">
													{post?.is_like === true ? (
														<span className="d-flex align-items-center">
															<svg width="16" height="16" className="me-2" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => dislikePost(post._id, post?.like_data?.user_like_data?._id)}>
																<path d="M0.255859 7.28189C0.255556 5.5423 0.966817 3.87563 2.22962 2.65689C3.49241 1.43814 5.20069 0.769679 6.97009 0.801894C9.06654 0.79095 11.067 1.6649 12.4635 3.20189C13.8601 1.6649 15.8606 0.79095 17.957 0.801894C19.7264 0.769679 21.4347 1.43814 22.6975 2.65689C23.9603 3.87563 24.6715 5.5423 24.6712 7.28189C24.6712 13.7091 16.884 18.5619 12.4635 22.4019C8.05291 18.5295 0.255859 13.7139 0.255859 7.28189Z" fill="#ED3628" />
															</svg>
														</span>
													) : (
														<span className="d-flex align-items-center">
															<svg xmlns="http://www.w3.org/2000/svg" className="me-2 bi bi-heart" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={() => likePost(post._id)}>
																<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
															</svg>
														</span>
													)}
													<bdi onClick={() => post.post_likeCount > 0 && handleAllLike(post._id)}>{post.post_likeCount}</bdi>

													<button type="button" className="eye-doc ms-4 border-0 p-0 bg-transparent">
														<span onClick={() => allComments(post._id)}>
															{post.comment_count + " "}
															Comments
														</span>
													</button>
													<div className="ms-auto">
														{post.user_id != user_id && (
															<button type="button" className="eye-doc border-0 p-0 bg-transparent">
																<svg width="16" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => postRepost(post?._id, post?.user_id)}>
																	<path d="M4 5H14V8L18 4L14 0V3H2V9H4V5ZM14 15H4V12L0 16L4 20V17H16V11H14V15Z" fill="#7B838A" />
																</svg>
															</button>
														)}
														<span className="mx-2 bookmark">
															{post.is_savepost === false && (
																<button type="button" className="eye-doc border-0 p-0 bg-transparent">
																	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16" onClick={() => savePost(post._id)}>
																		<path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
																	</svg>
																</button>
															)}
															{post.is_savepost && (
																<button type="button" className="eye-doc border-0 p-0 bg-transparent">
																	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16" onClick={() => savePost(post._id)}>
																		<path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
																	</svg>
																</button>
															)}
														</span>
														<span>
															<button type="button" className="eye-doc border-0 p-0 bg-transparent">
																<svg width="16" height="16" viewBox="0 0 20 21" fill="none" onClick={() => shareLink(post._id)} xmlns="http://www.w3.org/2000/svg">
																	<path d="M15.5 20.9991C14.4179 21.0116 13.3923 20.5172 12.7282 19.6628C12.0641 18.8085 11.8379 17.6926 12.117 16.6471L5.85697 13.0691C4.77525 14.0601 3.18965 14.2699 1.88746 13.5942C0.585261 12.9185 -0.156157 11.5013 0.0313367 10.0463C0.21883 8.59128 1.2953 7.40834 2.72625 7.08485C4.15719 6.76136 5.63783 7.36622 6.43297 8.59911L12.116 5.3501C12.0424 5.07229 12.0035 4.78646 12 4.4991C11.9856 2.82582 13.1478 1.37225 14.7832 1.01793C16.4186 0.663607 18.0781 1.50585 18.7576 3.03502C19.4371 4.56419 18.95 6.36033 17.5909 7.33661C16.2319 8.31289 14.3742 8.20119 13.142 7.06911L6.99097 10.5841C6.98488 10.8434 6.94863 11.1012 6.88297 11.3521L13.142 14.9291C14.2942 13.8717 16.0087 13.7084 17.3399 14.5294C18.671 15.3504 19.2946 16.9558 18.8668 18.4601C18.439 19.9644 17.0639 21.0014 15.5 20.9991ZM15.5 15.9991C14.6715 15.9991 14 16.6707 14 17.4991C14 18.3275 14.6715 18.9991 15.5 18.9991C16.3284 18.9991 17 18.3275 17 17.4991C17 16.6707 16.3284 15.9991 15.5 15.9991ZM3.49997 8.99911C2.67154 8.99911 1.99997 9.67068 1.99997 10.4991C1.99997 11.3275 2.67154 11.9991 3.49997 11.9991C4.3284 11.9991 4.99997 11.3275 4.99997 10.4991C4.99997 9.67068 4.3284 8.99911 3.49997 8.99911ZM15.5 2.9991C14.6715 2.9991 14 3.67068 14 4.4991C14 5.32753 14.6715 5.9991 15.5 5.9991C16.3284 5.9991 17 5.32753 17 4.4991C17 3.67068 16.3284 2.9991 15.5 2.9991Z" fill="#7B838A" />
																</svg>
															</button>
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>
				<div className="col-md-5">
					<div className="top-athlete-box">
						<div className="mb-3">
							<mark>Top Athletes</mark>
						</div>
						<div>
							<ul>
								{topAthlete?.data?.length > 0 &&
									topAthlete?.data?.map((item) => {
										return (
											<li key={item._id}>
												<div className="latest-box-prof d-xl-flex align-items-center">
													<img src={item.user?.profile_img ? item.user.profile_img : require("../../assets/images/defaultProPic.png")} alt="" />
													<div className="ms-xl-3 ms-md-0 ms-sm-3">
														<span>{item.user?.user_name}</span>
														<p className="d-flex align-items-center team-user-icon">
															<span>
																<img src={TeamUser} alt="" className=" me-2" />
															</span>
															Basketball-Golden State Warrious
														</p>
													</div>
													<div className="ms-xl-auto ms-auto mt-xl-0 mt-md-2 mt-sm-0 mt-2">
														<button className="comn-fav-btn active" data="Favorite" onClick={() => addtoFavAthletes(item.user?._id)}>
															<svg width="16" height="16" viewBox="0 0 20 18" fill="none" className={`me-2 ${item.favorite ? "active-1" : ""}`} xmlns="http://www.w3.org/2000/svg">
																<path d="M2.31802 2.31802C0.56066 4.07538 0.56066 6.92462 2.31802 8.68198L10.0001 16.364L17.682 8.68198C19.4393 6.92462 19.4393 4.07538 17.682 2.31802C15.9246 0.56066 13.0754 0.56066 11.318 2.31802L10.0001 3.63609L8.68198 2.31802C6.92462 0.56066 4.07538 0.56066 2.31802 2.31802Z" stroke="url(#paint0_linear_5234_6596)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
																<defs>
																	<linearGradient id="paint0_linear_5234_6596" x1="1.72656" y1="4.2368" x2="21.0586" y2="8.30841" gradientUnits="userSpaceOnUse">
																		<stop stopColor="#6A58FB" />
																		<stop offset="1" stopColor="#4599F4" />
																	</linearGradient>
																</defs>
															</svg>
														</button>
													</div>
												</div>
											</li>
										);
									})}
								{topAthlete?.totalRecord > getTopAthletesOption.sizePerPage && (
									<div className="text-center">
										<button className="comn-btn-class w-auto" onClick={() => setgetTopAthletesOption((prevState) => ({ ...prevState, sizePerPage: getTopAthletesOption.sizePerPage + 20 }))}>
											{loading ? "Loading..." : "Load More"}
										</button>
									</div>
								)}
							</ul>
						</div>
					</div>
					<div className="latest-upcoming-box mt-3">
						<div className="mb-3">
							<mark>Upcomings</mark>
						</div>
						<ul>
							<li className="d-flex align-items-center">
								<div className="nat-league-name">
									<span>UL</span>
								</div>
								<div className="game-league">
									<p className="d-flex align-items-center team-user-icon mb-0">
										<span>
											<img src={TeamUser} alt="" className=" me-2" />
										</span>
										Manchester United F.C.
									</p>
									<p className="d-flex align-items-center team-user-icon mb-0">
										<span>
											<img src={TeamUser} alt="" className=" me-2" />
										</span>
										Liverpool F.C.
									</p>
								</div>
								<div className="leag-medal">
									<bdi>Sat, 25 Aug</bdi>
									<bdi>7:30 am</bdi>
								</div>
							</li>
							<li className="d-flex align-items-center mt-3">
								<div className="nat-league-name">
									<span>NFL</span>
								</div>
								<div className="game-league">
									<p className="d-flex align-items-center team-user-icon mb-0">
										<span>
											<img src={TeamUser} alt="" className=" me-2" />
										</span>
										Basketball-Golden State Warrious
									</p>
									<p className="d-flex align-items-center team-user-icon mb-0">
										<span>
											<img src={TeamUser} alt="" className=" me-2" />
										</span>
										Liverpool F.C.
									</p>
								</div>
								<div className="leag-medal">
									<bdi>Sat, 25 Aug</bdi>
									<bdi>7:30 am</bdi>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			{/* ===============  Likes ============= */}
			{loader ? (
				<Loader />
			) : (
				likes && (
					<Modal backdrop="static" show={likes} onHide={getAllLikesModalClose} size="md" className="report-post-modal" aria-labelledby="contained-modal-title-vcenter" centered>
						<Modal.Header closeButton className="mt-2">
							<div className="report-post-hdr">
								<p>Likes</p>
							</div>
						</Modal.Header>
						<Modal.Body>
							<LikesModal getSelectPostId={getSelectPostId} />
						</Modal.Body>
					</Modal>
				)
			)}
			{/* ===============  Comments ============= */}
			{loader ? (
				<Loader />
			) : (
				comment && (
					<Modal show={comment} backdrop="static" onHide={() => handleCommentModalClose()} size="md" className="report-post-modal" aria-labelledby="contained-modal-title-vcenter" centered>
						<Modal.Header closeButton className="mt-2">
							<div className="report-post-hdr">
								<p>Comment</p>
							</div>
						</Modal.Header>
						<Modal.Body>
							<CommentModal selectedPostCommentId={selectedPostCommentId} handleReport={handleReport} />
						</Modal.Body>
					</Modal>
				)
			)}
			{/* ===============  Report Post DropDown ============= */}
			{reportpost && (
				<Modal backdrop="static" show={reportpost} onHide={() => closeReportPostModal()} size="md" className="report-post-modal" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="mt-2">
						<div className="report-post-hdr">
							<p>Report Post</p>
						</div>
					</Modal.Header>
					<Modal.Body>
						<ReportPostModal doReportPost={doReportPost} reportValue={reportValue} setReportValue={setReportValue} SetSomethingElse={SetSomethingElse} />
					</Modal.Body>
				</Modal>
			)}
			{/* =============== Share Modal ============== */}
			{sharemodalShow && (
				<Modal backdrop="static" show={sharemodalShow} onHide={() => closeSharePostModal()} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="border-bottom">
						<div className="text-center modal-data">
							<span>Share</span>
						</div>
					</Modal.Header>
					<Modal.Body className="like-modal-body share-data-modal">
						<ShareModal ShortUrl={ShortUrl} closeSharePostModal={closeSharePostModal} />
					</Modal.Body>
				</Modal>
			)}
			{/* =============== RePost Modal ============== */}
			{rePost && (
				<Modal backdrop="static" show={rePost} onHide={() => closeRePostModal()} size="lg" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="border-bottom">
						<div className="text-center modal-data">
							<span>Repost</span>
						</div>
					</Modal.Header>
					<Modal.Body>
						<RePostModal sendPostData={sendPostData} allPost={allPost} setRePost={setRePost} />
					</Modal.Body>
				</Modal>
			)}
		</>
	);
}
