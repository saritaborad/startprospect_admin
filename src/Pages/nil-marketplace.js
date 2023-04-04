import React, { useState } from "react";
import { Tab, Nav } from "react-bootstrap";
import "rc-slider/assets/index.css";
import MainLayout from "../Components/Layout/MainLayout";
import LatestTab from "../Components/AllTabs/LatestTab";
import Atheletes from "../Components/AllTabs/Atheletes";

export default function NilMarketplace() {
  const [activeTab, setActiveTab] = useState("latest");

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <>
      <MainLayout>
        <section className="gray-bg-section pt-3">
          <div className="container position-relative">
            <div className="row m-0">
              <div className="col-12 mb-5 p-0">
                <Tab.Container defaultActiveKey={activeTab} onSelect={handleSelect} className="my-3">
                  <div className="d-sm-flex align-items-center justify-content-center mb-5">
                    <div className="comn-tab-sec  position-relative">
                      <Nav variant="pills">
                        <Nav.Item>
                          <Nav.Link eventKey="latest">Latest</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="atheletes">Atheletes</Nav.Link>
                        </Nav.Item>
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
