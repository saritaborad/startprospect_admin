import React, { useState, useEffect, useContext, useRef } from "react";
import { Tab, Nav, Dropdown } from "react-bootstrap";
import MainLayout from "../Components/Layout/MainLayout";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import ChatPro from "../assets/images/chat1.png";
import RightCheck from "../assets/images/right-check.svg";
import Link from "../assets/images/link.svg";
import Send from "../assets/images/send.svg"
import Reader from "../assets/images/reader.svg"
import { FetchPostApi, ImagePostApi } from "../Api/apiServices";
import { API_Path, userLink } from "../Api/Const";
import { toast } from "react-toastify";
import defaultProPic from "../../src/assets/images/defaultProPic.png"
import pdf from "../../src/assets/images/pdf.png"
import closeicon from "../../src/assets/images/closeicon.svg"
import moment from "moment";
import roleContext from "../contexts/roleContext";
import io from "socket.io-client";
import InputEmoji from "react-input-emoji";


export default function Chat() {
	const context = useContext(roleContext);
	const [chatList, setChatList] = useState([]);
	const [loader, setLoader] = useState(false);
	const [flag, setFlag] = useState(true);
	const [user, setUser] = useState("");
	const [user_id, setUser_id] = useState('')
	const [socket, setSocket] = useState();
	const [allMessages, setMessages] = useState([]);
	const [text, setText] = useState("");
	const [moreChat, setMoreChat] = useState(false);
	const [loader1, setLoader1] = useState(false);
	const [convId, setConvId] = useState([]);
	const [attachImg, setAttachImg] = useState("");
	const [attachWait, setAttachWait] = useState(false);
	const [totalMessage, setTotalMessage] = useState("");
	const [fileName, setFileName] = useState("");
	const [loader2, setLoader2] = useState(false);

	let arr2 = [];
	const msgBoxRef = useRef();
	const myDivRef = useRef(null);

	const chatboxactive = (user) => {
		handleScroll()
		document.getElementById("chat-main").classList.toggle("active");
		setUser(user)
		getMessage(user._id)
	};

	const chatboxclose = () => {
		document.getElementById("chat-main").classList.remove("active");
	};

	useEffect(() => {
		setUser_id(context.user_id);
		conversion(context.user_id);
	}, [context.user_id]);

	useEffect(() => {
		getChatList();
	}, []);

	useEffect(() => {
		if (!moreChat) {
			//   getMessage();
		}
		if (moreChat) {
			getMoreMessage();
		}
	}, []);

	const handleScroll = () => {
		const { scrollTop } = myDivRef.current;
		if (scrollTop === 0 && totalMessage > allMessages.length) {
			getMoreMessage();
		}
	};

	useEffect(() => {
		if (myDivRef?.current && myDivRef.current.scrollHeight > 0) {
			myDivRef.current.scrollTo({
				top: myDivRef.current.scrollHeight,
			});
		}
	}, []);

	useEffect(() => {
		if (myDivRef?.current) {
			myDivRef.current.addEventListener("scroll", handleScroll);
			return () => {
				if (myDivRef.current) {
					myDivRef.current.removeEventListener("scroll", handleScroll);
				}
			};
		}
	}, [handleScroll]);

	useEffect(() => {
		const socket = io.connect(userLink);
		setSocket(socket);
		socket?.on("connect", () => {
			socket?.emit("joinRoom", { senderid: user._id, joinIds: convId });
		});
		socket?.emit("createRoom", { senderid: user_id, receiverid: user._id, conversionId: allMessages.length > 0 ? allMessages?.[0]?.conversionId : "" });
	}, []);

	useEffect(() => {
		// if (socket) {
		socket?.on("getMessage", (newMessage) => {
			newMessage.dir = "left";
			setMessages([...allMessages, newMessage]);
			setText("");
		});
		// }
	}, [socket]);

	const onSubmit = () => {
		let d = text.trim();
		if (d.length > 0 || attachImg !== "") {
			const messageContent = text !== "" ? text : attachImg ? attachImg : d;
			const messageType = text !== "" ? 0 : attachImg !== "" ? (attachImg.includes(".mp4") ? 2 : attachImg.includes(".pdf") ? 5 : 1) : 0;
			const newMessage = {
				senderid: user_id,
				receiverid: user._id,
				msgTo: 0,
				type: messageType,
				message: messageContent,
				fileName: attachImg.includes(".pdf") ? fileName : "",
				conversionId: allMessages?.[0]?.conversionId,
				first_msg: allMessages.length > 0 ? 0 : 1,
			};
			arr2.push(newMessage);
			socket?.emit("sendMessage", newMessage);
			socket?.on("getMessage", (data) => { });
			setMessages([...allMessages, newMessage]);
			setText("");
			setAttachImg("");
		}
	};

	const handleChange = (e) => {
		setAttachImg("");
		msgBoxRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
		setText(e);
	};



	const getMessage = async (id) => {
		let data = { sort: "", order: "", status: 1, limit: 20, rcvId: id, lastId: "" };
		let result = await FetchPostApi(API_Path.getMsg, data);
		let getPost = await result.json();
		if (result.status === 200) {
			setMessages(getPost.data.userChat);
			setTotalMessage(getPost);
		} else {
			toast.error(getPost.message);
		}
	};

	const getMoreMessage = async () => {
		setLoader2(true);
		const lastMessageId = allMessages[0]._id;
		const lastScrollTop = myDivRef.current.scrollTop;
		let data = { sort: "", order: "", status: 2, limit: 20, rcvId: user._id, lastId: allMessages?.[0]?._id };
		let result = await FetchPostApi(API_Path.getMsg, data);
		let getPost = await result.json();

		if (result.status === 200) {
			setLoader2(true);
			const newMessages = getPost.data.userChat
			const mergedMessages = [...newMessages, ...allMessages];
			setMessages(mergedMessages);

			// Wait for the new messages to be rendered
			setTimeout(() => {
				const lastReadMessageElement = document.getElementById(`item-${lastMessageId}`);

				if (lastReadMessageElement) {
					// If the last read message exists, scroll to it
					myDivRef.current.scrollTo({
						top: lastReadMessageElement.offsetTop - 100,
					});
				} else {
					// If the message with the previous _id is not found, scroll to the previous position
					myDivRef.current.scrollTo({
						top: lastScrollTop, // Set the scroll position to the previous position
					});
				}
			}, 0);
		} else {
			toast.error(getPost.message);
		}
	};



	const conversion = async () => {
		let result = await FetchPostApi(API_Path.conversion, { senderid: user_id });
		let getPost = await result.json();
		if (result.status === 200) {
			setConvId(getPost.data);
		} else {
			toast.error(getPost.message);
		}
	};

	const getChatList = async () => {
		setLoader(true);
		let result = await FetchPostApi(API_Path.chatList, { search: "" });
		setLoader(false);
		setFlag(false);
		let getPost = await result.json();
		if (result.status === 200) {
			setChatList(getPost.data);
		} else {
			toast.error(getPost.message);
		}
	};

	const profileimgupdate = async (e) => {
		setText("");
		if (e.target.files[0]) {
			let formData = new FormData();
			formData.append("images", e.target.files[0]);
			let result = await ImagePostApi(API_Path.addImage, formData);
			setAttachWait(true);
			let getImage = await result.json();
			if (result.status === 200) {
				setAttachWait(false);
				setAttachImg(getImage.data.img[0])
				setFileName(getImage.data.fileName)
			} else {
				toast.error(getImage.message);
			}
		}
	};

	const ChatDateLabel = ({ date }) => {
		if (moment().isSame(moment(date), "day")) {
			return <div style={{ textAlign: "center" }}>Today</div>;
		} else if (moment().subtract(1, "day").isSame(moment(date), "day")) {
			return <div style={{ textAlign: "center" }}>Yesterday</div>;
		} else {
			return <div style={{ textAlign: "center" }}>{new Date(date).toLocaleDateString("en-GB").split("/").join("-")}</div>;
		}
	};

	function handleOnEnter(e) {
		setAttachImg("");
		setText(e);
		onSubmit();
	}




	return (
		<MainLayout>
			<section className="gray-bg-section">
				<div className="container">
					<div className="row me-0">
						<div className="col-xl-2 col-md-3">
							<ProfileLayout />
						</div>
						<div className="col-xl-10 col-md-9 pe-0">
							<div className="mb-3 mt-3 mt-md-0 tabs-heading-txt">
								<h5>Chat(5)</h5>
							</div>
							<div className="row">
								<div className="col-xl-5 col-lg-6">
									<Tab.Container id="left-tabs-example" defaultActiveKey="inbox">
										<div className="comn-tab-sec  position-relative">
											<Nav variant="pills">
												<Nav.Item>
													<Nav.Link eventKey="inbox">Inbox</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey="sent">Sent</Nav.Link>
												</Nav.Item>
											</Nav>
										</div>
										<Tab.Content>
											<Tab.Pane eventKey="inbox">
												<div className="chat-lft-part-main mt-3">
													<div className="chat-left-part-btm">
														<div className="chat-div">

															{chatList.msg?.msg?.length > 0 &&
																chatList.msg?.msg.map((item, i) => {
																	return (
																		<div className="chat-people-info" onClick={() => chatboxactive(item.user)}>
																			<div className="chat-pro-div d-flex align-items-center">
																				<div className="chat-profile position-relative"><img src={item.user.profile_img ? item.user.profile_img : defaultProPic} alt="profile" /> {item.user.isOnline == 1 && <span className="online-active"></span>}</div>
																				<div className="ms-3 chat-status-class athlete-chat">
																					<div>
																						<bdi>{item.user.name}</bdi>
																						<p>{item.message}</p>
																					</div>
																					<div className="ms-auto">
																						<span className="chat-date-date-month-div">{moment(item.createdAt).format("LT")}</span>
																					</div>
																				</div>
																			</div>
																		</div>
																	);
																})}
														</div>
													</div>
												</div>
											</Tab.Pane>
										</Tab.Content>
									</Tab.Container>
								</div>
								<div className="col-xl-7 col-lg-6">
									<div className="chat-display" id="chat-main">
										<div className="chat-rgt-head">
											<div className="rgt-pro-info d-flex align-items-center">
												<div className="d-lg-none pe-2">
													<button className="bg-transparent border-0 pe-2" onClick={chatboxclose}>
														<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
															<path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
														</svg>
													</button>
												</div>
												<div className="chat-profile d-flex align-items-center">
													<img src={user.profile_img ? user.profile_img : defaultProPic} alt="profile" className="img-fluid" />
													<div className="ms-3 chat-status-class flex-column">
														<bdi>{user.name}</bdi>
														<p className="chat-profile-txt">{user.isOnline == 1 ? "Online" : "Offline"}</p>
													</div>
												</div>
												<div className="ms-auto chat-user-options pe-3">
													<div className="table-ed-drop">
														<Dropdown drop="left">
															<Dropdown.Toggle className="table-dropdown-btn " id="dropdown-basic">
																<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="#333333" className="bi bi-three-dots" viewBox="0 0 19 19">
																	<path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
																</svg>
															</Dropdown.Toggle>
															<Dropdown.Menu>
																<Dropdown.Item>
																	<span>Delete</span>
																</Dropdown.Item>
															</Dropdown.Menu>
														</Dropdown>
													</div>
												</div>
											</div>
										</div>
										<div className="chat-main-area">
											<div className="chat-box-part">
												<div className="chat-box message-in mb-2">
													<div className="top-new-section my-3">
														<span className="d-inline-block px-2 position-relative">Aug 25, 2021</span>
													</div>
												</div>
												<div className="chat-section-right-scroll">
													<div className="chat-bubble-main" id="chat-main">
														<div id="myDiv" ref={myDivRef} className="chat-section-right-scroll position-relative">
															{loader2 && (
																<div class="spinner-border spinner-chat" role="status">
																	<span class="sr-only"></span>
																</div>
															)}
															{allMessages?.map((item, index) => {
																const prevItem = allMessages[index - 1];
																const showDateLabel = !prevItem || !moment(item.createdAt).isSame(moment(prevItem.createdAt), "day");
																return (
																	<>
																		{showDateLabel && <ChatDateLabel date={item.createdAt} key={`label-${item._id}`} />}
																		{item.senderid === user_id && (
																			<div className="chat-bubble outgoing-chat" id={`item-${item._id}`} key={item._id}>
																				<div className="chat-message-main">
																					<div className="chat-message-info">
																						<div className="chat-message">
																							<p className="text-end">
																								{item?.message?.includes(".jpg") || item?.message?.includes(".png") ? (
																									<img src={item?.message} className="img-fluid w-100 news-img" alt="" />
																								) : item?.message?.includes(".mp4") ? (
																									<video src={item?.message} className="video-fluid w-100 news-video" controls />
																								) : item?.message?.includes(".pdf") ? (
																									<div className="file-actions">
																										<button className="border-0 common-pdf d-flex align-items-center">
																											<img src={pdf} alt="pdf" />
																											<span>
																												{" "}
																												<Link href={item?.message} download>
																													{" "}
																													{item.fileName}
																												</Link>
																											</span>
																										</button>
																									</div>
																								) : item?.message?.match(/((https?):\/\/)?(www\.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/i) ? (
																									<Link href={item?.message.includes("https" || "http") ? item?.message : "https://" + item?.message} target="_blank" rel="noopener noreferrer">
																										<span style={{ color: "#6a58fb" }}>{item?.message}</span>
																									</Link>
																								) : (
																									<span>{item?.message}</span>
																								)}
																							</p>
																							<span className="d-md-none d-block">
																								<img src={Reader} className="ms-1" alt="" />
																							</span>
																						</div>
																						<span className="d-md-block d-none">
																							{moment(item.createdAt).format("LT")}
																							{item.isRead == 1 ? (
																								<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
																									<path d="M7.70576 11.0079L3.58076 6.88371L4.75826 5.70454L7.70576 8.65204L14.7766 1.58038L15.9549 2.75871L7.70492 11.0087L7.70576 11.0079ZM4.16992 11.0079L0.0449219 6.88371L1.22326 5.70454L5.34826 9.82954L4.17076 11.0079H4.16992ZM7.70576 7.47288L6.52659 6.29454L11.8299 0.991211L13.0091 2.16954L7.70576 7.47204V7.47288Z" fill="#6A58FB" />
																								</svg>
																							) : (
																								<img src={Reader} className="me-1" alt="" />
																							)}
																						</span>
																					</div>
																				</div>{" "}
																				<div ref={msgBoxRef}></div>
																			</div>
																		)}
																		{item.senderid != user_id && (
																			<div className="chat-bubble incoming-chat">
																				<div className="chat-message-main">
																					<div className="chat-message-info">
																						<div className="chat-message">
																							<p>
																								{item?.message?.includes(".jpg") || item?.message?.includes(".png") ? (
																									<img src={item?.message} className="img-fluid w-100 news-img" alt="" />
																								) : item?.message?.includes(".mp4") ? (
																									<video src={item?.message} className="video-fluid w-100 news-video" controls />
																								) : item?.message?.includes(".pdf") ? (
																									<div className="file-actions">
																										<button className="border-0 common-pdf d-flex align-items-center">
																											<img src={pdf} alt="pdf" />
																											<span>
																												<Link href={item?.message} download>
																													{" "}
																													{item.fileName}
																												</Link>
																											</span>
																										</button>
																									</div>
																								) : item?.message?.match(/((https?):\/\/)?(www\.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/i) ? (
																									<Link href={item?.message.includes("https" || "http") ? item?.message : "https://" + item?.message} target="_blank" rel="noopener noreferrer">
																										<span style={{ color: "#6a58fb" }}>{item?.message}</span>
																									</Link>
																								) : (
																									<span>{item?.message}</span>
																								)}
																							</p>
																						</div>
																						<span className="d-md-block d-none">{moment(item.createdAt).format("LT")}</span>
																					</div>
																				</div>
																				<div ref={msgBoxRef}></div>
																			</div>
																		)}
																	</>
																);
															})}
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="chat-section-right-msg-box py-3">
											<div className="post-section-like-comnt">
												<div className="">
													<div className="input-group">
														<div className="comment-section-btm d-flex align-items-center w-100">
															<div className="parent-white me-2">
																{attachWait ? (
																	<button type="button" className="">
																		<label for="imageUpload">
																			<div class="spinner-border" role="status">
																				<span class="sr-only"></span>
																			</div>
																		</label>
																		<input type="file" id="imageUpload" name="imageUpload" className="d-none" accept=".png, .jpg, .mp4" onChange={(e) => profileimgupdate(e)} />
																	</button>
																) : (
																	<button type="button" className="">
																		<label for="imageUpload">
																			<img src={Link} alt="" />
																		</label>
																		<input type="file" id="imageUpload" name="imageUpload" className="d-none" accept=".png, .jpg, .mp4, .pdf" onChange={(e) => profileimgupdate(e)} />
																	</button>
																)}
															</div>
															{attachImg == "" ? (
																<InputEmoji className="form-control me-2 " value={text} onChange={handleChange} cleanOnEnter onEnter={handleOnEnter} placeholder="Type Somthing..." />
															) : (
																<div className="chat-upload-img  position-relative">
																	{attachImg.includes(".jpg") || attachImg.includes(".png") ? (
																		<>
																			<div className="">
																				<img src={closeicon} alt="" className="close-icon" onClick={() => setAttachImg("")} />
																				<img src={attachImg} alt="" />
																			</div>
																		</>
																	) : attachImg.includes(".pdf") ? (
																		<>
																			<img src={closeicon} alt="" className="close-icon" onClick={() => setAttachImg("")} />
																			<div className="file-actions">
																				<button className="border-0 common-pdf d-flex align-items-center">
																					<img src={pdf} alt="pdf" />
																					<span>{fileName}</span>
																				</button>
																			</div>
																		</>
																	) : (
																		<>
																			<img src={closeicon} alt="" className="close-icon" onClick={() => setAttachImg("")} />
																			<video width="100%" height="100%" controls>
																				<source src={attachImg} type="video/mp4" />
																			</video>
																		</>
																	)}
																</div>
															)}
															<div className="input-group-text input-2 border-0 ms-auto " onClick={onSubmit}>
																<button type="submit" className="border-0 bg-transparent p-0 d-flex">
																	<bdi className="text-white d-md-block d-none m-0 p-0">Send</bdi>
																	<p olygon className="border-0 bg-transparent p-0 ms-0 ms-md-2 mb-0">
																		<img src={Send} alt="" />
																	</p>
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</MainLayout>
	);
}
