import React, { useEffect, useState } from "react";
import SentEmail from '@/components/auth-page/SentEmail';
import DefaultLayout from "@/layouts/default";
import { withRouter } from 'next/router'
import { useRouter} from "next/router";

const sentemail = () => {
  const router = useRouter();
  const [mail, setMail] = useState("");

  useEffect(() => {
    setMail(router.query.email);
  }, [router.query]);

   
  return (
    <DefaultLayout>
      <SentEmail email = {mail}/>
    </DefaultLayout>
  );
};

export default sentemail;
