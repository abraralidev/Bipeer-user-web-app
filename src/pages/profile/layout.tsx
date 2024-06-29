import ProfileLinks from '@/components/profile/ProfileLinks'
import React from 'react'

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='my-24 px-12'>
            <p>
                <span
                    onClick={() => { }}
                    className="cursor-pointer text-gray-700 text-lg"
                >
                    Home
                </span>{" "}
                <span className="px-4">/</span>{" "}
                <span className="font-medium text-lg">My Account</span>
            </p>{" "}
            <div className="md:16 mt-4 md:grid grid-cols-3 gap-x-4">
                <ProfileLinks />
                <div className="col-span-2 shadow-md md:px-16 px-4 py-2 md:py-8">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ProfileLayout