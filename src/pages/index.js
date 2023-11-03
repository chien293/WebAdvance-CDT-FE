'use client';
import { Inter } from 'next/font/google'
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from './auth/SignIn'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <SignIn/>
    </>
  )
}
