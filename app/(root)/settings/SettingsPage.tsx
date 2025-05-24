import React from 'react'
import SidePage from './SidePage'
import DetailsSide from './DetailsSide'

const SettingsPage = () => {
  return (
    <section className='bg-[#FFFFFF] h-full flex rounded-[10px]  mx-12 my-8 px-12 py-10'>
        <SidePage/>
        <DetailsSide/>
    </section>
  )
}

export default SettingsPage
