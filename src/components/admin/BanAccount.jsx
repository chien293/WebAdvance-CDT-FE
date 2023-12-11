import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import blocked from "../../assets/img/blocked.png"
const BanAccountComponent = () => {
    return (
        <div  style={{ display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Image
                src={blocked}
                width={200}
                height={150}
                alt="Picture of the author"
            />
            <br/>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Your account has been banned</p>
        </div>
    )
}

export default BanAccountComponent
