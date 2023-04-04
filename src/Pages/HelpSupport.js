import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import MainLayout from "../Components/Layout/MainLayout";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import RightCheck from "../assets/images/right-check.svg";
import Link from "../assets/images/link.svg";
import Send from "../assets/images/send.svg"

export default function HelpSupport() {
	const [reqchatState, setReqchat] = useState({ reqchatDetail: false });

	const handleReqchatClick = (type) => {
		setReqchat({ [type]: true });
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
							{reqchatState.reqchatDetail === false && (
								<>
									<div className="my-3 mt-md-0 tabs-heading-txt">
										<h5>Help & Support</h5>
									</div>
									<div className="help-issue-div p-3">
										<div className="row">
											<div className="col-xl-5 col-sm-6 mb-3">
												<div className="">
													<label className="">Issue</label>
													<select className="w-100 comn-input-style form-select ps-3">
														<option>Money is not credited</option>
													</select>
													<div>
														<button className="comn-btn-class mt-3" onClick={() => handleReqchatClick("reqchatDetail")}>
															Request Chat
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="faq-main-class p-3 mt-3">
										<Accordion defaultActiveKey="0">
											<Accordion.Item eventKey="0" className="accor-item">
												<Accordion.Header className="accor-hdr">What is the purpose of Starprospect?</Accordion.Header>
												<Accordion.Body className="accor-bdy">To better connect more candidates with more employers and hiring doctors in a more meaningful way.</Accordion.Body>
											</Accordion.Item>
											<Accordion.Item eventKey="1" className="accor-item">
												<Accordion.Header className="accor-hdr">Where is the Starprospect app available?</Accordion.Header>
												<Accordion.Body className="accor-bdy">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Accordion.Body>
											</Accordion.Item>
											<Accordion.Item eventKey="2" className="accor-item">
												<Accordion.Header className="accor-hdr">What devices can I download and use Starprospect on?</Accordion.Header>
												<Accordion.Body className="accor-bdy">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Accordion.Body>
											</Accordion.Item>
											<Accordion.Item eventKey="3" className="accor-item border-0">
												<Accordion.Header className="accor-hdr">How do I join the Starprospect Team?</Accordion.Header>
												<Accordion.Body className="accor-bdy">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</Accordion.Body>
											</Accordion.Item>
										</Accordion>
									</div>
								</>
							)}
							{/* ===================== REQUEST FOR CHATS ===================== */}
							{reqchatState.reqchatDetail && (
								<>
									<div className="my-3 mt-md-0 tabs-heading-txt">
										<h5>Help & Support</h5>
									</div>
									<div className="row justify-content-center">
										<div className="col-12">
											<div className="chat-main-area">
												<div className="chat-box-part">
													<div className="chat-box message-in mb-2">
														<div className="top-new-section my-3">
															<span className="d-inline-block px-2 position-relative">Aug 25, 2021</span>
														</div>
													</div>
													<div className="chat-section-right-scroll">
														<div className="chat-bubble-main">
															<div className="chat-bubble incoming-chat">
																<div className="chat-message-main">
																	<div className="chat-message-info">
																		<div className="chat-message">
																			<p className="mb-0">Who was that photographer you shared with me recently?</p>
																		</div>
																		<span className="text-end d-block">09:10 PM</span>
																	</div>
																</div>
															</div>
															<div className="chat-bubble outgoing-chat">
																<div className="chat-message-main">
																	<div className="chat-message-info">
																		<div className="chat-message">
																			<p className="mb-0">Who was that photographer you shared with me recently?</p>
																		</div>
																		<span className="text-end d-block">
																			<img src={RightCheck} className="me-1" alt="check" />
																			09:10 PM
																		</span>
																	</div>
																</div>
															</div>
															<div className="chat-bubble outgoing-chat">
																<div className="chat-message-main">
																	<div className="chat-message-info">
																		<div className="chat-message">
																			<p className="mb-0">when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
																		</div>
																		<span className="text-end d-block">
																			<img src={RightCheck} className="me-1" alt="check" />
																			09:10 PM
																		</span>
																	</div>
																</div>
															</div>
															<div className="chat-bubble outgoing-chat justify-content-start">
																<div className="chat-message-main">
																	<div className="chat-message-info">
																		<div className="chat-message">
																			<p className="mb-0">Amazing</p>
																		</div>
																	</div>
																</div>
															</div>
															<div className="chat-bubble outgoing-chat justify-content-start">
																<div className="chat-message-main">
																	<div className="chat-message-info">
																		<div className="chat-message">
																			<p className="mb-0">He has some interesting work</p>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="chat-section-right-msg-box py-3">
												<div className="post-section-like-comnt">
													<div className="comment-section-btm d-flex align-items-center">
														<div className="input-group">
															<div className="d-inline-flex w-100">
																<input type="text" placeholder="Type Somthing..." className="form-control comn-input-style border-0" />
																<span className="link-upload-content border-0 ms-2">
																	<button type="button" className="border-0 bg-transparent">
																		<img src={Link} alt="link" />
																	</button>
																</span>
																<span className="input-group-text input-2 border-0 ms-2 p-2 align-items-center">
																	<span className="text-white d-md-block d-none bg-transparent h-0 w-0">Send</span>
																	<button type="button" className="border-0 bg-transparent p-0 ms-0 ms-md-3 mb-1">
																		<img src={Send} alt="send" />
																	</button>
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</section>
		</MainLayout>
	);
}
