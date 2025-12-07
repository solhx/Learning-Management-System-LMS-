'use client'
import React from 'react'
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar"
import Heading from '../../../../app/utils/Heading'
import DashboardHeader from '../../../../app/components/Admin/DashboardHeader'
import EditCourse from '../../../components/Admin/Course/EditCourse'
import AdminProtected from '@/app/hooks/adminProtected'

type Props = {}

const page = ({params}:any) => {
      const id= params?.id;
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
            <EditCourse id={id}/>
        </div>

    </div>
        </AdminProtected>
        
    </div>
  )
}

export default page;