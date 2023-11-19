import React from 'react'
import DefaultLayout from "@/layouts/default";
import ValidateEmail from "@/components/auth-page/ValidateEmail";


const validateEmail = () => {
  return (
    <DefaultLayout>
      <ValidateEmail/>
    </DefaultLayout>
  )
}

export default validateEmail
