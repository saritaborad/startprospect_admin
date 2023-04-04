import React, { useState, useEffect } from 'react'

export default function MarketDealsTab(props) {

    const { socialData } = props;
    const [social, setSocial] = useState([]);

    useEffect(() => {
        setSocial(socialData);
    }, [props])

    return (
        <>
            <div className="social-media-platform">
                <div className="row p-3 mt-3">
                    <div className="text-start">
                        <h6>Social Media Platforms</h6>
                    </div>
                    <div className="col-md-6">
                        {social.platforms?.length > 0 ? (
                            social.platforms.slice(0, 3).map((item, i) => {
                                return (
                                    <div className="d-flex align-items-center mt-3" key={i}>
                                        <div>
                                            {item.name == 1 && <img src="../../assets/images/instagram-icon.png" className="img-fluid" alt="" />}
                                            {item.name == 2 && <img src="../../assets/images/Facebook-icon.png" className="img-fluid" alt="" />}
                                            {item.name == 3 && <img src="../../assets/images/YouTube-icon.png" className="img-fluid" alt="" />}
                                            {item.name == 4 && <img src="../../assets/images/linkedin_icon.png" className="img-fluid" alt="" />}
                                            {item.name == 5 && <img src="../../assets/images/twitter-icon.png" className="img-fluid" alt="" />}
                                            {item.name == 7 && <img src="../../assets/images/Tik-Tok-icon.png" className="img-fluid" alt="" />}
                                            <span>{item?.activity.map((a) => a).join(" | ")}</span>
                                        </div>
                                        <bdi className="ms-auto">{item?.amount && "$" + item?.amount}</bdi>
                                    </div>
                                );
                            })
                        ) : (
                            <div className='text-start mt-3'> Social media platforms is not available</div>
                        )}
                    </div>
                    <div className="col-md-6">
                        {social.platforms?.length > 0 &&
                            social.platforms.slice(3).map((item, i) => {
                                return (
                                    <div className="d-flex align-items-center mt-3" key={i}>
                                        <div>
                                            {item.name == 1 && <img src="../../assets/images/instagram-icon.png" className="img-fluid" alt="" />}
                                            {item.name == 2 && <img src="../../assets/images/Facebook-icon.png" className="img-fluid" alt="" />}
                                            {item.name == 3 && <img src="../../assets/images/YouTube-icon.png" className="img-fluid" alt="" />}
                                            {item.name == 4 && <img src="../../assets/images/linkedin_icon.png" className="img-fluid" alt="" />}
                                            {item.name == 5 && <img src="../../assets/images/twitter-icon.png" className="img-fluid" alt="" />}
                                            {item.name == 7 && <img src="../../assets/images/Tik-Tok-icon.png" className="img-fluid" alt="" />}
                                            <span>{item?.activity.map((a) => a).join(" | ")}</span>
                                        </div>
                                        <bdi className="ms-auto">{item?.amount && "$" + item?.amount}</bdi>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
            <div className="categori-main mt-3 p-3">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="text-start">
                            <h6>Niche</h6>
                        </div>
                        <div className="category-inner-div text-start">
                            {social.niche?.length > 0 ? (
                                social.niche.map((item, i) => {
                                    return <span key={i}>{item}</span>;
                                })
                            ) : (
                                <div> Niche is not available</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
