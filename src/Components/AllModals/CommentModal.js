import React, { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { API_Path, formatDate } from "../../Api/Const";
import roleContext from "../../contexts/roleContext";
import Send from "../../assets/images/send.svg";
import { toast } from "react-toastify";
import { FetchPostApi } from "../../Api/apiServices";
import { useRef } from "react";
import Loader from "../Loader/Loader";

export default function CommentModal(props) {
	const context = useContext(roleContext);
	const [loading, setloading] = useState(false);
	const [commentReply, setCommetReply] = useState(false);
	const [flag, setflag] = useState(true);
	const commentReplyRef = useRef();
	const commentMainRef = useRef();
	const [cID, setcID] = useState();
	const [allComment, setAllComment] = useState([]);
	const [user_id, setuser_id] = useState("");
	const [commentId, setCommetId] = useState("");
	const [allCommentOption, setAllCommentOption] = useState({ sizePerPage: 8, search: {}, page: 0, sort: "date", order: "ASC" });
	const [total, setTotal] = useState('');

	useEffect(() => {
		setuser_id(context.user_id);
	}, [context.user_id]);

	useEffect(() => {
		setcID(props.selectedPostCommentId)
	}, [props.selectedPostCommentId]);

	useEffect(() => {
		cID && getAllcomments()
	}, [cID, allCommentOption.page]);

	const getAllcomments = async () => {
		setloading(true)
		let result = await FetchPostApi(API_Path.getComment, { post_id: cID, options: allCommentOption });
		let getAllComments = await result.json();
		if (result.status === 200) {
			setAllComment([...allComment, ...getAllComments?.data?.data]);
			setTotal(getAllComments?.data?.totalRecord)
			setloading(false)
			setflag(false)
		} else {
			toast.error(getAllComments.message);
			setloading(false)
			setflag(false)
		}
	};


	const handleMainCommentSend = async () => {
		let data = { post_id: cID, description: commentMainRef.current.value };
		let result = await FetchPostApi(API_Path.addMaincomment, data);
		if (result.status === 200) {
			commentMainRef.current.value = "";
			getAllcomments();
		}
	};

	const handleSubCommentSend = async (id, uid) => {
		let data = { main_com_id: id, sub_com: [{ user_id: uid, description: commentReplyRef.current.value }] };
		let result = await FetchPostApi(API_Path.addSubcomment, data);
		let addSubComment = await result.json();
		if (result.status === 200) {
			toast.success(addSubComment.message);
			setCommetReply(false);
			getAllcomments();
			commentReplyRef.current.value = "";
		}
	};

	const deleteSubComment = async (comId, subId) => {
		let result = await FetchPostApi(API_Path.deleteSubComment, { post_id: cID, comment_id: comId, subcomment_id: subId });
		let deleteSubcomment = await result.json();
		if (result.status === 200) {
			getAllcomments();
		} else {
			toast.error(deleteSubcomment.message);
		}
	};

	const deleteMainComment = async (mainCommentId) => {
		let result = await FetchPostApi(API_Path.deleteMainComment, { post_id: cID, comment_id: mainCommentId });
		let deleteMainComment = await result.json();
		if (result.status === 200) {
			getAllcomments();
		} else {
			toast.error(deleteMainComment.message);
		}
	};

	const handleMainCommentLike = async (postid, commentid, commentlikeid) => {
		let data = { postid: postid, liketype: "comment_like", comment_id: commentid };
		commentlikeid !== undefined && (data.c_id = commentlikeid);
		let result = await FetchPostApi(API_Path.postLike, data);
		let likedData = await result.json();
		if (result.status === 200) {
			getAllcomments();
		} else {
			toast.error(likedData.message);
		}
	}

	const handleKeyDownSubCommentEnter = (e, itemid, userid, itempostid) => {
		if (e.key === "Enter") {
			handleSubCommentSend(itemid, userid, itempostid);
		}
	};
	const handleKeyDownMainComment = (e) => {
		if (e.key === "Enter") {
			handleMainCommentSend();
		}
	};

	const handleCommentReply = (id) => {
		setCommetReply(!commentReply);
		setCommetId(id);
	};

	return (
		<div className="row">
			{flag ? (<div className="loading-modal">
				<div className="loader"></div>
			</div>) : (
				<><div className="col-12">
					<div className="like-modal-body comment-modal">
						<ul>
							{allComment && allComment?.length > 0 ?
								allComment?.map((item, index) => {
									return (
										<li key={index}>
											<div className="d-flex align-items-center commet-txt">
												<div>
													<img src={item?.userdata?.profile_img !== undefined ? item?.userdata?.profile_img : require("../../assets/images/defaultProPic.png")} alt="profile" />
												</div>
												<div className="w-100">
													<div className="ms-3 d-flex align-items-center mb-1">
														<p className="mb-0">
															<span>{item?.userdata?.user_name}</span> {item.description}
														</p>
														<div className="ms-3 ms-auto">
															<Dropdown drop="bottom">
																<Dropdown.Toggle className="table-dropdown-btn" id="dropdown-basic">
																	<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#333333" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
																		<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
																	</svg>
																</Dropdown.Toggle>
																<Dropdown.Menu>
																	{user_id !== item.user_id && (
																		<Dropdown.Item onClick={() => props.handleReport(item?._id, item?.user_id, item?.post_id)}>
																			<span>Report</span>
																		</Dropdown.Item>
																	)}
																	{user_id === item.user_id && (
																		<Dropdown.Item onClick={() => deleteMainComment(item?._id)}>
																			<span>delete</span>
																		</Dropdown.Item>
																	)}
																</Dropdown.Menu>
															</Dropdown>
														</div>
													</div>
													<div className="d-sm-flex align-items-center ms-3">
														<div className="me-4 d-flex align-items-center my-1 my-sm-0">
															{/* {item._id !==
																item.likedata?.filter((elem) => {
																	return elem?._id == item._id;
																})[0]?._id && (
																	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16" onClick={() => handleMainCommentLike(item.post_id, item._id)}>
																		<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
																	</svg>
																)}
															{item._id === item?.likedata?.find((elem) => elem?._id === item?._id)?.data?.[0]?.comment_like?._id && (
																<svg width="16" height="16" className="me-2" viewBox="0 0 25 23" fill="#ED3628" xmlns="http://www.w3.org/2000/svg" onClick={() => handleMainCommentLike(item.post_id, item._id, item.likedata?.find((elem) => elem?._id === item?._id)?.data?.[0]?.comment_like?._id)}>
																	<path d="M0.255859 7.28189C0.255556 5.5423 0.966817 3.87563 2.22962 2.65689C3.49241 1.43814 5.20069 0.769679 6.97009 0.801894C9.06654 0.79095 11.067 1.6649 12.4635 3.20189C13.8601 1.6649 15.8606 0.79095 17.957 0.801894C19.7264 0.769679 21.4347 1.43814 22.6975 2.65689C23.9603 3.87563 24.6715 5.5423 24.6712 7.28189C24.6712 13.7091 16.884 18.5619 12.4635 22.4019C8.05291 18.5295 0.255859 13.7139 0.255859 7.28189Z" />
																</svg>
															)} */}
															{(item?.likedata?.length === 0) || (item?.likedata[item?.likedata.findIndex(i => i._id === item?._id)]?.data[0]?.comment_like?.userid !== user_id) ? (
																<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16" onClick={() => handleMainCommentLike(item.post_id, item._id)}>
																	<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
																</svg>
															) : (
																<svg width="16" height="16" className="me-2" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg"
																	onClick={() => handleMainCommentLike(item.post_id, item._id, item?.likedata[item?.likedata.findIndex(i => i._id === item?._id)]?.data[0]?.comment_like?._id)}>
																	<path d="M0.255859 7.28189C0.255556 5.5423 0.966817 3.87563 2.22962 2.65689C3.49241 1.43814 5.20069 0.769679 6.97009 0.801894C9.06654 0.79095 11.067 1.6649 12.4635 3.20189C13.8601 1.6649 15.8606 0.79095 17.957 0.801894C19.7264 0.769679 21.4347 1.43814 22.6975 2.65689C23.9603 3.87563 24.6715 5.5423 24.6712 7.28189C24.6712 13.7091 16.884 18.5619 12.4635 22.4019C8.05291 18.5295 0.255859 13.7139 0.255859 7.28189Z" fill="#ED3628" />
																</svg>
															)}


															<bdi>{item?.likedata?.length > 0 ? item?.likedata[0]?.count : 0}</bdi>
															{/* <bdi>{ item?.likedata[item?.likedata?.findIndex((i) => i._id === item._id)]?.count}</bdi> */}
															<div className="ms-4">
																<p className="mb-0">
																	<span onClick={() => handleCommentReply(item._id)}>Reply</span>
																	<bdi className="ms-2">{item.sub_com ? item.sub_com.length : 0}</bdi>
																</p>
															</div>
														</div>
														<div className="ms-sm-auto">
															<p className="mb-0 report-date">
																<mark>{item.report ? item.report.length : 0} Reported</mark>
																<span>{formatDate(new Date(item.date))}</span>
															</p>
														</div>
													</div>
													<div className="ms-3 mt-2">
														{commentReply && item._id === commentId ? <input type="text" className="form-control" onKeyDown={(e) => handleKeyDownSubCommentEnter(e, item._id, user_id, item.post_id)} ref={commentReplyRef} /> : ""}
														{commentReply && item._id === commentId && (
															<button type="submit" className="comn-btn-class w-auto mt-3 text-end" onClick={() => handleSubCommentSend(item._id, user_id, item.post_id)}>
																send
															</button>
														)}
													</div>
												</div>
											</div>
											{item.sub_com.length > 0 &&
												item.sub_com.map((subComment) => {
													return (
														<div className="d-flex align-items-center sub-commet-txt" key={subComment._id}>
															<div>
																<img src={subComment?.userData?.profile_img !== undefined ? subComment?.userData?.profile_img : require("../../assets/images/defaultProPic.png")} alt="profile" />
															</div>
															<div className="w-100">
																<div className="ms-3 d-flex align-items-center mb-1">
																	<p className="mb-0">
																		<span>{subComment?.userData?.user_name + " "}</span>
																		{subComment.description}
																	</p>
																	<div className="ms-3 ms-auto">
																		{user_id === subComment?.user_id && (
																			<Dropdown drop="bottom">
																				<Dropdown.Toggle className="table-dropdown-btn" id="dropdown-basic">
																					<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#333333" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
																						<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
																					</svg>
																				</Dropdown.Toggle>
																				<Dropdown.Menu>
																					<Dropdown.Item onClick={() => deleteSubComment(item?._id, subComment?._id)}>
																						<span>delete</span>
																					</Dropdown.Item>
																				</Dropdown.Menu>
																			</Dropdown>
																		)}
																	</div>
																</div>
																<div className="d-sm-flex align-items-center ms-3">
																	<div className="me-4 d-flex align-items-center my-1 my-sm-0">
																		<bdi>{item?.sublikedata?.length}</bdi>
																	</div>
																	<div className="ms-sm-auto">
																		<p className="mb-0 report-date">
																			<span>{formatDate(new Date(subComment?.date))}</span>
																		</p>
																	</div>
																</div>
															</div>
														</div>
													);
												})}
										</li>
									);
								}) : <div className="text-center">
									"Comments are not available on this post"
								</div>}
							<div className="col-md-12 text-center my-3">
								{allComment && allComment?.length > 0 && total > allComment?.length > 0 &&
									<button className="pagination-button load-more-btn-cust py-1 px-2" type='button' onClick={() => setAllCommentOption({ ...allCommentOption, page: allCommentOption.page + 1 })} >{loading ? "Loading..." : "Load More"}</button>}
							</div>
						</ul>
					</div>
				</div>
					<div className="chat-section-right-msg-box mt-3">
						<div className="post-section-like-comnt">
							<div className="comment-section-btm d-flex align-items-center">
								<div className="input-group">
									<div className="d-inline-flex w-100">
										<input type="text" placeholder="Type Somthing..." className="form-control comn-input-style ps-3" onKeyDown={handleKeyDownMainComment} ref={commentMainRef} />
										<button type="button" className="input-group-text input-2 p-3 ms-2 border-0 bg-transparent p-0 d-flex align-items-center justify-content-center" onClick={() => handleMainCommentSend()}>
											<img src={Send} alt="send" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>)}
		</div>
	);
}
