import React from 'react'
import LoginPage from './pages/login/LoginPage'
import Registration from './pages/registration/RegistrationPage'
import UserRouter from './components/login.components/UserRoute'
import ProtectedRoute from './components/login.components/ProtectedRoute'
import RevenueData from './pages/admin/RevenueData'
import GameData from './pages/admin/GameData'
import AddEmp from './pages/admin/AddEmp'
import DeleteEmp from './pages/admin/DeleteEmp'
import Reports from './pages/admin/Reports'
import MaintenanceReport from './pages/admin/MaintenanceReport'
import SubmitMaint from './pages/maintenance/SubmitMaint'
import SubmitRainout from './pages/maintenance/SubmitRainout'
import SubmitMaintForMaint from './pages/maintenance/SubmitMaintForMaint'
import MaintenanceFixed from './pages/maintenance/MaintenanceFixed'
import MakeSchedule from './pages/admin/MakeSchedule'
import EndRainout from './pages/admin/EndRainout'
import PickupReq from './pages/maintenance/PickupReq'
import BookRides from './pages/customer/BookRides'
import BookGames from './pages/customer/BookGames'
import BookAttractions from './pages/customer/BookAttractions'
import BuyEntryPass from './pages/customer/BuyEntryPass'
import GiftShop from './pages/customer/GiftShop'
import Cart from './pages/customer/Cart'
import YourBookings from './pages/customer/YourBookings'
import UpdatePark from './pages/admin/UpdatePark'
import AdminProfile from './pages/admin/AdminProfile'
import CustomerProfile from './pages/customer/CustomerProfile'
import ManageInventory from './pages/admin/ManageInventory'
import LandingHome from './pages/landing/LandingHome'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import AttendantMaint from './pages/attendant/AttendantMaint'
import AttendantProfile from './pages/attendant/AttendantProfile'
import MaintProfile from './pages/maintenance/MaintProfile'
export default function App () {
  return (
    <Router>
      <Routes>
        <Route element={<LandingHome />} path='/' />
        <Route element={<LoginPage />} path='/login' />
        <Route element={<Registration />} path='/registration' />
        <Route
          element={
            <ProtectedRoute>
              <UserRouter />
            </ProtectedRoute>
          }
          path='/home'
        />
        //Admin Routes
        <Route element={<MakeSchedule />} path='admin/MakeSchedule' />
        <Route element={<GameData />} path='admin/reports/GameData' />
        <Route element={<AddEmp />} path='admin/AddEmployee' />
        <Route element={<DeleteEmp />} path='admin/RemoveEmployee' />
        <Route element={<Reports />} path='admin/reports' />
        <Route element={<RevenueData />} path='admin/reports/RevenueData' />
        <Route element={<EndRainout />} path='admin/EndRainout' />
        <Route element={<AdminProfile />} path='admin/Profile' />
        <Route
          element={<MaintenanceReport />}
          path='admin/reports/MaintenanceReport'
        />
        <Route element={<ManageInventory />} path='admin/ManageInventory' />
        <Route element={<UpdatePark />} path='admin/UpdatePark' />
        //General Routes
        <Route element={<SubmitRainout />} path='/SubmitRainout' />
        <Route element={<SubmitMaint />} path='/SubmitMaintenance' />
        //Maintenance Routes
        <Route
          element={<MaintenanceFixed />}
          path='maintenance/MaintenanceFixed'
        />
        <Route
          element={<SubmitMaintForMaint />}
          path='maintenance/SubmitMaintenance'
        />
        <Route element={<PickupReq />} path='maintenance/PickupReq' />
        <Route element={<MaintProfile />} path='maintenance/Profile' />
        //Attendant Routes
        <Route
          element={<AttendantMaint />}
          path='attendant/SubmitMaintenance'
        />
        <Route element={<AttendantProfile />} path='attendant/Profile' />
        //Customer Routes
        <Route element={<BookRides />} path='customer/BookRides' />
        <Route element={<BookGames />} path='customer/BookGames' />
        <Route element={<BookAttractions />} path='customer/BookAttractions' />
        <Route element={<BuyEntryPass />} path='customer/BuyEntryPass' />
        <Route element={<GiftShop />} path='customer/GiftShop' />
        <Route element={<Cart />} path='/Cart' />
        <Route element={<YourBookings />} path='customer/MyBookings' />
        <Route element={<CustomerProfile/>} path='customer/Profile' />
      </Routes>
    </Router>
  )
}
