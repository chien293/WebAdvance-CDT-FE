import React from 'react'
import assets from '../../assets/img/not-verified.jpg'
import Image from 'next/image'
const InvalidEmail = () => {
    return (
        <div>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="rounded-lg bg-gray-50 px-16 py-14">
                    <div className="flex justify-center">
                        <div className="rounded-full bg-green-200 p-6">
                            <Image src={assets} width={50} height={60}/>
                        </div>
                    </div>
                    <h3 className="my-4 text-center text-3xl font-semibold text-gray-700">Error!!!</h3>
                    <p className="w-[230px] text-center font-normal text-gray-600">Email của bạn chưa được xác thực.</p>
                    <button className="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-orange-400 px-6 py-3 text-center text-base font-medium text-orange-100 outline-8 hover:outline hover:duration-300">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InvalidEmail
