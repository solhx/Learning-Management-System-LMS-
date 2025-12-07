'use client'
import React from 'react'
import Heading from '../../utils/Heading'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar"
import AdminProtected from '../../hooks/adminProtected'
import DashboardHero from "../../components/Admin/DashboardHero"
import EditCategories from "../../components/Admin/Customization/EditCategories"
type Props = {}

const page = (props: Props) => {
  return (
    <div>
       <AdminProtected>
         <Heading
        title="Elearning - Admin"
        description="Elearning is a platform for online education."
        keywords="react,programming,education,learning"
      />
      <div className='flex h-screen'>
        <div className='1500px:w-[16%] w-1/5'>
        <AdminSidebar/>
        </div>
        <div className='w-[80%]'>
            <DashboardHero/>
            <EditCategories/>
        </div>
      </div>
       </AdminProtected>
    </div>
  )
}

export default page