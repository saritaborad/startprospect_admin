import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import MainLayout from "../Components/Layout/MainLayout";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import rolecontext from "../contexts/roleContext";
import ShareModal from "../Components/AllModals/ShareModal";
import { FetchPostApi } from "../Api/apiServices";
import { API_Path } from "../Api/Const";
import { toast } from "react-toastify";
import DefaultPro from "../assets/images/defaultProPic.png";

export default function InviteOthers() {
	const context = useContext(rolecontext);

	const [sharemodalShow, setShareModalShow] = useState(false);
	const [ShortUrl, setShortUrl] = useState("https://starprospectnil.page.link/Fdc3YH8TgHcPQvxT7");
	// const [ShortUrl, setShortUrl] = useState("");

	const closeSharePostModal = () => {
		setShareModalShow(false);
		setShortUrl("");
	};

	const shareLink = async (id) => {
		let data = { type_id: id, share_type: "post" };
		let result = await FetchPostApi(API_Path.shareLink, data);
		let shareLink = await result.json();
		if (result.status === 200) {
			setShortUrl(shareLink.data.shortLink);
			setShareModalShow(true);
		} else {
			toast.error(shareLink.message);
		}
	};

	return (
		<MainLayout>
			<section className="gray-bg-section">
				<div className="container">
					<div className="row me-0">
						<div className="col-xl-2 col-md-3">
							<ProfileLayout />
						</div>
						<div className="col-xl-10 col-md-9 pe-0">
							<div className="row">
								<div className="col-12">
									<div className="d-md-flex align-items-center">
										<div className="mt-3 mt-md-0 tabs-heading-txt">
											<h5>Invite Others</h5>
										</div>
										<div className="position-relative ms-auto mt-3 mt-md-0">
											<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#6C6A81" className="bi bi-search fix-in-icon" viewBox="0 0 16 16">
												<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
											</svg>
											<input type="input" className="form-control login-comn-input searchbar ps-5" placeholder="Search" />
										</div>
									</div>
								</div>
								<div className="col-12 text-center mt-3">
									<div className="invite-share-div p-3">
										<div>
											<img src={context?.profiledata?.profile_img ? context?.profiledata?.profile_img : require({DefaultPro})} alt="profile" />
										</div>
										<div>
											<span>{context?.profiledata?.name}</span>
											<bdi>Friends who have not joined STARPROSPECT. Send the an exclusive invite now!</bdi>
										</div>
										<div className="row">
											<div className="col-sm-3 mx-auto">
												<button className="comn-btn-class mt-3" onClick={() => setShareModalShow(true)}>
													Share
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ================ Share Modal ================== */}
			{sharemodalShow && (
				<Modal show={sharemodalShow} onHide={() => closeSharePostModal()} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
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
		</MainLayout>
	);
}
