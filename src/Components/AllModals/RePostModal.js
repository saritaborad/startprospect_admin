import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { FetchPostApi } from "../../Api/apiServices";
import { API_Path, formatTimeSince } from "../../Api/Const";
import Select from "react-select";
import roleContext from "../../contexts/roleContext";
import Slider from "react-slick";
import DefaultPro from "../../assets/images/defaultProPic.png";

export default function Repost(props) {
	const context = useContext(roleContext);
	const [tag, settag] = useState([]);
	const [postDescription, setpostDescription] = useState("");
	const [user_id, setuser_id] = useState("");
	const [rePostDetails, setRePostDetails] = useState();
	const [allUser, setallUser] = useState([]);

	const Postid = props.sendPostData?.postId;
	const story = { className: "", centerMode: false, infinite: true, slidesToShow: 1, initialSlide: 0, speed: 1000, arrows: false, dots: false, autoplay: true, autoplaySpeed: 4000 };

	useEffect(() => {
		setuser_id(context?.user_id);
	}, [context.user_id]);

	useEffect(() => {
		getAllUser();
	}, []);

	useEffect(() => {
		getPostById(Postid);
	}, []);

	const handleChange = (selected) => {
		let arry = selected.map((item) => {
			return item.value;
		});
		settag(arry);
	};
	const getAllUser = async () => {
		let result = await FetchPostApi(API_Path.getAllUser, { search: "" });
		let getUser = await result.json();
		if (result.status === 200) {
			let a = [];
			a = getUser?.data?.map((item) => {
				return { value: item._id, label: item.name };
			});
			setallUser(a);
		} else {
			toast.error(getUser.message);
		}
	};

	const getPostById = async () => {
		let result = await FetchPostApi(API_Path.getPost, { postId: Postid });
		let getUserDetails = await result.json();
		if (result.status === 200) {
			setRePostDetails(getUserDetails?.data);
		} else {
			toast.error(getUserDetails.message);
		}
	};

	const handleRePost = async (pid) => {
		let data = { post_id: pid, user_id: user_id, tag_id: tag, description: postDescription };
		let result = await FetchPostApi(API_Path.createRePost, data);
		let sendPost = await result.json();
		if (result.status === 200) {
			toast.success(sendPost.message);
			props.setRePost(false);
			// props.getAllPost()
		} else {
			toast.error(sendPost.message);
		}
	};
	// const postData = props.allPost.length > 0 && props.allPost?.filter((item) => { return item._id == Postid; });
	return (
		<div className="row">
			<div className="col-12">
				<div className="edit-profile-main">
					<div className="hder-profile">
						<img src={context?.profiledata?.profile_img ? context?.profiledata?.profile_img : require( DefaultPro )} alt="Profile Picture" className="position-relative me-3" />
						<span>
							<b>{context?.profiledata?.name}</b>
						</span>
					</div>
					<div className="left-dotted-line">
						<div className="row m-0">
							<div className="col-lg-6 ms-3 mt-2">
								<div className="latest-main-box p-0">
									<div className="latest-box-prof repost-box-prof d-flex p-3 align-items-center">
										<img src={rePostDetails?.user_id?.profile_img} alt="profile" />
										<div className="ms-3 text-start">
											<span>{rePostDetails?.user_id?.name}</span>
											<p>
												@{rePostDetails?.user_id?.user_name} <bdi></bdi>
												{formatTimeSince(new Date(rePostDetails?.time))}
											</p>
										</div>
									</div>
									<div className="comn-gray-bg text-center">
										<div className="comn-gray-bg repost-box-left-img text-center">
											<Slider {...story}>
												{rePostDetails?.images.length > 0 &&
													rePostDetails?.images.map((item, i) => {
														return item.includes(".mp4") ? <video src={item} alt="error" className="img-fluid" controls /> : <img src={item} alt="error" className="img-fluid" />;
													})}
											</Slider>
										</div>
									</div>
									<div className="p-3">
										<div className="latest-box-rght-txt repost-box">
											<div className="latest-box-body">
												<p>
													By <span>@{rePostDetails?.user_id?.user_name}</span>
												</p>
												<p>March Madness | 2022 NCAA Tournament</p>
												<p className="latest-box-fix-content">{rePostDetails?.description}</p>
												<span>apnews.com</span>
											</div>
											<div className="mt-3 d-flex latest-box-ftr mx-0">
												<svg width="18" height="18" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M0.255859 7.28189C0.255556 5.5423 0.966817 3.87563 2.22962 2.65689C3.49241 1.43814 5.20069 0.769679 6.97009 0.801894C9.06654 0.79095 11.067 1.6649 12.4635 3.20189C13.8601 1.6649 15.8606 0.79095 17.957 0.801894C19.7264 0.769679 21.4347 1.43814 22.6975 2.65689C23.9603 3.87563 24.6715 5.5423 24.6712 7.28189C24.6712 13.7091 16.884 18.5619 12.4635 22.4019C8.05291 18.5295 0.255859 13.7139 0.255859 7.28189Z" fill="#ED3628" />
												</svg>
												<bdi className="ms-2">{rePostDetails?.likes[0]?.postCount}</bdi>
												<span className="ms-4">{rePostDetails?.comment_count > 0 ? rePostDetails?.comment_count + " Comments" : "No Comment"}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="make-a-deal-top-title mb-3 mt-4">
						<label className="activity-innr-lable">Tag People</label>
						<Select isMulti options={allUser} onChange={handleChange} />
					</div>
					<div className="make-a-deal-top-title">
						<label className="activity-innr-lable">Description</label>
					</div>
					<div className="">
						<textarea className=" ps-3 comn-input-style  form-control h-auto" rows={5} placeholder="Type.." value={postDescription} onChange={(e) => setpostDescription(e.target.value)}></textarea>
					</div>
					<div className="row">
						<div className="col-sm-3 mt-3">
							<button type="button" className="comn-btn-class w-100" onClick={() => handleRePost(rePostDetails?._id)}>
								POST
							</button>
						</div>
						<div className="col-sm-3 mt-3">
							<button type="button" className="comn-declined-btn w-100" onClick={() => props.setRePost(false)}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
