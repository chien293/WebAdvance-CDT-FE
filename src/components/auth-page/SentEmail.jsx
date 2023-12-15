import React from 'react'
import Image from 'next/image'
import { Button, Checkbox, Form, Input, Card, Row, Typography, Divider, InputNumber } from 'antd';
import assets from '../../assets/img/verify-email.jpg'


const SentEmail = ({ email }) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginTop: 100,
            height: '70vh',
  
          }}>
            <Typography  >
                <Typography.Title>Check your Email</Typography.Title>
                <div>We've send an email to {email}</div>
                <div>to reset your password.</div>
                <a className='block text-right' >
                <Button  type="primary" style={{ backgroundColor: 'blue'}}>
                Resend email
                </Button>
                </a>         
                <div className='flex block items-center justify-center'>
      
                <Image src={assets} alt='ICON' />
                </div>
            </Typography>

        </div>
    )
}

export default SentEmail
