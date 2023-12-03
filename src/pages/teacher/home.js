import React from 'react'
import withAuth from '@/auth/with-auth';
const TeacherHomePage = () => {
  return (
    <div>
      HOME TEACHER
    </div>
  )
}

export default withAuth(TeacherHomePage, ['teacher']);
