'use client'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar"
import Heading from '../../../app/utils/Heading'
import DashboardHeader from '../../../app/components/Admin/DashboardHeader'
import EditFaq from '../../components/Admin/Customization/EditFaq'
import AdminProtected from '@/app/hooks/adminProtected'

type Props = {}

const page = () => {
      
  return (
    <div>
        <AdminProtected>
            <Heading
     title="Elearning - Admin"
        description="Elearning is a platform for online education."
        keywords="react,programming,education,learning"
    />
    <div className='flex'>
        <div className='1500px:w-[16%] w-1/5'>
        <AdminSidebar/>
        </div>
        <div className="w-[80%]">
            <DashboardHeader/>
            <EditFaq />
        </div>

    </div>
        </AdminProtected>
        
    </div>
  )
}

export default page;