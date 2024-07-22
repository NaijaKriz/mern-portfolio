import React from 'react'
import Header from './../../components/Header';
import { Tabs } from 'antd';
import AdminIntro from './AdminIntro';
import AdminAbout from './AdminAbout';
import { useSelector } from 'react-redux';
import AdminExperiences from './AdminExperiences';
import AdminProjects from './AdminProjects';
import AdminCourses from './AdminCourses';
import AdminContacts from './AdminContact';
import { useEffect } from 'react';

const { TabPane } = Tabs;

function Admin() {
  const {portfolioData} = useSelector(state => state.root)
  
  useEffect(() =>{
    if(!localStorage.getItem("token")){
      window.location.href = "/admin-login"
    }
  }, [])

  return (
    <div>
        <Header />
        <div className="flex gap-5 items-center px-5 justify-between">
       <div className="flex gap-5 items-center">
       <h1 className="text-3xl py-2 text-primary">Portfolio Admin</h1>
       <div className="w-60 h-[1px] bg-gray-500"></div>
       <h1 className="underline text-primary text-xl cursor-pointer"
        onClick={()=>
          {
            localStorage.removeItem("token");
            window.location.href = "/admin-login";
          }
          
        }
       >Logout</h1>
       </div>
    </div>
    {portfolioData && <div className="px-5 pb-10">
        <Tabs defaultActiveKey="1">
    <TabPane tab="Intro" key="1">
        <AdminIntro />
    </TabPane>
    <TabPane tab="About" key="2">
    <AdminAbout />
    </TabPane>
    <TabPane tab="Experiences" key="3">
    <AdminExperiences />
    </TabPane>
    <TabPane tab="Projects" key="4">
    <AdminProjects />
    </TabPane>
    <TabPane tab="Contact" key="5">
    <AdminContacts />
    </TabPane>
  </Tabs>
        </div>}
    </div>
  )
}

export default Admin