import React from 'react'
import InvalidEmail from '@/components/auth-page/InvalidEmail'
import DefaultLayout from "@/layouts/default";

const invalidEmail = () => {
  return (
    <DefaultLayout>
      <InvalidEmail/>
    </DefaultLayout>
  )
}

export default invalidEmail
