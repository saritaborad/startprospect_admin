import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { ImagePostApi } from "../../Api/apiServices";
import logo from "../../assets/images/close.svg";
import { API_Path } from "../../Api/Const";
import Cloud from "../../assets/images/cloud-upload1.svg";

export default function Instagram(props) {
	const [tikactivities, setTikActivities] = useState({ name: "", post: false, story: false, reels: false, igtv: false, image: [] });

	useEffect(() => {
		props.handleTikTokStateChange(tikactivities);
	}, [tikactivities]);

	useEffect(() => {
		setTikActivities({ name: "tik-tok", post: props?.tikTokData?.post ? props?.tikTokData?.post : false, story: props?.tikTokData?.story ? props?.tikTokData?.story : false, reels: props?.tikTokData?.reels ? props?.tikTokData?.reels : false, igtv: props?.tikTokData?.igtv ? props?.tikTokData?.igtv : false, image: props?.tikTokData?.image ? props?.tikTokData?.image : [] });
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
				setTikActivities({ ...tikactivities, image: [...tikactivities.image, ...a] });
			} else {
				toast.error(getImage.message);
			}
		}
	};

	const handleRemovePropImg = (e) => {
		tikactivities.image.splice(e, 1);
		setTikActivities({ ...tikactivities, image: [...tikactivities.image] });
	};

	return (
		<>
			<div className="cust-rou-icon-main mt-3">
				<div className="my-3 my-sm-0">
					<label className="cust-chk-bx me-3">
						<input type="checkbox" id="true" name="post" checked={tikactivities?.post} onChange={() => setTikActivities({ ...tikactivities, post: !tikactivities.post })} />
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
							checked={tikactivities?.story}
							onChange={() => {
								setTikActivities({ ...tikactivities, story: !tikactivities.story });
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
							checked={tikactivities?.reels}
							onChange={() => {
								setTikActivities({ ...tikactivities, reels: !tikactivities.reels });
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
							checked={tikactivities?.igtv}
							onChange={() => {
								setTikActivities({ ...tikactivities, igtv: !tikactivities.igtv });
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
						{tikactivities &&
							tikactivities?.image?.length > 0 &&
							tikactivities?.image?.map((item, i) => {
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
