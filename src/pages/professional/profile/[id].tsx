import { Professional } from '@/api/User'
import { axiosInstance } from '@/api/axios'
import SelectedGigs from '@/components/professional/SelectedGigs'
import RootLayout from '@/pages/layout'
import { Avatar, Button, Chip, Divider, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import React from 'react'
import { PiClockCounterClockwiseDuotone } from 'react-icons/pi'
import ProfessionalLayout from '../layout'

const ProfilePage = ({ professional }: { professional: Professional }) => {
    return (
        <div className='px-44 my-4'>
            <div className='mb-6 shadow-md flex items-center'>
                <div className="w-full flex flex-col justify-center items-center">
                    <Avatar src={professional?.photoLogo} sx={{
                        height: 84,
                        width: 84
                    }} />
                    <Typography mt={2} variant='h6'>
                        {professional.name}
                    </Typography>
                    <Typography gutterBottom variant='subtitle2'>
                        {professional.profession}
                    </Typography>
                    <Button variant='contained' color='info' sx={{
                        mt: 2,
                        mb: 2
                    }}>Hire me</Button>
                    <div className='flex items-center space-x-3'>
                        <PiClockCounterClockwiseDuotone />
                        <Typography color='gray' variant='subtitle2'>Response time : 1 hour </Typography>
                    </div>
                </div>
                <Divider variant='fullWidth' orientation='vertical' flexItem />
                <div className='py-4 w-full px-4'>
                    <div className="mb-3">
                        <Typography variant='subtitle1' fontWeight={600}>About</Typography>
                        <Typography variant='body2'>{professional.aboutMe} </Typography>
                    </div>
                    <div className="mb-3">
                        <Typography variant='subtitle1' fontWeight={600}>Graduation Year</Typography>
                        <Typography variant='body2'>{professional.graduationYear} </Typography>
                    </div>
                    <div className="mb-3">
                        <Typography variant='subtitle1' fontWeight={600}>Experience</Typography>
                        {professional.workExperiences.map(it => <Chip key={it} label={it} />)}
                    </div>
                    <div className="mb-3">
                        <Typography variant='subtitle1' fontWeight={600}>Skills</Typography>
                        {professional.skills.map(it => <Chip key={it} label={it} />)}
                    </div>


                </div>
            </div>
            <SelectedGigs title='Services' />
        </div>
    )
}

ProfilePage.getLayout = (page: React.ReactElement) => (
    <ProfessionalLayout>
        {page}
    </ProfessionalLayout>
)

export const getServerSideProps: GetServerSideProps<{ professional: Professional }> = async (context) => {
    const professionalId = context.params?.id as string || "";
    try {
        const response = await axiosInstance.get(`https://listing-backend-z4i5.onrender.com/professional/${professionalId}`);
        const professional = response.data.professional;
        if (!professional) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                professional: professional
            }
        };
    } catch (_) {
        return {
            notFound: true,
        };
    }
};


export default ProfilePage