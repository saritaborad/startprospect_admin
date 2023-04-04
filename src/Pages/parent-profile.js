import React, { useState, useEffect, useContext, createRef } from "react";
import MainLayout from "../Components/Layout/MainLayout";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import roleContext from "../contexts/roleContext";
import ProCam from "../assets/images/Profile-cam-icon.svg";
import { Formik } from "formik"
import * as Yup from "yup"
import { API_Path, errorContainer, formAttr } from "../Api/Const";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ImagePostApi, FetchPostApi } from "../Api/apiServices";
import { toast } from "react-toastify";

export default function ParentProfile() {

  const context = useContext(roleContext);
  const runform = createRef();
  const [parentProfile, setParentProfile] = useState({});
  const [user_id, setUser_id] = useState('');
  const [country, setcountry] = useState("");

  useEffect(() => {
    setcountry(context.country);
    setParentProfile(context.profiledata);
    setUser_id(context.user_id);
  }, [context.country, context.profiledata, context.user_id]);

  const PhonehandleOnChange = (value) => {
    let temp = "+" + value;
    runform.current.setFieldValue("contact_no", temp);
  };

  const profileimgupdate = async (e) => {
    if (e.target.files[0]) {
      let formData = new FormData();
      formData.append("images", e.target.files[0]);
      let result = await ImagePostApi(API_Path.addImage, formData);
      let getImage = await result.json();
      if (result.status === 200) {
        setParentProfile({ ...parentProfile, profile_img: getImage.data.img[0] })
      } else {
        toast.error(getImage.message);
      }
    }
  };

  const handleProfileSubmit = async (formData) => {
    let result = await FetchPostApi(API_Path.editProfile, { ...formData, profile_img: parentProfile.profile_img });
    let editUserData = await result.json();
    if (result.status === 200) {
      context.getParentProfile(user_id);
      toast.success(editUserData.message);
    } else {
      toast.error(editUserData.message);
    }
  }

  return (
    <MainLayout>
      <section className="gray-bg-section">
        <div className="container">
          <div className="row">
            <div className="col-xl-2 col-md-3 pe-0">
              <ProfileLayout />
            </div>
            <div className="col-xxl-10 col-md-9">
              <div className="row">
                <div className="col-12">
                  <div className="mt-3 mt-md-0 tabs-heading-txt">
                    <h5 className="mb-0">Profile</h5>
                  </div>
                </div>
                <Formik
                  innerRef={runform}
                  enableReinitialize={true}
                  initialValues={{
                    name: parentProfile.name ?? "",
                    user_name: parentProfile.user_name ?? "",
                    email: parentProfile.email ?? "",
                    contact_no: parentProfile.contact_no ? parentProfile.contact_no : "",
                    DOB: parentProfile.DOB?.split("/").reverse().join("-") ?? "",
                    address: parentProfile.address ?? "",
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().min(2, "Name should be minimum 2 character").required("Name is required"),
                    user_name: Yup.string().min(2, "Username should be minimum 2 character").required("Username is required"),
                    email: Yup.string().email("Enter a valid Email Address").required("Email is required"),
                    contact_no: Yup.string().required("Phone number is required"),
                    DOB: Yup.string().required("DOB is required."),
                    address: Yup.string().min(2, "Address should be minimum 2 character").required("Address  is required"),
                  })}
                  onSubmit={(formData) => { handleProfileSubmit(formData) }}>
                  {(runform) => (
                    <form className="col-12 mt-3" onSubmit={runform.handleSubmit}>
                      <div className="team-info-main p-3">
                        <div className="d-md-block d-flex justify-content-center mb-3">
                          <div className="student-profile-img position-relative">
                            <img src={parentProfile.profile_img ?? "../assets/images/defaultProPic.png"} className="img-fluid" alt="profile" />
                            <div className="stud-pro-cam">
                              <label htmlFor="upload-img">
                                <input type="file" id="upload-img" name="upload-img" hidden onChange={(e) => profileimgupdate(e)} />
                                <img src={ProCam} alt="upload-pro" />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row align-items-center me-0">
                          <div className="col-lg-6 col-sm-6 mb-3 pe-0">
                            <label className="comn-label-class">Name</label>
                            <bdi className="d-block position-relative">
                              <input type="text" name="name" className="form-control comn-input-style ps-3" placeholder="Enter Your Name" {...formAttr(runform, "name")} />
                              {errorContainer(runform, "name")}
                            </bdi>
                          </div>
                          <div className="col-lg-6 col-sm-6 mb-3 pe-0">
                            <label className="comn-label-class">Username</label>
                            <bdi className="d-block position-relative">
                              <input type="text" name="user_name" className="form-control comn-input-style ps-3" placeholder="Enter Your Username" {...formAttr(runform, "user_name")} />
                              {errorContainer(runform, "user_name")}
                            </bdi>
                          </div>
                          <div className="col-lg-6 col-sm-6 mb-3 pe-0">
                            <label className="comn-label-class">Email Address</label>
                            <bdi className="d-block position-relative">
                              <input type="email" name="email" className="form-control comn-input-style ps-3" placeholder="Enter Your Email" {...formAttr(runform, "email")} />
                              {errorContainer(runform, "email")}
                            </bdi>
                          </div>
                          <div className="col-lg-6 col-sm-6 mb-3 pe-0">
                            <label className="comn-label-class">Phone Number</label>
                            <bdi className="d-block position-relative">
                              <PhoneInput inputExtraProps={{ inputClass: "form-control input-style", required: true, autoFocus: true }} value={parentProfile.contact_no} country={country} onChange={PhonehandleOnChange} />
                            </bdi>
                          </div>
                          <div className="col-lg-6 col-sm-6 mb-3 pe-0">
                            <label className="comn-label-class">Date Of Birth</label>
                            <bdi className="d-block position-relative">
                              <input type="date" name="DOB" className="form-control comn-input-style ps-3" {...formAttr(runform, "DOB")} />
                              {errorContainer(runform, "DOB")}
                            </bdi>
                          </div>
                          <div className="col-lg-6 col-sm-6 mb-3 pe-0">
                            <label className="comn-label-class">Address</label>
                            <bdi className="d-block position-relative">
                              <input type="text" name="address" className="form-control comn-input-style ps-3" placeholder="Enter Address" {...formAttr(runform, "address")} />
                              {errorContainer(runform, "address")}
                            </bdi>
                          </div>
                          <div className="col-xxl-3 col-xl-4 col-md-6 mt-3 mx-md-0 mx-sm-auto">
                            <button className="comn-btn-class" type="submit">
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
