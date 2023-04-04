import React from 'react'

export default function TeamUpdateTab() {
    return (
        <div className="row">
            <div className="col-12 my-3">
                <div className="update-section-right-scroll">
                    <div className="team-update-box-main mt-3 p-3">
                        <div className="d-flex align-items-center">
                            <img src={"../assets/images/FW-icon.svg"} alt="" />
                            <span className="ms-3">John DoeAP</span>
                            <div className="ms-auto">
                                <bdi>15h</bdi>
                            </div>
                        </div>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                    </div>
                </div>
                <div className="chat-section-right-msg-box py-3 mt-3">
                    <div className="post-section-like-comnt">
                        <div className="comment-section-btm d-flex align-items-center">
                            <div className="input-group">
                                <div className="d-inline-flex w-100">
                                    <input type="text" placeholder="Type Somthing..." className="form-control comn-input-style border-0 ps-3" />
                                    <span className="link-upload-content border-0 ms-2">
                                        <button type="button" className="border-0 bg-transparent">
                                            <img src="../assets/images/link.svg" alt="link" />
                                        </button>
                                    </span>
                                    <span className="input-group-text input-2 border-0 ms-2 p-2 align-items-center">
                                        <span className="text-white d-md-block d-none bg-transparent h-0 w-0">Send</span>
                                        <button type="button" className="border-0 bg-transparent p-0 ms-0 ms-md-3 mb-1">
                                            <img src="../assets/images/send.svg" alt="send" />
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
