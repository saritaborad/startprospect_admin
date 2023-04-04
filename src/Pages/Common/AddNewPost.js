import { Formik } from 'formik';
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { FetchPostApi, ImagePostApi } from '../../Api/apiServices';
import { API_Path, errorContainer, formAttr } from '../../Api/Const';
import logo from "../../assets/images/close.svg";
import CloudUpload from "../../assets/images/cloud-upload1.svg";
import ProfileLayout from "../../Components/ProfileLayout/MainProfileLayout";
import roleContext from "../../contexts/roleContext";



export default function AddNewPost(props) {
    const context = useContext(roleContext);

    const [propertyImage, setPropertyImage] = useState([]);
    const [loginUserId, setloginUserId] = useState();

    useEffect(() => {
        setloginUserId(context.user_id)
    }, [context])

    const propertyimgupdate = async (e) => {
        if (e.target.files.length > 0) {
            let formData = new FormData();
            for (let i = 0; i < e.target.files.length; i++) {
                formData.append("images", e.target.files[i]);
            }
            let result = await ImagePostApi(API_Path.addImage, formData);
            let getImage = await result.json();
            if (result.status === 200) {
                var a = getImage.data.img;
                setPropertyImage([...propertyImage, ...a]);
            } else {
                toast.error(getImage.message);
            }
        }
    };

    const handleRemovePropImg = (e) => {
        var x = propertyImage;
        x.splice(e, 1);
        setPropertyImage([...x]);
    };

    const handleAddNewPost = async (formdata) => {
        let data = { user_id: loginUserId, images: propertyImage, description: formdata.description, link: formdata.link };
        let result = await FetchPostApi(API_Path.createPost, data);
        let createNewPost = await result.json();
        if (result.status === 200) {
            // setshownewpostdiv(false);
            // setdefultview(true);
            props.closehandlenewpost()
        } else {
            toast.error(createNewPost.message);
        }
    };
    return (
        <>
            <section >
                <div className='col-xl-12'>
                    <div className="top-athlete-box mt-3 mt-lg-0">
                        <div className=" tabs-heading-txt">
                            <h5 className="mb-0">Add New Post</h5>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Formik
                                    initialValues={{
                                        description: "",
                                        link: "",
                                    }}
                                    validationSchema={Yup.object({
                                        description: Yup.string().required("Description is required."),
                                        link: Yup.string().test("link", "Enter correct url!", (value) => {
                                            if (!value) {
                                                return true;
                                            }
                                            const regex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/i;
                                            return regex.test(value);
                                        }),
                                    })}
                                    onSubmit={(formData, { resetForm }) => handleAddNewPost(formData, resetForm)}
                                >
                                    {(runform) => (
                                        <form className="row me-0" onSubmit={runform.handleSubmit}>
                                            <div className="col-12 make-a-deal-top-title">
                                                <label className="activity-innr-lable">Image/Video</label>
                                            </div>
                                            <div className="col-12">
                                                <div className="box-bdr-info-hdr-desc mb-3">Property Photos</div>
                                                <div className="row align-items-center me-0">
                                                    {propertyImage &&
                                                        propertyImage?.length > 0 &&
                                                        propertyImage?.map((item, i) => {
                                                            return (
                                                                <div className="col-xxl-2 col-sm-3 col-6 mb-3 property-width pe-0" key={i}>
                                                                    <div className="position-relative property-img">
                                                                        {item.includes(".mp4") ? <video src={item} alt="error" className="property-vid" controls /> : <img src={item} alt="error" />}
                                                                        <div className="close-btn" onClick={() => handleRemovePropImg(i)}>
                                                                            <img src={logo} alt="" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    <div className="col-xxl-2 col-sm-3 col-6 mb-3 property-width pe-0">
                                                        <div className="add-image">
                                                            <label htmlFor="img">
                                                                <img src={CloudUpload} alt="" />
                                                            </label>
                                                            <input type="file" id="img" name="img" accept="image/*,video/*" className="d-none" multiple="multiple" onChange={(e) => propertyimgupdate(e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 make-a-deal-top-title mt-3">
                                                <label className="activity-innr-lable">Link (Optional)</label>
                                                <input type="text" className="form-control comn-input-style ps-3" name="link" {...formAttr(runform, "link")} />
                                                {errorContainer(runform, "link")}
                                            </div>
                                            <div className="col-12 make-a-deal-top-title mt-3">
                                                <label className="activity-innr-lable">Description</label>
                                                <textarea className=" ps-3 comn-input-style  form-control h-auto" rows={5} placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book." name="description" {...formAttr(runform, "description")} />
                                                {errorContainer(runform, "description")}
                                            </div>
                                            <div className="row me-0">
                                                <div className="col-lg-2 col-sm-3 col-6 mt-3 pe-0">
                                                    <button type="submit" className="comn-btn-class w-100">
                                                        ADD
                                                    </button>
                                                </div>
                                                <div className="col-lg-2 col-sm-3 col-6 mt-3 pe-0">
                                                    <button type="button" className="comn-declined-btn w-100" onClick={props.closehandlenewpost}>
                                                        Cancel
                                                    </button>
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
        </>
    )
}
