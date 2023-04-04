import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ImagePostApi } from "../../Api/apiServices";
import logo from "../../assets/images/close.svg";
import { API_Path } from "../../Api/Const";
import Cloud from "../../assets/images/cloud-upload1.svg";

export default function Instagram(props) {
	const [twitteractivities, setTwitterActivities] = useState({ name: "", post: false, story: false, reels: false, igtv: false, image: [] });

	useEffect(() => {
		props.handleTwitterStateChange(twitteractivities);
	}, [twitteractivities]);

	useEffect(() => {
		setTwitterActivities({ name: "twitter", post: props?.twitterData?.post ? props?.twitterData?.post : false, story: props?.twitterData?.story ? props?.twitterData?.story : false, reels: props?.twitterData?.reels ? props?.twitterData?.reels : false, igtv: props?.twitterData?.igtv ? props?.twitterData?.igtv : false, image: props?.twitterData?.image ? props?.twitterData?.image : [] });
	}, []);

	const ImgUpdate = async (e) => {
		if (e.target.files.length > 0) {
			let formData = new FormData();
			for (let i = 0; i < e.target.files.length; i++) {
				formData.append("images", e.target.files[i]);
			}
			let result = await ImagePostApi(API_Path.addImage, formData);
			let getImage = await result.json();
			if (result.status === 200) {
				var a = getImage.data.img;
				setTwitterActivities({ ...twitteractivities, image: [...twitteractivities.image, ...a] });
			} else {
				toast.error(getImage.message);
			}
		}
	};

	const handleRemovePropImg = (e) => {
		twitteractivities.image.splice(e, 1);
		setTwitterActivities({ ...twitteractivities, image: [...twitteractivities.image] });
	};

	return (
		<>
			<div className="cust-rou-icon-main mt-3">
				<div className="my-3 my-sm-0">
					<label className="cust-chk-bx me-3">
						<input type="checkbox" id="true" name="post" checked={twitteractivities?.post} onChange={() => setTwitterActivities({ ...twitteractivities, post: !twitteractivities.post })} />
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
							checked={twitteractivities?.story}
							onChange={() => {
								setTwitterActivities({ ...twitteractivities, story: !twitteractivities.story });
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
							checked={twitteractivities?.reels}
							onChange={() => {
								setTwitterActivities({ ...twitteractivities, reels: !twitteractivities.reels });
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
							checked={twitteractivities?.igtv}
							onChange={() => {
								setTwitterActivities({ ...twitteractivities, igtv: !twitteractivities.igtv });
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
						{twitteractivities &&
							twitteractivities?.image?.length > 0 &&
							twitteractivities?.image?.map((item, i) => {
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
								<input type="file" id="img" name="img" accept="image/*,video/*" className="d-none" multiple="multiple" onChange={(e) => ImgUpdate(e)} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
