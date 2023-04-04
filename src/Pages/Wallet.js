import React, { useState, useContext, useEffect } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import { Tab, Nav, Modal, Collapse } from "react-bootstrap";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import StudentProfileLayout from "../Components/ProfileLayout/StudentProfileLayout";
import roleContext from "../contexts/roleContext";

export default function Wallet() {

  const context = useContext(roleContext);
  const [withdrowState, setWithdrowState] = useState({ withdraw: false });
  const [opencard, setOpenCard] = useState(false);
  const [addbank, setAddBank] = useState(false);
  const [addcase, setAddCase] = useState(false);
  const [addcard, setAddCard] = useState(false);
  const [removebank, setRemoveBank] = useState(false);
  const [addbanksuccess, setAddBankSuccess] = useState(false);
  const [signupType, setSignupType] = useState("")

  useEffect(() => {
    setSignupType(context?.signup_type)
  }, [context?.signup_type]);

  const handleWithdrowClick = (type) => {
    setWithdrowState({ [type]: true });
  };

  return (
    <MainLayout>
      <section className="gray-bg-section">
        <div className="container">
          <div className="row me-0">
            <div className="col-xl-2 col-md-3 ">
              {signupType == 4 ? <StudentProfileLayout /> : <ProfileLayout />}
            </div>
            <div className="col-xl-10 col-md-9 pe-0">
              {withdrowState.withdraw === false && (
                <>
                  <div className="my-3 mt-md-0 tabs-heading-txt">
                    <h5>Wallet</h5>
                  </div>
                  <div className="wallet-main p-3">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mywallet-class position-relative p-3">
                          <div className="star-img">
                            <img src="../assets/images/mywallet-star-img.png" alt="star" />
                          </div>
                          <p>My Walllet</p>
                          <div>
                            <span>Balance</span>
                            <bdi>$1,548</bdi>
                          </div>
                          <div className="d-flex mt-3">
                            <button className="withdraw-btn me-3" onClick={() => handleWithdrowClick("withdraw")}>
                              <span className="me-2">
                                <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M21.8751 7.58333V5.20833C21.8751 4.0625 20.9376 3.125 19.7917 3.125H5.20834C4.05209 3.125 3.125 4.0625 3.125 5.20833V19.7917C3.125 20.9375 4.05209 21.875 5.20834 21.875H19.7917C20.9376 21.875 21.8751 20.9375 21.8751 19.7917V17.4167C22.4896 17.0521 22.9167 16.3958 22.9167 15.625V9.375C22.9167 8.60417 22.4896 7.94792 21.8751 7.58333ZM20.8334 9.375V15.625H13.5417V9.375H20.8334ZM5.20834 19.7917V5.20833H19.7917V7.29167H13.5417C12.3959 7.29167 11.4584 8.22917 11.4584 9.375V15.625C11.4584 16.7708 12.3959 17.7083 13.5417 17.7083H19.7917V19.7917H5.20834Z" fill="#333333" />
                                  <path d="M16.6667 14.0625C17.5297 14.0625 18.2292 13.3629 18.2292 12.5C18.2292 11.6371 17.5297 10.9375 16.6667 10.9375C15.8038 10.9375 15.1042 11.6371 15.1042 12.5C15.1042 13.3629 15.8038 14.0625 16.6667 14.0625Z" fill="#333333" />
                                </svg>
                              </span>
                              Withdraw
                            </button>
                            <button className="withdraw-btn" onClick={() => setAddCase(true)}>
                              <span className="me-2">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M7 0C7.55228 0 8 0.447715 8 1V6H13C13.5523 6 14 6.44772 14 7C14 7.55228 13.5523 8 13 8H8V13C8 13.5523 7.55228 14 7 14C6.44772 14 6 13.5523 6 13V8H1C0.447715 8 0 7.55228 0 7C0 6.44771 0.447715 6 1 6L6 6V1C6 0.447715 6.44772 0 7 0Z" fill="#111827" />
                                </svg>
                              </span>
                              Add Cash
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 card-heading">
                          <div className="row">
                            <div className="col-12">
                              <Tab.Container id="left-tabs-example" defaultActiveKey="creditcard">
                                <div className="payment-detail">
                                  <Nav variant="tabs" className="">
                                    <Nav.Item className="d-flex mx-auto">
                                      <Nav.Link eventKey="creditcard">Credit Cards</Nav.Link>
                                      <Nav.Link eventKey="bankaccount">Bank Accounts</Nav.Link>
                                    </Nav.Item>
                                  </Nav>
                                </div>
                                <Tab.Content>
                                  <Tab.Pane eventKey="creditcard">
                                    <div className="cust-radio-box d-flex align-items-center mt-3">
                                      <input name="cc" type="radio" id="creditcard-1" />
                                      <label className="cust-radio-main w-100 card-1" htmlFor="creditcard-1">
                                        <div className="d-flex align-items-center">
                                          <div>
                                            <img src="../assets/images/visa.png" alt="" />
                                          </div>
                                          <div className="ms-3">
                                            <span>Bank Of America</span>
                                            <p className="mb-0 mt-1">Visa Card - XXX02362</p>
                                          </div>
                                        </div>
                                      </label>
                                    </div>
                                    <div className="cust-radio-box d-flex align-items-center mt-3">
                                      <input name="cc" type="radio" id="creditcard-2" />
                                      <label className="cust-radio-main w-100 card-1" htmlFor="creditcard-2">
                                        <div className="d-flex align-items-center">
                                          <div>
                                            <img src="../assets/images/visa.png" alt="" />
                                          </div>
                                          <div className="ms-3">
                                            <span>Bank Of America</span>
                                            <p className="mb-0 mt-1">Visa Card - XXX02362</p>
                                          </div>
                                        </div>
                                      </label>
                                    </div>
                                    <div>
                                      <button className="comn-white-btn mt-3" data="Edit Credit Card" onClick={() => setAddCard(true)}>
                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M0.5 12.375V15.5H3.625L12.8417 6.28333L9.71667 3.15833L0.5 12.375ZM2.93333 13.8333H2.16667V13.0667L9.71667 5.51667L10.4833 6.28333L2.93333 13.8333ZM15.2583 2.69167L13.3083 0.741667C13.1417 0.575 12.9333 0.5 12.7167 0.5C12.5 0.5 12.2917 0.583333 12.1333 0.741667L10.6083 2.26667L13.7333 5.39167L15.2583 3.86667C15.5833 3.54167 15.5833 3.01667 15.2583 2.69167Z" fill="#2F80ED" />
                                        </svg>
                                      </button>
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane eventKey="bankaccount">
                                    <div className="cust-radio-box d-flex align-items-center mt-3">
                                      <input name="ba" type="radio" id="bankaccount-1" />
                                      <label className="cust-radio-main w-100 card-1" htmlFor="bankaccount-1">
                                        <div className="d-flex align-items-center">
                                          <div>
                                            <img src="../assets/images/bank-america.png" alt="" />
                                          </div>
                                          <div className="ms-3">
                                            <span>Bank Of America</span>
                                            <p className="mb-0 mt-1">Visa Card - XXX02362</p>
                                          </div>
                                          <div className="ms-auto" onClick={() => setRemoveBank(true)}>
                                            <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M14 20.9688H4C2.89543 20.9688 2 20.0733 2 18.9688V5.96875H0V3.96875H4V2.96875C4 1.86418 4.89543 0.96875 6 0.96875H12C13.1046 0.96875 14 1.86418 14 2.96875V3.96875H18V5.96875H16V18.9688C16 20.0733 15.1046 20.9688 14 20.9688ZM4 5.96875V18.9688H14V5.96875H4ZM6 2.96875V3.96875H12V2.96875H6ZM12 16.9688H10V7.96875H12V16.9688ZM8 16.9688H6V7.96875H8V16.9688Z" fill="#D24944" />
                                            </svg>
                                          </div>
                                        </div>
                                      </label>
                                    </div>
                                    <div className="cust-radio-box d-flex align-items-center mt-3">
                                      <input name="ba" type="radio" id="bankaccount-2" />
                                      <label className="cust-radio-main w-100 card-1" htmlFor="bankaccount-2">
                                        <div className="d-flex align-items-center">
                                          <div>
                                            <img src="../assets/images/bank-america.png" alt="" />
                                          </div>
                                          <div className="ms-3">
                                            <span>Bank Of America</span>
                                            <p className="mb-0 mt-1">Visa Card - XXX02362</p>
                                          </div>
                                          <div className="ms-auto" onClick={() => setRemoveBank(true)}>
                                            <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M14 20.9688H4C2.89543 20.9688 2 20.0733 2 18.9688V5.96875H0V3.96875H4V2.96875C4 1.86418 4.89543 0.96875 6 0.96875H12C13.1046 0.96875 14 1.86418 14 2.96875V3.96875H18V5.96875H16V18.9688C16 20.0733 15.1046 20.9688 14 20.9688ZM4 5.96875V18.9688H14V5.96875H4ZM6 2.96875V3.96875H12V2.96875H6ZM12 16.9688H10V7.96875H12V16.9688ZM8 16.9688H6V7.96875H8V16.9688Z" fill="#D24944" />
                                            </svg>
                                          </div>
                                        </div>
                                      </label>
                                    </div>
                                    <div>
                                      <button className="comn-white-btn mt-3" data="Add Bank" onClick={() => setAddBank(true)}>
                                        <svg width="14" height="14" viewBox="0 0 14 15" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                                          <path fillRule="evenodd" clipRule="evenodd" d="M7 0.984375C7.55228 0.984375 8 1.43209 8 1.98438V6.98438H13C13.5523 6.98438 14 7.43209 14 7.98438C14 8.53666 13.5523 8.98438 13 8.98438H8V13.9844C8 14.5367 7.55228 14.9844 7 14.9844C6.44772 14.9844 6 14.5367 6 13.9844V8.98438H1C0.447715 8.98438 0 8.53666 0 7.98437C0 7.43209 0.447715 6.98437 1 6.98437L6 6.98438V1.98438C6 1.43209 6.44772 0.984375 7 0.984375Z" fill="url(#paint0_linear_5213_30276)" />
                                          <defs>
                                            <linearGradient id="paint0_linear_5213_30276" x1="0.565104" y1="3.93381" x2="15.7765" y2="6.66839" gradientUnits="userSpaceOnUse">
                                              <stop stopColor="#6A58FB" />
                                              <stop offset="1" stopColor="#4599F4" />
                                            </linearGradient>
                                          </defs>
                                        </svg>
                                      </button>
                                    </div>
                                  </Tab.Pane>
                                </Tab.Content>
                              </Tab.Container>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 mt-3 mt-lg-0">
                        <div className="d-flex transation-class">
                          <span>Trasaction History</span>
                          <span className="ms-auto">
                            <select type="from-select border-0">
                              <option>Added</option>
                              <option>Withdraw</option>
                            </select>
                          </span>
                        </div>
                        <div className="history-div d-flex align-items-center justify-content-between mt-3 p-3">
                          <div className="d-flex align-items-center">
                            <span className="dollar-img">
                              <img src="../assets/images/dollar-tran-icn.svg" alt="" className="img-fluid" />
                            </span>
                            <div className="history-txt ms-3">
                              <span>Added from Bank XX0952</span>
                              <bdi className="d-block">+$160.00</bdi>
                            </div>
                          </div>
                          <div className="ms-sm-3 hist-date-txt">1 Jan 2020</div>
                        </div>
                        <div className="history-div d-flex align-items-center justify-content-between mt-3 p-3">
                          <div className="d-flex align-items-center">
                            <span className="dollar-img">
                              <img src="../assets/images/dollar-tran-icn.svg" alt="" className="img-fluid" />
                            </span>
                            <div className="history-txt ms-3">
                              <span>Added from Bank XX0952</span>
                              <bdi className="d-block">+$160.00</bdi>
                            </div>
                          </div>
                          <div className="ms-sm-3 hist-date-txt">1 Jan 2020</div>
                        </div>
                        <div className="history-div d-flex align-items-center justify-content-between mt-3 p-3">
                          <div className="d-flex align-items-center">
                            <span className="dollar-img">
                              <img src="../assets/images/dollar-tran-icn.svg" alt="" className="img-fluid" />
                            </span>
                            <div className="history-txt ms-3">
                              <span>Added from Bank XX0952</span>
                              <bdi className="d-block">+$160.00</bdi>
                            </div>
                          </div>
                          <div className="ms-sm-3 hist-date-txt">1 Jan 2020</div>
                        </div>
                        <div className="history-div d-flex align-items-center justify-content-between mt-3 p-3">
                          <div className="d-flex align-items-center">
                            <span className="dollar-img">
                              <img src="../assets/images/dollar-tran-icn.svg" alt="" className="img-fluid" />
                            </span>
                            <div className="history-txt ms-3">
                              <span>Added from Bank XX0952</span>
                              <bdi className="d-block">+$160.00</bdi>
                            </div>
                          </div>
                          <div className="ms-sm-3 hist-date-txt">1 Jan 2020</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {/*  =================== Withdraw Page ================ */}
              {withdrowState.withdraw && (
                <>
                  <div className="mb-3 mt-3 mt-md-0 tabs-heading-txt">
                    <h5>Wallet</h5>
                  </div>
                  <div className="wallet-main p-3">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="mywallet-class position-relative p-3">
                          <div className="star-img">
                            <img src="../assets/images/mywallet-star-img.png" alt="star" />
                          </div>
                          <p>My Walllet</p>
                          <div className="mt-5">
                            <span>Withdrawable Balance</span>
                            <bdi>$1,000</bdi>
                          </div>
                          <div className="d-flex align-items-center mt-3">
                            <span>View brackdown</span>
                            <span className="ms-2">
                              <svg width="16" height="16" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6667 1.16602L16.5 6.99935M16.5 6.99935L10.6667 12.8327M16.5 6.99935L1.5 6.99935" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <label className="comn-label-class">Enter Amount</label>
                          <input type="tel" placeholder="Enter Amount" className="form-control comn-input-style ps-3 pe-5" />
                        </div>
                        <div className="mt-3">
                          <label className="comn-label-class">Select Bank</label>
                          <div className="cust-radio-box d-flex align-items-center">
                            <input name="ba" type="radio" id="bankaccount-1" />
                            <label className="cust-radio-main w-100 card-1" htmlFor="bankaccount-1">
                              <div className="d-flex align-items-center">
                                <div>
                                  <img src="../assets/images/bank-america.png" alt="" />
                                </div>
                                <div className="ms-3">
                                  <span>Bank Of America</span>
                                  <p className="mb-0 mt-1">Visa Card - XXX02362</p>
                                </div>
                                <div className="ms-auto" onClick={() => setRemoveBank(true)}>
                                  <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 20.9688H4C2.89543 20.9688 2 20.0733 2 18.9688V5.96875H0V3.96875H4V2.96875C4 1.86418 4.89543 0.96875 6 0.96875H12C13.1046 0.96875 14 1.86418 14 2.96875V3.96875H18V5.96875H16V18.9688C16 20.0733 15.1046 20.9688 14 20.9688ZM4 5.96875V18.9688H14V5.96875H4ZM6 2.96875V3.96875H12V2.96875H6ZM12 16.9688H10V7.96875H12V16.9688ZM8 16.9688H6V7.96875H8V16.9688Z" fill="#D24944" />
                                  </svg>
                                </div>
                              </div>
                            </label>
                          </div>
                          <div className="cust-radio-box d-flex align-items-center mt-3">
                            <input name="ba" type="radio" id="bankaccount-2" />
                            <label className="cust-radio-main w-100 card-1" htmlFor="bankaccount-2">
                              <div className="d-flex align-items-center">
                                <div>
                                  <img src="../assets/images/bank-america.png" alt="" />
                                </div>
                                <div className="ms-3">
                                  <span>Bank Of America</span>
                                  <p className="mb-0 mt-1">Visa Card - XXX02362</p>
                                </div>
                                <div className="ms-auto" onClick={() => setRemoveBank(true)}>
                                  <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 20.9688H4C2.89543 20.9688 2 20.0733 2 18.9688V5.96875H0V3.96875H4V2.96875C4 1.86418 4.89543 0.96875 6 0.96875H12C13.1046 0.96875 14 1.86418 14 2.96875V3.96875H18V5.96875H16V18.9688C16 20.0733 15.1046 20.9688 14 20.9688ZM4 5.96875V18.9688H14V5.96875H4ZM6 2.96875V3.96875H12V2.96875H6ZM12 16.9688H10V7.96875H12V16.9688ZM8 16.9688H6V7.96875H8V16.9688Z" fill="#D24944" />
                                  </svg>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                        <div>
                          <button className="comn-white-btn mt-3" data="Add Bank" onClick={() => setAddBank(true)}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="me-2" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.5 12.375V15.5H3.625L12.8417 6.28333L9.71667 3.15833L0.5 12.375ZM2.93333 13.8333H2.16667V13.0667L9.71667 5.51667L10.4833 6.28333L2.93333 13.8333ZM15.2583 2.69167L13.3083 0.741667C13.1417 0.575 12.9333 0.5 12.7167 0.5C12.5 0.5 12.2917 0.583333 12.1333 0.741667L10.6083 2.26667L13.7333 5.39167L15.2583 3.86667C15.5833 3.54167 15.5833 3.01667 15.2583 2.69167Z" fill="#2F80ED" />
                            </svg>
                          </button>
                        </div>
                        <button
                          className="comn-btn-class-darkgray w-100 mt-5"
                          onClick={() => {
                            setWithdrowState({
                              ...withdrowState,
                              withdraw: false,
                            });
                          }}
                        >
                          <span className="me-2">
                            <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M21.8751 7.58333V5.20833C21.8751 4.0625 20.9376 3.125 19.7917 3.125H5.20834C4.05209 3.125 3.125 4.0625 3.125 5.20833V19.7917C3.125 20.9375 4.05209 21.875 5.20834 21.875H19.7917C20.9376 21.875 21.8751 20.9375 21.8751 19.7917V17.4167C22.4896 17.0521 22.9167 16.3958 22.9167 15.625V9.375C22.9167 8.60417 22.4896 7.94792 21.8751 7.58333ZM20.8334 9.375V15.625H13.5417V9.375H20.8334ZM5.20834 19.7917V5.20833H19.7917V7.29167H13.5417C12.3959 7.29167 11.4584 8.22917 11.4584 9.375V15.625C11.4584 16.7708 12.3959 17.7083 13.5417 17.7083H19.7917V19.7917H5.20834Z" fill="#fff" />
                              <path d="M16.6667 14.0625C17.5297 14.0625 18.2292 13.3629 18.2292 12.5C18.2292 11.6371 17.5297 10.9375 16.6667 10.9375C15.8038 10.9375 15.1042 11.6371 15.1042 12.5C15.1042 13.3629 15.8038 14.0625 16.6667 14.0625Z" fill="#fff" />
                            </svg>
                          </span>
                          Withdraw
                        </button>
                      </div>
                      <div className="col-lg-6 mt-3 mt-lg-0">
                        <div className="d-flex transation-class">
                          <span>Trasaction History</span>
                          <span className="ms-auto">
                            <select type="from-select border-0">
                              <option>Added</option>
                              <option>Withdraw</option>
                            </select>
                          </span>
                        </div>
                        <div className="history-div d-flex align-items-center justify-content-between mt-3 p-3">
                          <div className="d-flex align-items-center">
                            <span className="dollar-img">
                              <img src="../assets/images/dollar-tran-icn.svg" alt="" className="img-fluid" />
                            </span>
                            <div className="history-txt ms-3">
                              <span>Added from Bank XX0952</span>
                              <bdi className="d-block">+$160.00</bdi>
                            </div>
                          </div>
                          <div className="ms-sm-3 hist-date-txt">1 Jan 2020</div>
                        </div>
                        <div className="history-div d-flex align-items-center justify-content-between mt-3 p-3">
                          <div className="d-flex align-items-center">
                            <span className="dollar-img">
                              <img src="../assets/images/dollar-tran-icn.svg" alt="" className="img-fluid" />
                            </span>
                            <div className="history-txt ms-3">
                              <span>Added from Bank XX0952</span>
                              <bdi className="d-block">+$160.00</bdi>
                            </div>
                          </div>
                          <div className="ms-sm-3 hist-date-txt">1 Jan 2020</div>
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

      {/* ===============  Add Bank ============= */}

      {addbank && (
        <Modal show={addbank} onHide={() => setAddBank(false)} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton className="mt-2">
            <div className="add-modal-hdr mx-auto">
              <p>Add Bank Account</p>
            </div>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <div className="row">
              <div className="col-12">
                <div className="add-bank-detail">
                  <div>
                    <label className="comn-label-class">Bank Name</label>
                    <bdi className="d-block position-relative">
                      <select className="form-select comn-input-style ps-3 pe-5">
                        <option>Choose Bank</option>
                        <option>HDFC BANK</option>
                      </select>
                    </bdi>
                  </div>
                  <div className="mt-3">
                    <label className="comn-label-class">Account Type</label>
                    <bdi className="d-block position-relative">
                      <select className="form-select comn-input-style ps-3 pe-5">
                        <option>Choose Account type</option>
                        <option>Saving Account</option>
                      </select>
                    </bdi>
                  </div>
                  <div className="mt-3">
                    <label className="comn-label-class">Account Holder Name</label>
                    <input type="text" placeholder="Enter Account Holder Name" className="form-control comn-input-style ps-3 pe-5" />
                  </div>
                  <div className="mt-3">
                    <label className="comn-label-class">Account Number</label>
                    <input type="tel" placeholder="Enter Account Number" className="form-control comn-input-style ps-3 pe-5" />
                  </div>
                  <div className="mt-3">
                    <button className="comn-btn-class mt-3" onClick={() => setAddBankSuccess(true) || setAddBank(false)}>
                      Add Bank
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {/* =============  Add credit-card ================== */}
      {addcard && (
        <Modal show={addcard} onHide={() => setAddCard(false)} size="md" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton className="mt-2">
            <div className="add-modal-hdr mx-auto">
              <p>Add Credit Card</p>
            </div>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <div className="row me-0">
              <div className="col-12 mb-3 mt-3 pe-0">
                <label className="comn-label-class">Card Number</label>
                <bdi className="d-block position-relative">
                  <input type="tel" className="form-control comn-input-style ps-3" placeholder="Enter Card Number" />
                  <span className="showpwd-class bg-transparent" id="show_pwd">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.89543 0 2 0H18C19.1046 0 20 0.89543 20 2V14C20 15.1046 19.1046 16 18 16ZM2 8V14H18V8H2ZM2 2V4H18V2H2ZM11 12H4V10H11V12Z" fill="#7B838A" />
                    </svg>
                  </span>
                </bdi>
              </div>
              <div className="col-xl-6 col-lg-12 col-sm-6 mb-3 pe-0">
                <label className="comn-label-class">Month & Years</label>
                <input className="form-control comn-input-style ps-3" type="month" />
              </div>
              <div className="col-xl-6 col-lg-12 col-sm-6 mb-3 pe-0">
                <label className="comn-label-class">CVC Number</label>
                <input className="form-control comn-input-style ps-3" type="tel" placeholder="CVV" />
              </div>
              <div className="col-12 mb-3 pe-0">
                <label className="comn-label-class">Postal code</label>
                <input className="form-control comn-input-style ps-3" type="tel" placeholder="Postal Code" />
              </div>
              <div className="col-12 pe-0">
                <button className="comn-btn-class mt-3">Add Bank</button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {/* ===============  Remove Bank ============= */}
      {removebank && (
        <Modal show={removebank} onHide={() => setRemoveBank(false)} size="sm" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton className="mt-2"></Modal.Header>
          <Modal.Body className="pt-0">
            <div className="row">
              <div className="col-12 mx-auto">
                <div className="remove-modal-main text-center">
                  <div className="mb-3">
                    <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M28 15.5V40.5H8V15.5H28ZM24.25 0.5H11.75L9.25 3H0.5V8H35.5V3H26.75L24.25 0.5ZM33 10.5H3V40.5C3 43.25 5.25 45.5 8 45.5H28C30.75 45.5 33 43.25 33 40.5V10.5Z" fill="#EB5757" />
                    </svg>
                  </div>
                  <span>Do you Want to remove your account ?</span>
                  <bdi>Lorem Ipsum Lorem Ipsum Lorem</bdi>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="d-sm-flex">
                  <button type="btn" className="comn-btn-class-lightgray w-100">
                    Cancel
                  </button>
                  <button type="btn" className="remove-btn ms-sm-3 w-100 mt-3 mt-sm-0">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {/* ===============  Add Bank  Success ============= */}
      {addbanksuccess && (
        <Modal show={addbanksuccess} onHide={() => setAddBankSuccess(false)} size="sm" className="comn-modal-style" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton className="mt-2"></Modal.Header>
          <Modal.Body className="pt-0">
            <div className="row">
              <div className="col-12 mx-auto">
                <div className="remove-modal-main text-center">
                  <div className="mb-3">
                    <svg width="59" height="35" viewBox="0 0 59 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M43.9984 4.49961L40.4734 0.974609L24.6234 16.8246L28.1484 20.3496L43.9984 4.49961ZM54.5984 0.974609L28.1484 27.4246L17.6984 16.9996L14.1734 20.5246L28.1484 34.4996L58.1484 4.49961L54.5984 0.974609ZM0.0234375 20.5246L13.9984 34.4996L17.5234 30.9746L3.57344 16.9996L0.0234375 20.5246Z" fill="url(#paint0_linear_5325_29856)" />
                      <defs>
                        <linearGradient id="paint0_linear_5325_29856" x1="2.36963" y1="8.03746" x2="61.7925" y2="26.5586" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#6A58FB" />
                          <stop offset="1" stopColor="#4599F4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <span>Account Added Successfully</span>
                  <bdi>Lorem Ipsum Lorem Ipsum Lorem</bdi>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="">
                  <button type="btn" className="comn-btn-class mt-3">
                    Done
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {/* ===============  Add Case modal ============= */}
      {addcase && (
        <Modal show={addcase} onHide={() => setAddCase(false)} size="md" className="donate-modal-style comn-modal-style" centered>
          <Modal.Header closeButton className="border-0 pb-0">
            <div className="modal-data">
              <span className="mb-0">Donation</span>
            </div>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <div className="row">
              <div className="col-12">
                <div className="payment-main-sec">
                  <div className="mb-3">
                    <ul className="row me-0">
                      <li className="col-4 pe-0">
                        <div>
                          <label className="cust-radio-btn p-0">
                            <input type="radio" name="donate" />
                            <span className="cust-chkbox-soc hobby-checkbx">$5.00</span>
                          </label>
                        </div>
                      </li>
                      <li className="col-4 pe-0">
                        <div>
                          <label className="cust-radio-btn p-0">
                            <input type="radio" name="donate" />
                            <span className="cust-chkbox-soc hobby-checkbx">$25.00</span>
                          </label>
                        </div>
                      </li>
                      <li className="col-4 pe-0">
                        <div>
                          <label className="cust-radio-btn p-0">
                            <input type="radio" name="donate" />
                            <span className="cust-chkbox-soc hobby-checkbx">$50.00</span>
                          </label>
                        </div>
                      </li>
                      <li className="col-4 pe-0">
                        <div>
                          <label className="cust-radio-btn p-0">
                            <input type="radio" name="donate" />
                            <span className="cust-chkbox-soc hobby-checkbx">$100.00</span>
                          </label>
                        </div>
                      </li>
                      <li className="col-4 pe-0">
                        <div>
                          <label className="cust-radio-btn p-0">
                            <input type="radio" name="donate" />
                            <span className="cust-chkbox-soc hobby-checkbx">$500.00</span>
                          </label>
                        </div>
                      </li>
                      <li className="col-4 pe-0">
                        <div>
                          <label className="cust-radio-btn p-0">
                            <input type="radio" name="donate" defaultChecked />
                            <span className="cust-chkbox-soc hobby-checkbx">Custom</span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-3">
                    <bdi className="d-block position-relative">
                      <input type="tel" className="form-control comn-input-style ps-3" placeholder="$1200.00" />
                    </bdi>
                  </div>
                  <div className="comnn-white-back-bg-box p-0">
                    <form className="row">
                      <div className="col-12 mb-3">
                        <div className="cust-radio-div ">
                          <div className="form-check mb-2">
                            <input className="form-check-input" type="radio" name="payment" id="paypal" defaultChecked onClick={() => setOpenCard(false)} />
                            <label className="form-check-label ms-2" htmlFor="paypal">
                              <div className="d-flex flex-column payment-class">
                                <span>
                                  <img src="../assets/images/paypal.svg" alt="" />
                                </span>
                                <bdi>You’ll be redirected to paypal.com</bdi>
                              </div>
                            </label>
                          </div>
                          <div className="form-check mb-2">
                            <input className="form-check-input" type="radio" name="payment" id="gpay" onClick={() => setOpenCard(false)} />
                            <label className="form-check-label ms-2" htmlFor="gpay">
                              <div className="d-flex flex-column payment-class">
                                <span>
                                  <img src="../assets/images/google-pay-img.svg" alt="" />
                                </span>
                                <bdi>You’ll be redirected to googlepay.com</bdi>
                              </div>
                            </label>
                          </div>
                          <div className="form-check mb-2">
                            <input className="form-check-input" type="radio" name="payment" id="applepay" onClick={() => setOpenCard(false)} />
                            <label className="form-check-label ms-2" htmlFor="applepay">
                              <div className="d-flex flex-column payment-class">
                                <span>
                                  <img src="../assets/images/apple-pay-img.svg" alt="" />
                                </span>
                                <bdi>You’ll be redirected to applepay.com</bdi>
                              </div>
                            </label>
                          </div>
                          <div className="form-check mb-2">
                            <input className="form-check-input" type="radio" name="payment" id="creditcard" onClick={() => setOpenCard(true)} />
                            <label className="form-check-label ms-2" htmlFor="creditcard">
                              <div className="d-flex flex-column payment-class">
                                <strong>Credit Card</strong>
                                <bdi>All payments will be processed securely</bdi>
                              </div>
                            </label>
                          </div>
                          <Collapse in={opencard}>
                            <div className="row">
                              <div className="col-12 mt-2">
                                <div className="cust-radio-box d-flex align-items-center">
                                  <input name="donate" type="radio" id="donate-card-1" />
                                  <label className="cust-radio-main w-100 card-1" htmlFor="donate-card-1">
                                    <div className="d-flex align-items-center">
                                      <div>
                                        <img src="../assets/images/card-visa.svg" alt="" />
                                      </div>
                                      <div className="ms-3">
                                        <span>Bank Of America</span>
                                        <p className="mb-0 mt-1">Visa Card - XXX02362</p>
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 mt-2">
                                <div className="cust-radio-box d-flex align-items-center">
                                  <input name="donate" type="radio" id="donate-card-2" />
                                  <label className="cust-radio-main w-100 card-1" htmlFor="donate-card-2">
                                    <div className="d-flex align-items-center">
                                      <div>
                                        <img src="../assets/images/card-visa.svg" alt="" />
                                      </div>
                                      <div className="ms-3">
                                        <span>Bank Of America</span>
                                        <p className="mb-0 mt-1">Visa Card - XXX02362</p>
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              </div>
                              <div className="col-12 mt-3">
                                <div>
                                  <h6>
                                    <b>Add new card</b>
                                  </h6>
                                </div>
                                <div className="row me-0">
                                  <div className="col-12 mb-3 mt-2 pe-0">
                                    <bdi className="d-block position-relative">
                                      <input type="tel" className="form-control comn-input-style ps-3" placeholder="Enter Card Number" />
                                      <span className="showpwd-class bg-transparent" id="show_pwd">
                                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M18 16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.89543 0 2 0H18C19.1046 0 20 0.89543 20 2V14C20 15.1046 19.1046 16 18 16ZM2 8V14H18V8H2ZM2 2V4H18V2H2ZM11 12H4V10H11V12Z" fill="#7B838A" />
                                        </svg>
                                      </span>
                                    </bdi>
                                  </div>
                                  <div className="col-xl-6 col-lg-12 col-sm-6 mb-3 pe-0">
                                    <input className="form-control comn-input-style ps-3" type="month" placeholder="MM/YY" />
                                  </div>
                                  <div className="col-xl-6 col-lg-12 col-sm-6 mb-3 pe-0">
                                    <input className="form-control comn-input-style ps-3" type="tel" placeholder="CVV" />
                                  </div>
                                  <div className="col-12 mb-3 pe-0">
                                    <input className="form-control comn-input-style ps-3" type="tel" placeholder="Postal Code" />
                                  </div>
                                  <div className="col-12 pe-0">
                                    <label className="cust-chk-bx">
                                      <input type="checkbox" id="remember-me" name="remember-me" defaultChecked />
                                      <span className="cust-chkmark"></span>
                                      <b>Securely save this card</b>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Collapse>
                        </div>
                      </div>
                      <div className="col-12 mt-3">
                        <button className="comn-btn-class w-100" type="button">
                          PAY USING CREDIT CARD
                        </button>
                      </div>
                    </form>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </MainLayout>
  );
}
