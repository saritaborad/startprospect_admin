import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { FetchPostApi } from "../../Api/apiServices";
import { API_Path, formatTimeSince } from "../../Api/Const";
import Loader from "../Loader/Loader";

export default function LikesModal(props) {
	const [getPostLikeId, setgetPostLikeId] = useState();
	const [allLikePost, setAllLikePost] = useState([]);
	const [likeOption, setLikeOption] = useState({ sizePerPage: 6, search: "", page: 0, sort: "time", order: "DESC" });
	const [total, setTotal] = useState('');
	const [loading, setloading] = useState(false);
	const [flag, setflag] = useState(true);
	
	useEffect(() => {
		setgetPostLikeId(props.getSelectPostId)
	}, [props.getSelectPostId])

	useEffect(() => {
		getPostLikeId && getAllLike()
	}, [getPostLikeId, likeOption.page])

	const getAllLike = async () => {
		setloading(true)
		let data = { postid: getPostLikeId, options: likeOption };
		let result = await FetchPostApi(API_Path.getLikes, data);
		let getLikeAll = await result.json();
		if (result.status === 200) {
			setAllLikePost([...allLikePost , ...getLikeAll?.data?.data]);
			setTotal(getLikeAll?.data?.totalRecord)
			setloading(false)
			setflag(false)
		} else {
			toast.error(getLikeAll.message);
			setloading(false)
			setflag(false)
		}
	};

	return (
		<div className="row">
			{flag ? (<div className="loading-modal">
				<div className="loader"></div>
			</div>) : (
				<div className="col-12">
					<div className="like-modal-body like-modal-class">
						{allLikePost && allLikePost?.length > 0 &&
							allLikePost?.map((likes, i) => {
								return (
									<div key={i} className="d-flex align-items-center">
										<img src={likes?.profile_img ? likes?.profile_img : require("../../assets/images/defaultProPic.png")} alt="profile" className="img-fluid" />
										<p className="mb-0 ms-3">
											<span>{likes?.user_name}</span> Liked Your Post
										</p>
										<bdi className="ms-auto">{formatTimeSince(new Date(likes?.time))}</bdi>
									</div>
								);
							})}
						<div className="col-md-12 text-center my-3">
							{allLikePost && allLikePost?.length > 0 && total > allLikePost?.length &&
								<button className="pagination-button load-more-btn-cust py-1 px-2" type='button' onClick={() => setLikeOption({ ...likeOption, page: likeOption.page + 1 })} >{loading ? "Loading..." : "Load More"}</button>}
						</div>
					</div>
				</div>)}
		</div>
	);
}
