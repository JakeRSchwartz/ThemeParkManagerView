import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token')
  if (isAuthenticated.length != 0){
    return children
  } else {
    return <Navigate to='/login' replace />
  }
}

export default ProtectedRoute


