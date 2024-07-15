import React from 'react'
import AttendantHeader from '../../components/attendant.components/AttendantHeader'
import AttendantNav from '../../components/attendant.components/attendantNav'
import styled from 'styled-components'
import HomeCal from '../../components/attendant.components/HomeCal'
import Notifications from '../../components/admin.components/Notifications'

function AttendantHome () {
  return (
    <>
      <AttendantHeader />
      <AttendantNav />
      <StyledPageContainer>
        <HomeCal />
        <NotifCont>
          <Notifications />
        </NotifCont>
      </StyledPageContainer>
    </>
  )
}

export default AttendantHome

const Notification = styled.div`
  height: 600px; // Adjust height to match the calendar or as needed
  width: 300px; // Fixed width for consistent appearance
  border: 1px solid #ccc; // Softer color border
  margin-left: 20px; // Space from the calendar
  padding: 20px; // Internal padding for content
  background-color: #f8f8f8; // Light background to stand out slightly
  overflow-y: auto; // Allows scrolling if content is too long
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); // Subtle shadow for depth

  h1 {
    margin-top: 0;
    color: #333; // Dark color for the header for better readability
  }
`
const StyledPageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;

  .calCont {
    display: flex;
    flex: 1;
    justify-content: space-between; // Ensures space between calendar and notifications
    align-items: start; // Aligns items at the top
  }
`
const NotifCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  height: 100%;
  width: 300px;
  margin-left: 20px;
  margin-right: 5px;
  padding: 20px;
  background-color: #f8f8f8;
  overflow-y: auto;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`
