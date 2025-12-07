'use client'
import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar"
import AdminProtected from '../hooks/adminProtected'
import DashboardHero from "../components/Admin/DashboardHero"

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
        <div className='flex min-h-screen'>
          <div className='1500px:w-[16%] w-1/5'>
            <AdminSidebar/>
          </div>
          <div className='w-[85%] 1500px:w-[84%]'>
            <DashboardHero isDashboard={true}/>
          </div>
        </div>
       </AdminProtected>
    </div>
  )
}

export default page