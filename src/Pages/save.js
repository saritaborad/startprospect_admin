import React, { useEffect, useState } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import { FetchPostApi } from "../Api/apiServices.js";
import { API_Path } from "../Api/Const.js";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Slider from "react-slick";
import Loader from "../Components/Loader/Loader.js";
import NewsFeedModal from "../Components/AllModals/NewsFeedModal";

export default function Save() {


	const [loading, setLoading] = useState(false);
	const [loaderSet, setloaderSet] = useState(true);
	const [newsfeed, setNewsfeed] = useState(false);
	const [savepost, setSavepost] = useState([]);
	const [getSavePostOption, setGetSavePostOption] = useState({ sizePerPage: 8, search: {}, page: 0, sort: "createdAt", order: "ASC" });
	const [selectedPostId, setselectedPostId] = useState('');
	
	const story = {
		className: "",
		centerMode: false,
		infinite: false,
		slidesToShow: 1,
		initialSlide: 0,
		speed: 1000,
		arrows: true,
	};

	useEffect(() => {
		getsavePost();
	}, [getSavePostOption?.sizePerPage]);


	const getsavePost = async () => {
		setLoading(true)
		let result = await FetchPostApi(API_Path.getAllSavePost, { options: getSavePostOption });
		let getAllsavePost = await result.json();
		if (result.status === 200) {
			setSavepost(getAllsavePost?.data);
			setloaderSet(false);
			setLoading(false)
		} else {
			toast.error(getAllsavePost.message);
			setloaderSet(false);
			setLoading(false)
		}
	};
	const handleCallNewsModel = (id) => {
		setNewsfeed(true);
		setselectedPostId(id)
	}

	// const deleteComment = async (postId, commentId) => {
	//     let data = {
	//         post_id: postId,
	//         comment_id: commentId,
	//     };
	//     let result = await FetchPostApi(API_Path.deleteMainComment, data);
	//     let deleteMaincommet = await result.json();
	//     if (result.status === 200) {
	//         toast.success(deleteMaincommet.message);
	//         setGetcomment(deleteMaincommet);
	//     } else {
	//         toast.error(deleteMaincommet.message);
	//     }
	// };


	return (
		<MainLayout>
			{loaderSet ? (
				<Loader />
			) : (
				<section className="gray-bg-section position-relative">
					<div className="container position-relative">
						<div className="row">
							<div className="col-12 my-3">
								<div className="tabs-heading-txt">
									<h5>Saved</h5>
								</div>
							</div>
						</div>
						<div className="row">
							{savepost?.data?.length > 0 &&
								savepost?.data?.map((item, i) => {
									return (
										<div className="col-xl-3 col-md-4 col-sm-6 mb-4" key={i}>
											<div className="save-player-box" onClick={() => handleCallNewsModel(item?.save_post?._id)}>
												<div className="img-div-main position-relative">
													<Slider {...story}>
														{item?.save_post?.images?.length > 0 &&
															item?.save_post?.images?.map((item, i) => {
																return <div key={i}>{item.includes(".mp4") ? <video src={item} alt="error" className="img-fluid" controls /> : <img src={item ? item : require("../assets/images/defaultProPic.png")} alt="error" className="img-fluid" />}</div>
															})}
													</Slider>
													<div className="">
														<div className="save-box-body">
															<p>
																By <span>{item.save_post?.user_name}</span>
															</p>
															<p className="mt-auto">March Madness | 2022 NCAA Tournam</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})}
								<div className="col-md-12 text-center my-3">
                                {savepost?.data && savepost?.data?.length > 0 && savepost?.totalRecord > getSavePostOption.sizePerPage &&
                                    <button className="pagination-button" type='button' onClick={() => setGetSavePostOption({ ...getSavePostOption, sizePerPage: getSavePostOption.sizePerPage + 8 })} >{loading ? "Loading..." : "Load More"}</button>}
                            </div>
						</div>
					</div>
				</section>
			)}
			{/* ================ Modal ==================== */}
			{newsfeed && (
				<Modal show={newsfeed} backdrop="static" onHide={()=>setNewsfeed(false)} size="xl" className="save-player-modal m-0 p-0" aria-labelledby="contained-modal-title-vcenter" centered>
					<Modal.Header closeButton className="border-0"></Modal.Header>
					<Modal.Body>
						<NewsFeedModal selectedPostId={selectedPostId} />
					</Modal.Body>
				</Modal>
			)}
		</MainLayout>
	);
}
