import React, { useState, useEffect } from 'react'

export default function VerifyOtpModal(props) {

    const { tempObj, varifyBycontect, varifyByEmail, phoneNumber, newEmail } = props;
    const [temp, setTemp] = useState({});

    useEffect(() => {
        setTemp(tempObj);
    }, [props])

    return (
        <div className="text-center modal-data px-5">
            <span>Verify using OTP</span>
            <p>Select which contact details should we use to verify your Contact Number or Email address :</p>
            <div className="modal-in-box mb-3" onClick={() => varifyBycontect()}>
                <div className="d-flex align-items-center">
                    <div className="me-3">
                        <svg width="21" height="32" viewBox="0 0 21 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.729 31.5834H3.56234C1.99753 31.5834 0.729004 30.3148 0.729004 28.75V3.25002C0.729004 1.68521 1.99753 0.416687 3.56234 0.416687H17.729C19.2938 0.416687 20.5623 1.68521 20.5623 3.25002V28.75C20.5623 30.3148 19.2938 31.5834 17.729 31.5834ZM3.56234 3.25002V28.75H17.729V3.25002H3.56234ZM10.6457 27.3334C9.86327 27.3334 9.229 26.6991 9.229 25.9167C9.229 25.1343 9.86327 24.5 10.6457 24.5C11.4281 24.5 12.0623 25.1343 12.0623 25.9167C12.0623 26.6991 11.4281 27.3334 10.6457 27.3334Z" fill="url(#paint0_linear_2138_26)" />
                            <defs>
                                <linearGradient id="paint0_linear_2138_26" x1="1.52957" y1="6.9827" x2="23.4881" y2="9.49476" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#6A58FB" />
                                    <stop offset="1" stopColor="#4599F4" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="box-in-info text-start">
                        <span className="d-block">Via SMS</span>
                        <p>{phoneNumber(temp.contact_no)}</p>
                    </div>
                </div>
            </div>
            <div className="modal-in-box mb-3" onClick={() => varifyByEmail()}>
                <div className="d-flex align-items-center">
                    <div className="me-3">
                        <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.3335 23.3334H3.66683C2.10202 23.3334 0.833496 22.0648 0.833496 20.5V3.37677C0.899525 1.8603 2.14892 0.665253 3.66683 0.666688H26.3335C27.8983 0.666688 29.1668 1.93522 29.1668 3.50002V20.5C29.1668 22.0648 27.8983 23.3334 26.3335 23.3334ZM3.66683 6.14636V20.5H26.3335V6.14636L15.0002 13.7L3.66683 6.14636ZM4.80016 3.50002L15.0002 10.3L25.2002 3.50002H4.80016Z" fill="url(#paint0_linear_2138_1099)" />
                            <defs>
                                <linearGradient id="paint0_linear_2138_1099" x1="1.97716" y1="5.44197" x2="32.2295" y2="12.2401" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#6A58FB" />
                                    <stop offset="1" stopColor="#4599F4" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="box-in-info text-start">
                        <span className="d-block">Via Email</span>
                        <p>{newEmail(temp.email)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
