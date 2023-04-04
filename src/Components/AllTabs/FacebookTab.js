import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ImagePostApi } from "../../Api/apiServices";
import logo from "../../assets/images/close.svg";
import { API_Path } from "../../Api/Const";
import Cloud from "../../assets/images/cloud-upload1.svg";

export default function Instagram(props) {
	const [fbactivities, setFbActivities] = useState({ name: "facebook", post: false, story: false, reels: false, igtv: false, image: [] });

	useEffect(() => {
		props.handleFbStateChange(fbactivities);
	}, [fbactivities]);

	useEffect(() => {
		setFbActivities({ name: "facebook", post: props?.fbData?.post ? props?.fbData?.post : false, story: props?.fbData?.story ? props?.fbData?.story : false, reels: props?.fbData?.reels ? props?.fbData?.reels : false, igtv: props?.fbData?.igtv ? props?.fbData?.igtv : false, image: props?.fbData?.image ? props?.fbData?.image : [] });
	}, []);

	const fbActivitiesImgUpdate = async (e) => {
		if (e.target.files.length > 0) {
			let formData = new FormData();
			for (let i = 0; i < e.target.files.length; i++) {
				formData.append("images", e.target.files[i]);
			}
			let result = await ImagePostApi(API_Path.addImage, formData);
			let getImage = await result.json();
			if (result.status === 200) {
				var a = getImage.data.img;
				setFbActivities({ ...fbactivities, image: [...fbactivities.image, ...a] });
			} else {
				toast.error(getImage.message);
			}
		}
	};

	const handleRemovePropImg = (e) => {
		fbactivities.image.splice(e, 1);
		setFbActivities({ ...fbactivities, image: [...fbactivities.image] });
	};

	return (
		<>
			<div className="cust-rou-icon-main mt-3">
				<div className="my-3 my-sm-0">
					<label className="cust-chk-bx me-3">
						<input type="checkbox" id="true" name="post" checked={fbactivities?.post} onChange={() => setFbActivities({ ...fbactivities, post: !fbactivities.post })} />
						<span className="cust-chkmark"></span>
						<bdi>Post</bdi>
					</label>
				</div>
				<div className="my-3 my-sm-0">
					<label className="cust-chk-bx me-3">
						<input
							type="checkbox"
							id="story"
							name="story"
							checked={fbactivities?.story}
							onChange={() => {
								setFbActivities({ ...fbactivities, story: !fbactivities.story });
							}}
						/>
						<span className="cust-chkmark me-3"></span>
						<bdi>Story</bdi>
					</label>
				</div>
				<div className="my-3 my-sm-0">
					<label className="cust-chk-bx me-3">
						<input
							type="checkbox"
							id="reels"
							name="reels"
							checked={fbactivities?.reels}
							onChange={() => {
								setFbActivities({ ...fbactivities, reels: !fbactivities.reels });
							}}
						/>
						<span className="cust-chkmark"></span>
						<bdi>Reels</bdi>
					</label>
				</div>
				<div className="my-3 my-sm-0">
					<label className="cust-chk-bx">
						<input
							type="checkbox"
							id="igtv"
							name="igtv"
							checked={fbactivities?.igtv}
							onChange={() => {
								setFbActivities({ ...fbactivities, igtv: !fbactivities.igtv });
							}}
						/>
						<span className="cust-chkmark"></span>
						<bdi>IGTV</bdi>
					</label>
				</div>
			</div>
			<div className="make-a-deal-top-title mt-3">
				<label className="activity-innr-lable">Attach Media</label>
				<div className="col-12">
					<div className="row align-items-center me-0">
						{fbactivities &&
							fbactivities?.image?.length > 0 &&
							fbactivities?.image?.map((item, i) => {
								return (
									<div className="col-xxl-2 col-sm-3 col-6 mb-3 property-width pe-0" key={i}>
										<div className="position-relative property-img">
											{item.includes(".mp4") ? <video src={item} alt="error" className="property-vid" controls /> : <img src={item} alt="error" />}
											<div className="close-btn" onClick={() => handleRemovePropImg(i)}>
												<img src={logo} alt="logo" />
											</div>
										</div>
									</div>
								);
							})}
						<div className="col-xxl-2 col-sm-3 col-6 mb-3 property-width pe-0">
							<div className="add-image">
								<label htmlFor="img">
									<img src={Cloud} alt="cloud-upload" />
								</label>
								<input type="file" id="img" name="img" accept="image/*,video/*" className="d-none" multiple="multiple" onChange={(e) => fbActivitiesImgUpdate(e)} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
