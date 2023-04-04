import React from "react";
import { toast } from "react-toastify";
import { EmailShareButton, FacebookShareButton, InstapaperShareButton, TwitterShareButton, LinkedinShareButton } from "react-share";
import Facebook from "../../assets/images/Facebookicon.png";
import Insta from "../../assets/images/instagramicon.png";
import Twitter from "../../assets/images/twittericon.png";
import Linkedin from "../../assets/images/linkedin_icon.png";
import Gmail from "../../assets/images/gmail_icon.png";

export default function ShareModal(props) {
	const copy = (copyText) => {
		navigator.clipboard.writeText(copyText);
		toast.success("Link Copied");
	};

	return (
		<div>
			<label className="input-label mb-2">Copy Link</label>
			<div className="input-group mb-4">
				<span className="input-group-text" id="basic-addon1">
					@
				</span>
				<input type="text" className="form-control comn-input-style close-post-cust ps-2" placeholder="https://starprospectnil.com/3b3655cc" title="https://starprospectnil.com/3b3655cc" aria-label="Username" aria-describedby="basic-addon1" defaultValue={props.ShortUrl} />
				<button className="link-copy-btn" onClick={() => copy(props.ShortUrl)}>
					copy
				</button>
			</div>
			<div className="top-new-section position-relative">
				<span className="d-inline-block px-2 position-relative">OR</span>
			</div>
			<div className="row">
				<div className="col-12 mx-auto text-center p-0">
					<div>
						<label className="input-label mt-3">Send Link</label>
						<div>
							<ul className="d-flex align-items-center justify-content-center mt-3 social-share-icon">
								<li>
									<FacebookShareButton url={props.ShortUrl} hashtag={"#hashtag"} description={"aiueo"} className="Demo__some-network__share-button">
										<img src={require({ Facebook })} alt="Facebook" />
									</FacebookShareButton>
								</li>
								<li>
									<InstapaperShareButton url={props.ShortUrl} hashtag={"#hashtag"} description={"aiueo"} className="Demo__some-network__share-button">
										<img src={require({ Insta })} alt="instagram" />
									</InstapaperShareButton>
								</li>
								<li>
									<TwitterShareButton title={"test"} url={props.ShortUrl} hashtags={["hashtag1", "hashtag2"]}>
										<img src={require({ Twitter })} alt="twitter" />
									</TwitterShareButton>
								</li>
								<li>
									<LinkedinShareButton url={props.ShortUrl} hashtag={"#hashtag"} description={"aiueo"} className="Demo__some-network__share-button">
										<img src={require({ Linkedin })} alt="linkedin" />
									</LinkedinShareButton>
								</li>
								<li>
									<EmailShareButton url={props.ShortUrl} hashtag={"#hashtag"} description={"aiueo"} className="Demo__some-network__share-button">
										<img src={require({ Gmail })} alt="gmail" className="me-0" />
									</EmailShareButton>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
