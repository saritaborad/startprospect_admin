import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { FetchPostApi } from "../Api/apiServices";
import MainLayout from "../Components/Layout/MainLayout";
import ProfileLayout from "../Components/ProfileLayout/MainProfileLayout";
import { toast } from "react-toastify";
import { API_Path } from "../Api/Const";

export default function Faq() {
	const [faq, setFaq] = useState("");

	useEffect(() => {
		getFaq();
	}, []);

	const getFaq = async () => {
		let result = await FetchPostApi(API_Path.getFaq);
		let getAllFaq = await result.json();
		if (result.status === 200) {
			setFaq(getAllFaq.data);
		} else {
			toast.error(getAllFaq.message);
		}
	};

	return (
		<MainLayout>
			<section className="gray-bg-section">
				<div className="container">
					<div className="row me-0">
						<div className="col-xl-2 col-md-3 ">
							<ProfileLayout />
						</div>
						<div className="col-xl-10 col-md-9 pe-0">
							<div className="mb-3 mt-3 mt-md-0 tabs-heading-txt">
								<h5>Frequently asked questions</h5>
							</div>
							<div className="row">
								<div className="col-12 mx-auto">
									<div className="faq-main-class p-3">
										{faq.length > 0 &&
											faq.map((item, i) => {
												return (
													<Accordion defaultActiveKey="0" key={i}>
														<Accordion.Item eventKey="0" className="accor-item">
															<Accordion.Header className="accor-hdr">{item.faq.Question}</Accordion.Header>
															<Accordion.Body className="accor-bdy">{item.faq.Answer}</Accordion.Body>
														</Accordion.Item>
													</Accordion>
												);
											})}
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
