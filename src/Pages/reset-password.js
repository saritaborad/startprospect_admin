import React from "react";
import MainLogo from "../assets/images/main-logo.png";
import ArchyMan from "../assets/images/Archery-man.png";

export default function ResetPassword() {
	const passwordshow = (e) => {
		var x = document.getElementById("password");
		if (x.type === "password") {
			x.type = "text";
		} else {
			x.type = "password";
		}
		document.getElementById("show_pwd").classList.toggle("active");
	};
	const confirm_passwordshow = (e) => {
		var y = document.getElementById("confm_password");
		if (y.type === "password") {
			y.type = "text";
		} else {
			y.type = "password";
		}
		document.getElementById("confm_show_pwd").classList.toggle("active");
	};
	return (
		<>
			<div className="container-fluid login-flow-screen">
				<div className="row align-items-center h-100 position-relative">
					<div className="col-12 p-0">
						<div className="login-box mx-auto w-100 h-100">
							<div className="row">
								<div className="col-md-6 ovr-div-class">
									<div className="main-logo-box text-center my-5">
										<img src={MainLogo} className="img-fluid" alt="starprospect" />
									</div>
									<form className="row align-items-center signup-as-form-div max-width-class mx-auto py-3">
										<div className="col-12 mb-3">
											<div className="text-start">
												<div className="comn-login-head">
													<h2>Reset Password</h2>
													<p>Enter and confirm your new password below.</p>
												</div>
											</div>
										</div>
										<div className="col-sm-12 mb-3">
											<label className="comn-label-class">Password</label>
											<bdi className="d-block position-relative">
												<input type="password" id="password" className="form-control comn-input-style pe-5" placeholder="Enter Your Password" />
												<span className="showpwd-class bg-transparent" id="show_pwd" onClick={(e) => passwordshow(e)}>
													<i className="bi bi-eye-slash"></i>
												</span>
												<span className="comn-left-input-icon">
													<svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM5 5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5V5ZM14 19H2V9H14V19ZM8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16Z" fill="#7B838A" />
													</svg>
												</span>
											</bdi>
										</div>
										<div className="col-sm-12 mb-3">
											<label className="comn-label-class">Confirm Password</label>
											<bdi className="d-block position-relative">
												<input type="password" id="confm_password" className="form-control comn-input-style pe-5" placeholder="Enter Your Password" />
												<span className="showpwd-class bg-transparent" id="confm_show_pwd" onClick={(e) => confirm_passwordshow(e)}>
													<i className="bi bi-eye-slash"></i>
												</span>
												<span className="comn-left-input-icon">
													<svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M14 7H13V5C13 2.24 10.76 0 8 0C5.24 0 3 2.24 3 5V7H2C0.9 7 0 7.9 0 9V19C0 20.1 0.9 21 2 21H14C15.1 21 16 20.1 16 19V9C16 7.9 15.1 7 14 7ZM5 5C5 3.34 6.34 2 8 2C9.66 2 11 3.34 11 5V7H5V5ZM14 19H2V9H14V19ZM8 16C9.1 16 10 15.1 10 14C10 12.9 9.1 12 8 12C6.9 12 6 12.9 6 14C6 15.1 6.9 16 8 16Z" fill="#7B838A" />
													</svg>
												</span>
											</bdi>
										</div>
										<div className="col-sm-12 mx-auto my-3">
											<button className="comn-btn-class w-100" type="button" onClick={() => window.open("#", "_self")}>
												SAVE
											</button>
										</div>
									</form>
								</div>
								<div className="col-md-6 d-md-block d-none position-relative">
									<div className="main-poster">
										<img src={ArchyMan} className="img-fluid archery-img" alt="archery-man" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
