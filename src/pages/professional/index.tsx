import React from 'react'
import RootLayout from '../layout'
import ProfessionalBanner from '@/components/professional/ProfessionalBanner'
import CategoiresCarousel from '@/components/professional/CategoryCarousel'
import Seller from '@/components/professional/Seller'
import SelectedGigs from '@/components/professional/SelectedGigs'
import { categoryData } from '@/api/Category'
import ProfessionalLayout from './layout'

const ProfessionalPage = () => {
    return (
        <div>
            
            <ProfessionalBanner />
            <div className='md:px-24 px-2 md:mt-12 mt-3'>
                <CategoiresCarousel title='FEATURED CATEGORIES' />
                <Seller title='TOP SELLERS 123' />
                <SelectedGigs title='Selected Gigs for you' />
                {categoryData.map(it => (
                    <SelectedGigs title={it.name} key={it.name} />
                ))}

            </div>

        </div>
    )
}
ProfessionalPage.getLayout = (page: React.ReactElement) => (
    <ProfessionalLayout>
        {page}
    </ProfessionalLayout>
)

export default ProfessionalPage