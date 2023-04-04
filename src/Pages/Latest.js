import React, { useState, useContext, useEffect } from "react";
import { Tab, Nav } from "react-bootstrap";
import LatestTab from "../Components/AllTabs/LatestTab";
import Atheletes from "../Components/AllTabs/Atheletes";
import Deals from "../Components/AllTabs/Deals";
import MainLayout from "../Components/Layout/MainLayout";
import Context from "../contexts/roleContext";

export default function Latest() {
	const context = useContext(Context);
	const [type, setType] = useState('');
	const [activeTab, setActiveTab] = useState("latest");

	useEffect(() => {
		setType(context.signup_type);
	}, [context.signup_type])

	const handleSelect = (selectedTab) => {
		setActiveTab(selectedTab);
	};

	return (
		<>
			<MainLayout>
				<section className="gray-bg-section">
					<div className="container position-relative">
						<div className="row m-0">
							<div className="col-12 p-0">
								<Tab.Container defaultActiveKey={activeTab} onSelect={handleSelect} className="my-3">
									<div className="d-sm-flex align-items-center justify-content-center mb-4">
										<div className="comn-tab-sec  position-relative">
											<Nav variant="pills">
												<Nav.Item>
													<Nav.Link eventKey="latest">Latest</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey="atheletes">Athletes</Nav.Link>
												</Nav.Item>
												{(type === 2 || type == 4) &&
													(<Nav.Item>
														<Nav.Link eventKey="deals">Deals</Nav.Link>
													</Nav.Item>)
												}
											</Nav>
										</div>
									</div>
									<Tab.Content className="mt-3">
										{activeTab === "latest" && (
											<Tab.Pane eventKey="latest" title="Latest">
												<LatestTab />
											</Tab.Pane>
										)}
										{activeTab === "atheletes" && (
											<Tab.Pane eventKey="atheletes" title="Atheletes">
												<Atheletes />
											</Tab.Pane>
										)}
										{activeTab === "deals" && (
											<Tab.Pane eventKey="deals" title="Deals">
												<Deals />
											</Tab.Pane>
										)}
									</Tab.Content>
								</Tab.Container>
							</div>
						</div>
					</div>
				</section>
			</MainLayout>
		</>
	);
}
