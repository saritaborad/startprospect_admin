import React, { useState, useEffect } from 'react'

export default function MarketReviewModal(props) {

    const { ReviewDetails, optionReview, loading, setOptionReview } = props;
    const [review, setReview] = useState({})
    const [option, setOption] = useState({})
    const [load, setLoad] = useState();

    useEffect(() => {
        setReview(ReviewDetails);
        setOption(optionReview);
        setLoad(loading)
    }, [props])


    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);
        return formattedDate;
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="review-modal-body">
                    <div className="total-review-div p-3">
                        <h6>{review?.overall_avg_rating}</h6>
                        <span className="d-block mb-2">
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <button type="button" key={index}>
                                        <span className={index <= review?.overall_avg_rating ? "on" : "off"}>
                                            <h2>&#9733;</h2>
                                        </span>
                                    </button>
                                );
                            })}
                        </span>
                        <bdi>Total: {review?.total_reviews} Reviews</bdi>
                    </div>
                    <ul>
                        {review?.data?.map((review, i) => {
                            return (
                                <li key={i}>
                                    <div className="d-flex align-items-center mb-2">
                                        <img className="review_profile_img" src={review?.user_data?.profile_img ? review.user_data.profile_img : "../assets/images/defaultProPic.png"} alt="" />
                                        <div className="ms-3">
                                            <span className="d-block">{review?.user_data?.name}</span>
                                            <span>
                                                {[...Array(5)].map((star, index) => {
                                                    index += 1;
                                                    return (
                                                        <button type="button" key={index}>
                                                            <span className={index <= review?.star ? "on" : "off"}>
                                                                <h6>&#9733;</h6>
                                                            </span>
                                                        </button>
                                                    );
                                                })}
                                            </span>
                                        </div>
                                        <bdi className="ms-auto">{formatDate(review?.createdAt)}</bdi>
                                    </div>
                                    <p>{review?.opinion}</p>
                                </li>
                            );
                        })}
                        {review?.totalRecord > option.sizePerPage && (
                            <div className="text-center">
                                <button className="comn-btn-class w-auto" disabled={load} onClick={() => setOptionReview({ ...option, sizePerPage: option.sizePerPage + 2 })}>
                                    {load ? "Loading..." : "Load More"}
                                </button>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
