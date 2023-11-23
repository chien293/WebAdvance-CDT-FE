import React from 'react'
import ResetPassword from '@/components/auth-page/ResetPassword'
import DefaultLayout from "@/layouts/default";
import { useRouter } from 'next/router';

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token, email } = router.query;

  return (
    <DefaultLayout>
      <ResetPassword token={token} email = {email}/>
    </DefaultLayout>
  )
}

export default ResetPasswordPage
