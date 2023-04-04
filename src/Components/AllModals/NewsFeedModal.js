import React, { useState, useEffect, useContext } from 'react'
import { API_Path, formatDate, formatTimeSince } from "../../Api/Const";
import { Dropdown, Modal } from "react-bootstrap";
import Slider from "react-slick";
import { toast } from 'react-toastify';
import { FetchPostApi } from '../../Api/apiServices';
import roleContext from "../../contexts/roleContext";
import Loader from "../Loader/Loader";
import { Link} from "react-router-dom";
import RePostModal from "../../Components/AllModals/RePostModal";
import ShareModal from './ShareModal';


export default function NewsFeedModal(props) {
    const { selectedPostId } = props
    const context = useContext(roleContext);
    const [loading, setloading] = useState(false);
    const [rePost, setRePost] = useState(false);
    const [sharemodalShow, setShareModalShow] = useState(false);
    const [user_id, setuser_id] = useState("");
    const [postid, setPostid] = useState('');
    const [getpost, setGetpost] = useState({});
    const [link, setLink] = useState("");
    const [getcomment, setGetcomment] = useState([]);
    const [commentLength, setcommentLength] = useState("");
    const [getAllcommentsOption, setgetAllcommentsOption] = useState({ sizePerPage: 8, search: {}, page: 0, sort: "createdAt", order: "ASC" });
    const [sendPostData, setsendPostData] = useState("");
    const [ShortUrl, setShortUrl] = useState("");


    useEffect(() => {
        if (context.user_id !== undefined) {
            setuser_id(context.user_id);
        }
    }, [context.user_id]);

    useEffect(() => {
        setPostid(selectedPostId)
    }, [props])

    useEffect(() => {
        postid && handlegetdata()
    }, [postid])

    useEffect(() => {
        postid && handlegetcomment();
    }, [postid, getAllcommentsOption.sizePerPage])

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: true,
                    centerMode: true,
                    slidesToShow: 1,
                    centerPadding: "0px",
                },
            },
        ],
    };

    const handlegetdata = async () => {
        setloading(true)
        let result = await FetchPostApi(API_Path.getPost, { postId: postid });
        let getAllgetPost = await result.json();
        if (result.status === 200) {
            setGetpost(getAllgetPost.data);
            setLink(getAllgetPost?.data?.link);
            setloading(false)
        } else {
            toast.error(getAllgetPost.message);
            setloading(false)
        }
    };

    const handlegetcomment = async () => {
        setloading(true)
        let result = await FetchPostApi(API_Path.getComment, { post_id: postid, options: getAllcommentsOption });
        let getAllgetPostcomment = await result.json();
        if (result.status === 200) {
            setGetcomment(getAllgetPostcomment?.data);
            setcommentLength(getAllgetPostcomment?.data?.totalRecord);
            setloading(false)
        } else {
            toast.error(getAllgetPostcomment.message);
            setloading(false)
        }
    };

    const removesavePost = async () => {
        let result = await FetchPostApi(API_Path.savePost, { save_post_id: postid });
        let savepost = await result.json();
        if (result.status === 200) {
            handlegetdata();
        } else {
            toast.error(savepost.message);
        }
    };

    const likePost = async (id) => {
        let data = { postid: id, liketype: "post_like" };
        let result = await FetchPostApi(API_Path.postLike, data);
        let likePost = await result.json();
        if (result.status === 200) {
            handlegetdata();
        } else {
            toast.error(likePost.message);
        }
    };

    const dislikePost = async (id, uid) => {
        let data = { postid: id, liketype: "post_like", p_id: uid };
        let result = await FetchPostApi(API_Path.postLike, data);
        let dislikePost = await result.json();
        if (result.status === 200) {
            handlegetdata();
        } else {
            toast.error(dislikePost.message);
        }
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

    const postRepost = (postId, userId) => {
        setRePost(true);
        setsendPostData({ postId: postId, userId: userId });
    };
    const closeRePostModal = () => {
        setRePost(false);
        setsendPostData("");
    };

    const closeSharePostModal = () => {
        setShareModalShow(false);
        setShortUrl("");
    };

    return (
        <>

            <div className="slider-modal-part">
                <div className="row g-0">
                    {loading ? (<div className="loading-modal">
                        <div className="loader"></div>
                    </div>
                    ) : (
                        <>
                            <div className="col-lg-6 p-0  bg-black">
                                <Slider {...settings}>
                                    {getpost?.images && getpost?.images?.length > 0 &&
                                        getpost?.images?.map((item, i) => {
                                            return (
                                                <div key={i}>
                                                    <div className="player-left-img">{item.includes(".mp4") ? <video src={item ? item : require("../../assets/images/defaultStrPic.png")} alt="error" className="img-fluid" controls /> : <img src={item ? item : require("../../assets/images/defaultStrPic.png")} alt="error" className="img-fluid" />}</div>
                                                </div>
                                            );
                                        })}
                                </Slider>
                            </div>
                            <div className="col-lg-6  bg-white p-0">
                                <div className="save-modal-right p-3">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="latest-box-prof d-flex align-items-center">
                                                <img src={getpost?.user_id?.profile_img} alt="User Profile" />
                                                <div className="ms-3 text-start">
                                                    <span>{getpost?.user_id?.name}</span>
                                                    <p>
                                                        {getpost?.user_id?.user_name}
                                                        <bdi></bdi>
                                                        {formatTimeSince(new Date(getpost?.time))}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="latest-box-rght-txt h-100">
                                                <div className="latest-box-body">
                                                    {getpost?.tag_id?.length > 0 && (
                                                        <p>
                                                            By <span>@{getpost?.tag_id?.map((tag) => tag?.name).join(", @")}</span>
                                                        </p>
                                                    )}
                                                    {/* <p>March Madness | 2022 NCAA Tournament</p> */}
                                                    <p className="latest-box-fix-content">{getpost?.description}</p>
                                                    {link !== undefined && (
                                                        <Link rel="noreferrer" target="_blank" href={link}>
                                                            <span>apnews.com</span>
                                                        </Link>
                                                    )}
                                                </div>
                                                <div className=" latest-box-ftrr d-flex align-items-center">
                                                    <span className="d-flex align-items-center">
                                                        {getpost?.likes?.[0]?.isLike === true ? (
                                                            <span className="d-flex align-items-center">
                                                                <svg width="16" height="16" className="me-2" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => dislikePost(getpost?.id, getpost?.likes[0]?.post_like[getpost?.likes[0]?.post_like?.findIndex((i) => i?.userid === user_id)]?._id)}>
                                                                    <path d="M0.255859 7.28189C0.255556 5.5423 0.966817 3.87563 2.22962 2.65689C3.49241 1.43814 5.20069 0.769679 6.97009 0.801894C9.06654 0.79095 11.067 1.6649 12.4635 3.20189C13.8601 1.6649 15.8606 0.79095 17.957 0.801894C19.7264 0.769679 21.4347 1.43814 22.6975 2.65689C23.9603 3.87563 24.6715 5.5423 24.6712 7.28189C24.6712 13.7091 16.884 18.5619 12.4635 22.4019C8.05291 18.5295 0.255859 13.7139 0.255859 7.28189Z" fill="#ED3628" />
                                                                </svg>
                                                            </span>
                                                        ) : (
                                                            <span className="d-flex align-items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="me-2 bi bi-heart" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" onClick={() => likePost(getpost?.id)}>
                                                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                                </svg>
                                                            </span>
                                                        )}
                                                        {getpost?.likes && <bdi>{getpost?.likes[0]?.postCount}</bdi>}
                                                    </span>
                                                    <span className="ps-4">{commentLength ? commentLength + " Comments" : "0 Comment"}</span>
                                                    <div className="ms-auto">
                                                        <button type="button" className="eye-doc border-0 p-0 bg-transparent">
                                                            <svg width="16" height="16" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => postRepost(getpost?._id)}>
                                                                <path d="M4 5H14V8L18 4L14 0V3H2V9H4V5ZM14 15H4V12L0 16L4 20V17H16V11H14V15Z" fill="#7B838A" />
                                                            </svg>
                                                        </button>
                                                        <Link href="#">
                                                            <span className="mx-2 bookmark">
                                                                {getpost.is_savepost === false && (
                                                                    <button type="button" className="eye-doc border-0 p-0 bg-transparent">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16" onClick={removesavePost}>
                                                                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                                                                        </svg>
                                                                    </button>
                                                                )}
                                                                {getpost.is_savepost && (
                                                                    <button type="button" className="eye-doc border-0 p-0 bg-transparent">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16" onClick={removesavePost}>
                                                                            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
                                                                        </svg>
                                                                    </button>
                                                                )}
                                                            </span>
                                                        </Link>
                                                        <span>
                                                            <button type="button" className="eye-doc border-0 p-0 bg-transparent">
                                                                <svg width="16" height="16" viewBox="0 0 20 21" fill="none" onClick={() => shareLink(getpost?.post_id)} xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M15.5 20.9991C14.4179 21.0116 13.3923 20.5172 12.7282 19.6628C12.0641 18.8085 11.8379 17.6926 12.117 16.6471L5.85697 13.0691C4.77525 14.0601 3.18965 14.2699 1.88746 13.5942C0.585261 12.9185 -0.156157 11.5013 0.0313367 10.0463C0.21883 8.59128 1.2953 7.40834 2.72625 7.08485C4.15719 6.76136 5.63783 7.36622 6.43297 8.59911L12.116 5.3501C12.0424 5.07229 12.0035 4.78646 12 4.4991C11.9856 2.82582 13.1478 1.37225 14.7832 1.01793C16.4186 0.663607 18.0781 1.50585 18.7576 3.03502C19.4371 4.56419 18.95 6.36033 17.5909 7.33661C16.2319 8.31289 14.3742 8.20119 13.142 7.06911L6.99097 10.5841C6.98488 10.8434 6.94863 11.1012 6.88297 11.3521L13.142 14.9291C14.2942 13.8717 16.0087 13.7084 17.3399 14.5294C18.671 15.3504 19.2946 16.9558 18.8668 18.4601C18.439 19.9644 17.0639 21.0014 15.5 20.9991ZM15.5 15.9991C14.6715 15.9991 14 16.6707 14 17.4991C14 18.3275 14.6715 18.9991 15.5 18.9991C16.3284 18.9991 17 18.3275 17 17.4991C17 16.6707 16.3284 15.9991 15.5 15.9991ZM3.49997 8.99911C2.67154 8.99911 1.99997 9.67068 1.99997 10.4991C1.99997 11.3275 2.67154 11.9991 3.49997 11.9991C4.3284 11.9991 4.99997 11.3275 4.99997 10.4991C4.99997 9.67068 4.3284 8.99911 3.49997 8.99911ZM15.5 2.9991C14.6715 2.9991 14 3.67068 14 4.4991C14 5.32753 14.6715 5.9991 15.5 5.9991C16.3284 5.9991 17 5.32753 17 4.4991C17 3.67068 16.3284 2.9991 15.5 2.9991Z" fill="#7B838A" />
                                                                </svg>
                                                            </button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="like-modal-body save-modal-class getcomment-area p-3">
                                    <ul>
                                        {getcomment?.data?.length > 0 &&
                                            getcomment?.data?.map((item, i) => {
                                                return (
                                                    <li key={i}>
                                                        <div className="d-flex align-items-center">
                                                            <div>
                                                                <img src={item?.userdata?.profile_img ? item?.userdata?.profile_img : "../../assets/images/defaultProPic.png"} alt="User Profile" />
                                                            </div>
                                                            <div className="play-cust-width">
                                                                <div className="ms-3 d-flex align-items-center">
                                                                    <p className="mb-0">
                                                                        <span>{item?.userdata?.name}</span>
                                                                        {"  " + item?.description}
                                                                    </p>
                                                                    <div className="ms-3 latest-box-prof ms-auto">
                                                                        <Dropdown drop="left" autoClose="outside">
                                                                            <Dropdown.Toggle className="table-dropdown-btn " id="dropdown-basic">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#333333" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                                                </svg>
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu>
                                                                                <Dropdown.Item>
                                                                                    <span>Edit</span>
                                                                                </Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                                <div className="d-sm-flex align-items-center ms-3">
                                                                    <div className="me-4 d-flex align-items-center my-1 my-sm-0">
                                                                        <i className="bi bi-heart pe-2"></i>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="me-2 bi bi-heart" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                                        </svg>
                                                                        <bdi>{item?.likedata?.length}</bdi>
                                                                        <div className="ms-4">
                                                                            <p className="mb-0">
                                                                                <span>Reply</span>
                                                                                <bdi className="ms-2">1</bdi>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="ms-sm-auto">
                                                                        <p className="mb-0 report-date">
                                                                            <span>{formatDate(new Date(item.date))}</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        <div className="col-md-12 text-center my-3">
                                            {getcomment?.data && getcomment?.data?.length > 0 && getcomment?.totalRecord > getAllcommentsOption.sizePerPage &&
                                                <button className="pagination-button load-more-btn-cust py-1 px-2" type='button' onClick={() => setgetAllcommentsOption({ ...getAllcommentsOption, sizePerPage: getAllcommentsOption.sizePerPage + 8 })} >{loading ? "Loading..." : "Load More"}</button>}
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {/* =============== RePost Modal ============== */}
            {rePost && (
                <Modal backdrop="static" show={rePost} onHide={() => closeRePostModal()} size="lg" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton className="border-bottom">
                        <div className="text-center modal-data">
                            <span>Repost</span>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <RePostModal sendPostData={sendPostData} setRePost={setRePost} />
                    </Modal.Body>
                </Modal>
            )}
            {/* =============== Share Modal ============== */}
            {sharemodalShow && (
                <Modal backdrop="static" show={sharemodalShow} onHide={() => closeSharePostModal()} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
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
        </>
    )
}
