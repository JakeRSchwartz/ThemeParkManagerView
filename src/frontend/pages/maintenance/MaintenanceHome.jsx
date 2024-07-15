import React from 'react'
import MaintenanceSideNav from '../../components/maintanence.components/MainSideNav'
import videos from '../../assets/CoogsParkad.mp4'
import Mainpagechart from '../../components/maintanence.components/Mainpagechart'
import Mainpagechart2 from '../../components/maintanence.components/Mainpagechart2'
import axios from 'axios'
import Notifications from '../../components/admin.components/Notifications'
import Mainpagechart3 from '../../components/maintanence.components/Mainpagechart3'
import EmpHeader from '../../components/admin.components/EmpHeader'
import MaintenanceHeader from '../../components/maintanence.components/MaintenanceHeader'
function MaintenanceHome () {
  return (
    <>
      <MaintenanceSideNav />
      <MaintenanceHeader />
      <div className='maintcontainer'>
        <div className='maintTable' style={{ overflowY: 'scroll' }}>
          <h1>Your ride maintenance request:</h1>
          <Mainpagechart />
        </div>
        <div className='notificationArea'>
          <Notifications />
        </div>
        <div className='maintTable2' style={{ overflowY: 'scroll' }}>
          <h1>Your game maintenance request:</h1>
          <Mainpagechart2 />
        </div>
        <div className='maintTable3' style={{ overflowY: 'scroll' }}>
          <h1>Your attraction maintenance request:</h1>
          <Mainpagechart3 />
        </div>
      </div>
    </>
  )
}

export default MaintenanceHome
