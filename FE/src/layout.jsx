import React from 'react'
import Header from './components/header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto pt-12 px-4">

        {/* Header Section */}
        <Header/>
       

        {/* Progress Steps */}
        {/* <Progress steps={steps} currentStep={currentStep}/> */}

        <Outlet/>

      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Layout