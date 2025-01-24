import React from 'react'

function MentorProtectedWrapper() {
    const isAuthenticated = () => {
        const token = localStorage.getItem("token");
        const userRole = localStorage.getItem();
    }
  return (
    <div>MentorProtectedWrapper</div>
  )
}

export default MentorProtectedWrapper